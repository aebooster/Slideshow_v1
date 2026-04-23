/**
 * SVG + Layout JSON Merge Lab
 *
 * Цель: изолировать проблему мэтчинга JSON ↔ SVG от остального editor.html.
 * Использование:
 *   1) В Node:    node svg_json_merge_lab.js ./frame.json ./frame.svg
 *   2) В браузере: вставить функции в консоль и вызвать analyzeMerge(layoutObj, svgText)
 */

function normKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '');
}

function tailKey(value) {
  const m = String(value || '').match(/\d+/g);
  return m ? m.join('') : '';
}

/**
 * ЭТАП 1: Надёжно достать корень layout из разных экспортов.
 */
function resolveLayoutRoot(payload) {
  if (!payload || typeof payload !== 'object') return null;

  if (payload.layoutJson) return resolveLayoutRoot(payload.layoutJson);
  if (payload.layout) return resolveLayoutRoot(payload.layout);
  if (payload.frame) return resolveLayoutRoot(payload.frame);
  if (payload.document) return resolveLayoutRoot(payload.document);
  if (payload.root) return resolveLayoutRoot(payload.root);
  if (Array.isArray(payload.selection) && payload.selection.length) {
    return resolveLayoutRoot(payload.selection[0]);
  }
  if (Array.isArray(payload)) return resolveLayoutRoot(payload[0]);

  if (payload.nodes && typeof payload.nodes === 'object') {
    for (const value of Object.values(payload.nodes)) {
      const root = resolveLayoutRoot(value?.document || value);
      if (root) return root;
    }
  }

  return payload;
}

/**
 * ЭТАП 2: Собрать layout-ноды даже если структура нестандартная.
 */
function collectLayoutNodes(root) {
  const out = [];
  const seen = new Set();

  function walk(node) {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);

    const id = node.id || node.nodeId || node.uuid || null;
    const name = node.name || node.nodeName || '';
    const type = String(node.type || node.nodeType || '').toUpperCase();

    if (id || name || type) {
      out.push({ id, name, type, raw: node });
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
    if (node.frame && typeof node.frame === 'object') walk(node.frame);
    if (node.document && typeof node.document === 'object') walk(node.document);
    if (node.root && typeof node.root === 'object') walk(node.root);
    if (node.nodes && typeof node.nodes === 'object') {
      Object.values(node.nodes).forEach(walk);
    }
  }

  walk(root);
  return out;
}

/**
 * ЭТАП 3: Снять индексы из SVG.
 */
function collectSvgNodesFromString(svgText) {
  const byExact = new Map();
  const byNorm = new Map();
  const byTail = new Map();
  const byName = new Map();
  const nodes = [];

  const attr = (tagText, key) => {
    const m =
      tagText.match(new RegExp(`${key}\\s*=\\s*\"([^\"]*)\"`, 'i')) ||
      tagText.match(new RegExp(`${key}\\s*=\\s*'([^']*)'`, 'i'));
    return m ? m[1] : '';
  };

  const tags = [...String(svgText || '').matchAll(/<([a-zA-Z][\w:-]*)(\s+[^>]*?)?>/g)];
  let idx = 0;
  for (const tagMatch of tags) {
    const tag = (tagMatch[1] || '').toLowerCase();
    if (['svg', 'defs', 'style', 'title', 'desc', 'metadata'].includes(tag)) continue;

    const rawTag = tagMatch[0];
    const id = attr(rawTag, 'id');
    const figmaId = attr(rawTag, 'data-figma-id');
    const dataName = attr(rawTag, 'data-name');

    nodes.push({
      idx,
      tag,
      id,
      figmaId,
      dataName,
      exactKeys: [figmaId, id].filter(Boolean),
      normKeys: [figmaId, id, dataName].filter(Boolean).map(normKey).filter(Boolean),
      tailKeys: [figmaId, id, dataName].filter(Boolean).map(tailKey).filter(Boolean),
      nameKeys: [dataName, id].filter(Boolean).map(normKey).filter(Boolean),
    });
    idx++;
  }

  for (const n of nodes) {
    for (const k of n.exactKeys) if (!byExact.has(k)) byExact.set(k, []);
    for (const k of n.exactKeys) byExact.get(k).push(n);
    for (const k of n.normKeys) if (!byNorm.has(k)) byNorm.set(k, []);
    for (const k of n.normKeys) byNorm.get(k).push(n);
    for (const k of n.tailKeys) if (!byTail.has(k)) byTail.set(k, []);
    for (const k of n.tailKeys) byTail.get(k).push(n);
    for (const k of n.nameKeys) if (!byName.has(k)) byName.set(k, []);
    for (const k of n.nameKeys) byName.get(k).push(n);
  }

  return { nodes, byExact, byNorm, byTail, byName };
}

