/**
 * Synced with editor.html matching logic.
 * Usage: node svg_json_merge_lab.js <layout.json> <frame.svg>
 */

function normK(s){return String(s||'').toLowerCase().replace(/[^a-z0-9а-яё]+/gi,'');}
function tailK(s){const m=String(s||'').match(/\d+/g);return m?m.join(''):'';}
function fixMojibake(s){
  try{const str=String(s||'');const fixed=decodeURIComponent(escape(str));return fixed&&fixed!==str?fixed:str;}
  catch(e){return String(s||'');}
}
function prettyId(s){return fixMojibake(String(s||''));}

function walkNodes(n,fn){
  if(!n||typeof n!=='object')return;
  fn(n);
  if(Array.isArray(n.children))n.children.forEach(c=>walkNodes(c,fn));
}

function resolveLayoutRoot(data){
  if(!data||typeof data!=='object')return null;
  if(data.layoutJson)return resolveLayoutRoot(data.layoutJson);
  if(data.layout && !data.id && !data.type && !Array.isArray(data.children))return resolveLayoutRoot(data.layout);
  if(data.frame)return resolveLayoutRoot(data.frame);
  if(data.document)return resolveLayoutRoot(data.document);
  if(data.root)return resolveLayoutRoot(data.root);
  if(Array.isArray(data.selection)&&data.selection.length)return resolveLayoutRoot(data.selection[0]);
  if(Array.isArray(data))return resolveLayoutRoot(data[0]);
  if(data.nodes&&typeof data.nodes==='object'){
    const vals=Object.values(data.nodes);
    for(const v of vals){const r=resolveLayoutRoot(v?.document||v);if(r)return r;}
  }
  if(data.type==='DOCUMENT'&&Array.isArray(data.children)&&data.children.length)return data.children[0];
  if(data.type==='FRAME'||data.type==='GROUP')return data;
  return data;
}

function collectLayoutNodes(root){
  const out=[];
  walkNodes(root,n=>{if(n&&typeof n==='object'&&(n.id||n.name||n.type))out.push(n);});
  return out;
}

function collectSvgNodesFromString(svgText){
  const byExact=new Map(),byNorm=new Map(),byTail=new Map(),byName=new Map();
  const nodes=[];
  const add=(map,key,node)=>{if(!key)return; if(!map.has(key))map.set(key,[]); map.get(key).push(node);};
  const attr=(tag,key)=>{
    const m=tag.match(new RegExp(`${key}\\s*=\\s*"([^"]*)"`,'i'))||tag.match(new RegExp(`${key}\\s*=\\s*'([^']*)'`,'i'));
    return m?m[1]:'';
  };
  const tags=[...String(svgText||'').matchAll(/<([a-zA-Z][\w:-]*)(\s+[^>]*?)?>/g)];
  let idx=0;
  for(const tagMatch of tags){
    const tag=(tagMatch[1]||'').toLowerCase();
    if(['svg','defs','style','title','desc','metadata'].includes(tag))continue;
    const raw=tagMatch[0];
    const id=attr(raw,'id')||'';
    const fid=attr(raw,'data-figma-id')||'';
    const dataName=attr(raw,'data-name')||'';
    const exactKeys=[fid,id].filter(Boolean);
    const normKeys=[fid,id,dataName].filter(Boolean).map(v=>normK(prettyId(v))).filter(Boolean);
    const tailKeys=[fid,id,dataName].filter(Boolean).map(tailK).filter(Boolean);
    const nameKeys=[dataName,id].filter(Boolean).map(v=>normK(prettyId(v))).filter(Boolean);
    const node={idx,tag,id,fid,dataName};
    nodes.push(node);
    exactKeys.forEach(k=>add(byExact,k,node));
    normKeys.forEach(k=>add(byNorm,k,node));
    tailKeys.forEach(k=>add(byTail,k,node));
    nameKeys.forEach(k=>add(byName,k,node));
    idx++;
  }
  return {nodes,byExact,byNorm,byTail,byName};
}