function nodeSvgTag(layoutType) {
  const t = String(layoutType || '').toUpperCase();
  if (t === 'TEXT') return 'text';
  if (t === 'RECTANGLE') return 'rect';
  if (t === 'ELLIPSE') return 'ellipse';
  if (t === 'LINE') return 'line';
  if (['FRAME', 'GROUP', 'COMPONENT', 'INSTANCE'].includes(t)) return 'g';
  if (['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON'].includes(t)) return 'path';
  return null;
}

/**
 * ЭТАП 4: Мэтчинг с прозрачной диагностикой.
 */
function matchLayoutToSvg(layoutNodes, svgIndex) {
  const used = new Set();
  const rows = [];

  function firstFree(list) {
    if (!list) return null;
    return list.find(n => !used.has(n.idx)) || list[0] || null;
  }

  let seq = 0;
  for (const ln of layoutNodes) {
    let hit = null;
    let mode = 'miss';

    if (ln.id) {
      hit = firstFree(svgIndex.byExact.get(ln.id));
      if (hit) mode = 'exact';
    }

    if (!hit && ln.id) {
      hit = firstFree(svgIndex.byNorm.get(normKey(ln.id)));
      if (hit) mode = 'norm-id';
    }

    if (!hit && ln.id) {
      const tk = tailKey(ln.id);
      if (tk) {
        hit = firstFree(svgIndex.byTail.get(tk));
        if (hit) mode = 'tail-id';
      }
    }

    if (!hit && ln.name) {
      hit = firstFree(svgIndex.byName.get(normKey(ln.name)));
      if (hit) mode = 'name';
    }

    if (!hit && ln.name) {
      const tk = tailKey(ln.name);
      if (tk) {
        hit = firstFree(svgIndex.byTail.get(tk));
        if (hit) mode = 'tail-name';
      }
    }

    if (!hit) {
      const tag = nodeSvgTag(ln.type);
      if (tag) {
        for (let i = seq; i < svgIndex.nodes.length; i++) {
          const c = svgIndex.nodes[i];
          if (used.has(c.idx)) continue;
          const ok =
            c.tag === tag ||
            (tag === 'path' && ['path', 'polygon', 'polyline'].includes(c.tag)) ||
            (tag === 'ellipse' && ['ellipse', 'circle'].includes(c.tag));
          if (ok) {
            hit = c;
            mode = 'tag-seq';
            seq = i + 1;
            break;
          }
        }
      }
    }

    if (hit) used.add(hit.idx);
    rows.push({
      jsonId: ln.id || '—',
      jsonName: ln.name || '—',
      jsonType: ln.type || '—',
      svgId: hit?.id || hit?.figmaId || '—',
      svgTag: hit?.tag || '—',
      mode,
    });
  }

  return rows;
}

function summarize(rows) {
  const stats = rows.reduce((acc, r) => {
    acc[r.mode] = (acc[r.mode] || 0) + 1;
    return acc;
  }, {});
  return {
    total: rows.length,
    matched: rows.filter(r => r.mode !== 'miss').length,
    missed: rows.filter(r => r.mode === 'miss').length,
    byMode: stats,
  };
}

function analyzeMerge(layoutPayload, svgText) {
  const root = resolveLayoutRoot(layoutPayload);
  const layoutNodes = collectLayoutNodes(root);
  const svgIndex = collectSvgNodesFromString(svgText);
  const rows = matchLayoutToSvg(layoutNodes, svgIndex);
  return {
    rootPreview: {
      id: root?.id,
      name: root?.name,
      type: root?.type,
      hasChildren: Array.isArray(root?.children) ? root.children.length : 0,
    },
    summary: summarize(rows),
    rows,
  };
}

if (require.main === module) {
  const fs = require('fs');
  const [jsonPath, svgPath] = process.argv.slice(2);
  if (!jsonPath || !svgPath) {
    console.log('Usage: node svg_json_merge_lab.js <layout.json> <frame.svg>');
    process.exit(1);
  }
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const svgText = fs.readFileSync(svgPath, 'utf8');
  const report = analyzeMerge(payload, svgText);
  console.log(JSON.stringify(report.rootPreview, null, 2));
  console.log(JSON.stringify(report.summary, null, 2));
  console.log('Top misses:', report.rows.filter(r => r.mode === 'miss').slice(0, 20));
}

module.exports = {
  normKey,
  tailKey,
  resolveLayoutRoot,
  collectLayoutNodes,
  collectSvgNodesFromString,
  matchLayoutToSvg,
  analyzeMerge,
};