function nodeSvgTag(t){
  const x=String(t||'').toUpperCase();
  if(x==='TEXT')return'text';
  if(x==='RECTANGLE')return'rect';
  if(x==='ELLIPSE')return'ellipse';
  if(x==='LINE')return'line';
  if('FRAME GROUP COMPONENT INSTANCE'.split(' ').includes(x))return'g';
  if('VECTOR BOOLEAN_OPERATION STAR POLYGON'.split(' ').includes(x))return'path';
  return null;
}

function matchLayoutToSvg(layoutNodes,svgIndex){
  const used=new Set();
  let seq=0;
  const firstFree=(list)=>{if(!list?.length)return null;return list.find(x=>!used.has(x.idx))||list[0]||null;};
  const rows=[];

  layoutNodes.forEach(n=>{
    let hit=null,mode='miss';
    const id=n.id?String(n.id):'';
    const name=n.name?String(n.name):'';
    const type=String(n.type||'').toUpperCase();

    if(id){hit=firstFree(svgIndex.byExact.get(id)); if(hit)mode='exact';}
    if(!hit&&id){hit=firstFree(svgIndex.byNorm.get(normK(prettyId(id)))); if(hit)mode='norm-id';}
    if(!hit&&id){const tk=tailK(id); if(tk){hit=firstFree(svgIndex.byTail.get(tk)); if(hit)mode='tail-id';}}
    if(!hit&&name){hit=firstFree(svgIndex.byName.get(normK(prettyId(name)))); if(hit)mode='name';}
    if(!hit&&name){const tk=tailK(name); if(tk){hit=firstFree(svgIndex.byTail.get(tk)); if(hit)mode='tail-name';}}

    if(!hit){
      const tag=nodeSvgTag(type);
      if(tag){
        for(let i=seq;i<svgIndex.nodes.length;i++){
          const c=svgIndex.nodes[i];
          if(used.has(c.idx))continue;
          const ok=c.tag===tag||(tag==='path'&&'path polygon polyline'.includes(c.tag))||(tag==='ellipse'&&'circle ellipse'.includes(c.tag));
          if(ok){hit=c;mode='tag-seq';seq=i+1;break;}
        }
      }
    }

    if(hit)used.add(hit.idx);
    rows.push({
      jsonId:id||'—',
      jsonName:name||'—',
      jsonType:type||'—',
      svgId:prettyId(hit?.id||hit?.fid||'—'),
      svgTag:hit?.tag||'—',
      mode,
    });
  });

  return rows;
}

function summarize(rows){
  const byMode=rows.reduce((a,r)=>(a[r.mode]=(a[r.mode]||0)+1,a),{});
  return {total:rows.length,matched:rows.filter(r=>r.mode!=='miss').length,missed:rows.filter(r=>r.mode==='miss').length,byMode};
}

function analyzeMerge(layoutPayload,svgText){
  const root=resolveLayoutRoot(layoutPayload);
  const layoutNodes=collectLayoutNodes(root);
  const svgIndex=collectSvgNodesFromString(svgText);
  const rows=matchLayoutToSvg(layoutNodes,svgIndex);
  return {
    rootPreview:{id:root?.id,name:root?.name,type:root?.type,hasChildren:Array.isArray(root?.children)?root.children.length:0},
    summary:summarize(rows),
    rows,
  };
}

if(require.main===module){
  const fs=require('fs');
  const [jsonPath,svgPath]=process.argv.slice(2);
  if(!jsonPath||!svgPath){console.log('Usage: node svg_json_merge_lab.js <layout.json> <frame.svg>');process.exit(1);}
  const payload=JSON.parse(fs.readFileSync(jsonPath,'utf8'));
  const svgText=fs.readFileSync(svgPath,'utf8');
  const report=analyzeMerge(payload,svgText);
  console.log(JSON.stringify(report.rootPreview,null,2));
  console.log(JSON.stringify(report.summary,null,2));
  console.log('Top misses:',report.rows.filter(r=>r.mode==='miss').slice(0,20));
}

module.exports={normK,tailK,fixMojibake,prettyId,resolveLayoutRoot,collectLayoutNodes,collectSvgNodesFromString,nodeSvgTag,matchLayoutToSvg,analyzeMerge};
