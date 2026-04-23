<!DOCTYPE html>
<html lang="ru" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SVG INSPECTOR</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
[data-theme="dark"]{--bg0:#0d0f12;--bg1:#151820;--bg2:#1a1e28;--bgH:#222838;--bgA:#2a3148;--brd:#2a2f3d;--brd2:#3d4560;--t1:#e8ecf4;--t2:#8891a5;--t3:#5a6378;--acc:#6c8cff;--accD:rgba(108,140,255,.15);--accG:rgba(108,140,255,.3);--grn:#2ed573;--red:#ff6b6b;--pur:#a855f7;--cyn:#22d3ee;--orn:#ff9f43;--pnk:#f472b6;--chk:#181c24;--shd:rgba(0,0,0,.5);--inp:#0d0f12}
[data-theme="light"]{--bg0:#f0f2f5;--bg1:#fff;--bg2:#f7f8fa;--bgH:#eef0f4;--bgA:#e2e6ed;--brd:#d8dce5;--brd2:#c0c6d2;--t1:#1a1d24;--t2:#5a6070;--t3:#8a90a0;--acc:#4a6cf7;--accD:rgba(74,108,247,.1);--accG:rgba(74,108,247,.2);--grn:#1ba854;--red:#dc3545;--pur:#8b3fd9;--cyn:#0ea5c0;--orn:#e8850a;--pnk:#d63384;--chk:#e4e7ec;--shd:rgba(0,0,0,.12);--inp:#f0f2f5}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',sans-serif;background:var(--bg0);color:var(--t1);height:100vh;overflow:hidden;display:flex;flex-direction:column;transition:background .2s,color .2s}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--brd);border-radius:4px}
.btn{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;padding:6px 14px;border:1px solid var(--brd);border-radius:6px;background:var(--bg2);color:var(--t2);cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:6px}.btn:hover{border-color:var(--acc);color:var(--t1);background:var(--accD)}.btn-p{background:var(--acc);color:#fff;border-color:var(--acc)}.btn-p:hover{opacity:.85}.btn:disabled{opacity:.4;pointer-events:none}.bdg{background:var(--bgH);padding:2px 8px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t2)}.mono{font-family:'JetBrains Mono',monospace}
.hdr{display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:44px;background:var(--bg1);border-bottom:1px solid var(--brd);flex-shrink:0;transition:background .2s}.hdr-b{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:13px}.hdr-a{display:flex;gap:6px;align-items:center}.thm{width:30px;height:30px;border-radius:6px;border:1px solid var(--brd);background:var(--bg2);color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;font-size:14px}.thm:hover{border-color:var(--acc);color:var(--t1)}
.ws{display:flex;flex:1;overflow:hidden}
.pl{width:270px;min-width:200px;background:var(--bg1);border-right:1px solid var(--brd);display:flex;flex-direction:column;flex-shrink:0;transition:background .2s}.ph{padding:10px 14px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.4px;color:var(--t3);border-bottom:1px solid var(--brd);display:flex;align-items:center;justify-content:space-between}.tc0{flex:1;overflow-y:auto;padding:6px 0}
.tn{display:flex;align-items:center;padding:3px 8px 3px calc(8px + var(--d,0)*16px);cursor:pointer;transition:background .08s;gap:4px;font-size:12px;user-select:none;position:relative}.tn:hover{background:var(--bgH)}.tn.sel{background:var(--accD);color:var(--acc)}.tn.sel::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--acc)}.tn.msel{background:var(--accD);opacity:.85}.tn.msel::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--acc);opacity:.5}.tn.hid{opacity:.4}.tn.doa{box-shadow:inset 0 2px 0 var(--acc)}.tn.dob{box-shadow:inset 0 -2px 0 var(--acc)}.tn.doi{background:var(--accD);outline:1px dashed var(--acc)}.tn.drg{opacity:.3}
.tt{width:14px;height:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--t3);font-size:9px;transition:transform .12s}.tt.op{transform:rotate(90deg)}.tt.em{visibility:hidden}.ti{width:14px;height:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center}.tl{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:11px}.te{width:18px;height:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:3px;color:var(--t3);opacity:0;transition:all .1s;cursor:pointer;font-size:11px}.tn:hover .te{opacity:.5}.te:hover{opacity:1!important;color:var(--acc);background:var(--accD)}.te.off{opacity:.7!important;color:var(--red)}
.tn-g{background:rgba(168,85,247,.04);border-left:2px solid rgba(168,85,247,.2);padding-left:calc(6px + var(--d,0)*16px)}
.tn-g:hover{background:rgba(168,85,247,.08)}
.tdyn{font-family:'JetBrains Mono',monospace;font-size:7px;padding:1px 3px;border-radius:2px;background:var(--accD);color:var(--acc);flex-shrink:0;font-weight:700;letter-spacing:.4px}
.tn[draggable="true"]{cursor:grab}.tn[draggable="true"]:active{cursor:grabbing}
.lcdot{width:8px;height:8px;border-radius:50%;flex-shrink:0;cursor:pointer;border:1px solid rgba(255,255,255,.15);transition:transform .1s;position:relative}.lcdot:hover{transform:scale(1.4)}
.lc-pop{display:none;position:fixed;background:var(--bg1);border:1px solid var(--brd);border-radius:6px;padding:5px;z-index:1500;box-shadow:0 6px 20px var(--shd);gap:4px;flex-wrap:wrap;width:90px}
.lc-pop.open{display:flex}
.lc-sw{width:14px;height:14px;border-radius:3px;cursor:pointer;border:1.5px solid transparent;transition:all .1s}.lc-sw:hover{transform:scale(1.2);border-color:var(--t1)}
.lc-sw.act{border-color:var(--t1);box-shadow:0 0 0 1px var(--bg1)}
.tn[data-lc]{border-left:3px solid var(--lc-clr,transparent);padding-left:calc(5px + var(--d,0)*16px)}
.lclr-row{display:flex;gap:4px;flex-wrap:wrap;margin-top:4px}
.cv{flex:1;display:flex;flex-direction:column;background:var(--bg0);position:relative;overflow:hidden;transition:background .2s}.tb{display:flex;align-items:center;padding:6px 10px;gap:6px;background:var(--bg1);border-bottom:1px solid var(--brd);transition:background .2s}.tb.bot{border-bottom:none;border-top:1px solid var(--brd);justify-content:center}.tb .btn{padding:4px 10px;font-size:11px}.tgrp{display:flex;gap:3px;align-items:center}.tsep{width:1px;height:20px;background:var(--brd);margin:0 4px;flex-shrink:0}.bt{padding:4px 7px!important;min-width:28px;justify-content:center;border-radius:5px}.bt.act{background:var(--accD);border-color:var(--acc);color:var(--acc)}.clrf{display:flex;align-items:center;gap:3px;cursor:pointer;position:relative}.clrl{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--t3);user-select:none}.clrp{width:0;height:0;opacity:0;position:absolute;pointer-events:none}.clrv{width:18px;height:18px;border-radius:3px;border:1px solid var(--brd);cursor:pointer;transition:border-color .12s}.clrv:hover{border-color:var(--acc)}.zl{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--t2);min-width:44px;text-align:center}
.vp{flex:1;overflow:hidden;position:relative;cursor:grab;background-image:linear-gradient(45deg,var(--chk) 25%,transparent 25%),linear-gradient(-45deg,var(--chk) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,var(--chk) 75%),linear-gradient(-45deg,transparent 75%,var(--chk) 75%);background-size:20px 20px;background-position:0 0,0 10px,10px -10px,-10px 0;transition:background .2s}.vp:active{cursor:grabbing}.vp.t-rect,.vp.t-circle{cursor:crosshair}.vp.t-text{cursor:text}.vp.eldrag{cursor:move!important;user-select:none}.vp.eldrag *{cursor:move!important}.svgc{position:absolute;transform-origin:0 0}.svgc svg{display:block}.hlo{position:absolute;pointer-events:none;border:2px solid var(--acc);background:rgba(108,140,255,.07);box-shadow:0 0 10px var(--accG);border-radius:2px;z-index:100;display:none}.dz{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:50}.dz.has{display:none}.dzi{width:72px;height:72px;border:2px dashed var(--brd2);border-radius:18px;display:flex;align-items:center;justify-content:center;transition:all .2s}.dz:hover .dzi,.vp.dragover .dzi{border-color:var(--acc);background:var(--accD)}.dzt{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--t3);text-align:center;line-height:1.5}.dzt span{color:var(--acc);cursor:pointer}.dzt span:hover{text-decoration:underline}
.pr{width:290px;min-width:230px;background:var(--bg1);border-left:1px solid var(--brd);display:flex;flex-direction:column;flex-shrink:0;transition:background .2s}.prc{flex:1;overflow-y:auto}.prs{border-bottom:1px solid var(--brd);padding:12px 14px}.prst{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t3);margin-bottom:8px}.prr{display:flex;align-items:center;padding:2px 0;gap:8px;font-size:11px}.prk{font-family:'JetBrains Mono',monospace;color:var(--t3);font-size:10px;min-width:48px;flex-shrink:0}.prv{font-family:'JetBrains Mono',monospace;color:var(--t1);font-size:10px;word-break:break-all}.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px;color:var(--t3);font-size:11px;text-align:center;padding:20px}.empty svg{opacity:.25}.la{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px}.la .btn{padding:3px 8px;font-size:10px}
.pig{display:flex;gap:10px;flex-wrap:wrap}.pip{display:flex;align-items:center;gap:3px}.pil{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t3);min-width:16px;text-align:right;cursor:ew-resize;user-select:none}.pil:hover{color:var(--acc)}.pin{width:62px;padding:3px 5px;border:1px solid var(--brd);border-radius:4px;background:var(--inp);color:var(--t1);font-family:'JetBrains Mono',monospace;font-size:10px;outline:none;transition:border-color .12s}.pin:focus{border-color:var(--acc)}.pcr{display:flex;align-items:center;gap:6px;padding:3px 0}
.align-row{display:flex;gap:2px;margin-bottom:8px}
.abtn{width:26px;height:24px;border:1px solid var(--brd);border-radius:4px;background:var(--bg2);color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;transition:all .12s;padding:0}
.abtn:hover{border-color:var(--acc);color:var(--acc);background:var(--accD)}
.anc-wrap{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.anc-grid{display:grid;grid-template-columns:repeat(3,18px);grid-template-rows:repeat(3,18px);gap:1px;background:var(--brd);border:1px solid var(--brd);border-radius:4px;overflow:hidden}
.anc-dot{background:var(--bg2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .1s}
.anc-dot:hover{background:var(--bgH)}
.anc-dot.act{background:var(--acc)}
.anc-dot .dp{width:6px;height:6px;border-radius:50%;background:var(--t3);transition:background .1s}
.anc-dot.act .dp{background:#fff}
.anc-lbl{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--t3)}
.lay-sec{background:var(--bg2);border-radius:6px;padding:10px;margin-top:4px}
.lay-row{display:flex;align-items:center;gap:6px;padding:2px 0}
.lay-dirs{display:flex;gap:2px}
.lay-dir{width:28px;height:24px;border:1px solid var(--brd);border-radius:4px;background:var(--bg0);color:var(--t3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .1s;font-size:11px}
.lay-dir:hover{border-color:var(--acc);color:var(--acc)}
.lay-dir.act{background:var(--accD);border-color:var(--acc);color:var(--acc)}
.lay-aligns{display:flex;gap:2px}
.lay-al{width:24px;height:22px;border:1px solid var(--brd);border-radius:3px;background:var(--bg0);color:var(--t3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .1s;font-size:10px}
.lay-al:hover{border-color:var(--acc)}.lay-al.act{background:var(--accD);border-color:var(--acc);color:var(--acc)}
.lay-fields{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.lay-f{display:flex;align-items:center;gap:3px}
.lay-f .prk{min-width:12px;font-size:9px}.pci{width:24px;height:20px;border:1px solid var(--brd);border-radius:3px;cursor:pointer;padding:0;background:none;-webkit-appearance:none;appearance:none}.pci::-webkit-color-swatch-wrapper{padding:1px}.pci::-webkit-color-swatch{border:none;border-radius:2px}
.dr{display:flex;align-items:center;gap:6px;padding:3px 0}.dr input[type="checkbox"]{accent-color:var(--acc);width:14px;height:14px;cursor:pointer}.dr label{font-family:'JetBrains Mono',monospace;font-size:11px;cursor:pointer;user-select:none}.dal{flex:1;padding:4px 6px;border:1px solid var(--brd);border-radius:4px;background:var(--inp);color:var(--t1);font-family:'JetBrains Mono',monospace;font-size:10px;outline:none}.dal:focus{border-color:var(--acc)}.dg{display:flex;flex-wrap:wrap;gap:3px 10px;margin-top:4px}.dc{display:flex;align-items:center;gap:3px}.dc input{accent-color:var(--acc);width:12px;height:12px;cursor:pointer}.dc label{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--t2);cursor:pointer;user-select:none}
.mo{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1000;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}.mo.open{display:flex}.md{background:var(--bg1);border:1px solid var(--brd);border-radius:12px;width:560px;max-height:80vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px var(--shd);animation:mIn .18s ease}@keyframes mIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:none}}.mh{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--brd)}.mt{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;display:flex;align-items:center;gap:6px}.mx{width:26px;height:26px;border:none;background:var(--bgH);border-radius:5px;color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .12s}.mx:hover{background:var(--bgA);color:var(--t1)}.mb{flex:1;overflow-y:auto}.ms{padding:16px 20px;border-bottom:1px solid var(--brd)}.ms:last-child{border-bottom:none}.msl{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t3);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.df{display:flex;flex-wrap:wrap;gap:5px}.fc{font-family:'JetBrains Mono',monospace;font-size:10px;padding:4px 8px;border-radius:5px;border:1px solid var(--brd);background:var(--bg2);color:var(--t2);display:flex;align-items:center;gap:5px}.fc .dot{width:6px;height:6px;border-radius:50%}.fc .dot.ok{background:var(--grn)}.fc .dot.no{background:var(--red)}.gfi{flex:1;padding:7px 10px;border:1px solid var(--brd);border-radius:5px;background:var(--inp);color:var(--t1);font-family:'JetBrains Mono',monospace;font-size:11px;outline:none}.gfi:focus{border-color:var(--acc)}.gfi::placeholder{color:var(--t3)}.gfr{display:flex;flex-direction:column;gap:3px;max-height:200px;overflow-y:auto}.gfit{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:5px;transition:background .08s}.gfit:hover{background:var(--bgH)}.gfil{display:flex;flex-direction:column;gap:1px;flex:1;min-width:0}.gfin{font-size:12px;font-weight:500}.gfip{font-size:13px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ll{display:flex;flex-direction:column;gap:5px}.li{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:6px;background:var(--bg2);border:1px solid var(--brd)}.lii{display:flex;flex-direction:column;gap:1px}.lin{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600}.lis{font-size:9px;color:var(--t3)}.lip{font-size:13px;color:var(--t2);margin-top:1px}.fuz{border:2px dashed var(--brd2);border-radius:8px;padding:18px;text-align:center;cursor:pointer;transition:all .12s;color:var(--t3);font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.5}.fuz:hover,.fuz.dragover{border-color:var(--acc);background:var(--accD);color:var(--t2)}.fuz p{margin-top:4px;font-size:9px;color:var(--t3)}.fnd{display:flex;gap:5px;align-items:center;margin-top:8px;padding:8px 10px;border-radius:6px;background:var(--bg2);border:1px solid var(--acc)}.fnd .gfi{flex:1;padding:4px 8px}
.doc{padding:8px 10px;border-radius:6px;background:var(--bg2);border:1px solid var(--brd);margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:border-color .12s}.doc:hover{border-color:var(--acc)}.don{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600}.dot2{font-size:9px;color:var(--t3);margin-top:1px}.dop{font-size:9px;color:var(--acc)}
</style>
</head>
<body>
<div class="hdr"><div class="hdr-b"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--acc)" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>HUIGMA</div><div class="hdr-a"><a href="/" class="btn" title="На главную">🏠</a><button class="btn" id="saveBtn" onclick="saveTemplate()" title="Ctrl+S">💾 Save</button><button class="thm" onclick="toggleTheme()" id="thmB">☀</button><button class="btn" onclick="$('fI').click()">Open SVG</button><button class="btn" onclick="openM('fM')">Fonts <span class="bdg" id="fBdg">0</span></button><button class="btn" onclick="openM('aM')">API <span class="bdg" id="dBdg">0</span></button><button class="btn" onclick="openM('figM')">Figma</button><input type="file" id="fI" accept=".svg" style="display:none" onchange="handleFile(this.files[0])"></div></div>
<div class="ws">
<div class="pl"><div class="ph">Layers <span class="bdg" id="nC">0</span></div><div class="tc0" id="tC"></div></div>
<div class="cv">
<div class="tb" style="justify-content:flex-start"><div class="tgrp"><button class="btn bt act" data-tool="select" onclick="setTool('select')" title="V"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg></button><button class="btn bt" data-tool="rect" onclick="setTool('rect')" title="R"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></button><button class="btn bt" data-tool="circle" onclick="setTool('circle')" title="C"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></button><button class="btn bt" data-tool="text" onclick="setTool('text')" title="T"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9.5" y1="20" x2="14.5" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></button></div><div class="tsep"></div><label class="clrf" title="Fill"><span class="clrl">Fill</span><input type="color" id="tFi" value="#4a6cf7" class="clrp"><span class="clrv" id="tFiV" style="background:#4a6cf7" onclick="$('tFi').click()"></span></label><label class="clrf" title="Stroke"><span class="clrl">Stroke</span><input type="color" id="tSt" value="#222838" class="clrp"><span class="clrv" id="tStV" style="background:#222838" onclick="$('tSt').click()"></span></label><div style="display:flex;align-items:center;gap:3px"><span class="clrl">W</span><input type="number" id="tSW" value="2" min="0" max="50" step="1" class="pin" style="width:38px"></div><div class="tsep"></div><label class="clrf"><input type="checkbox" id="tNF" style="accent-color:var(--acc)"><span class="clrl" style="cursor:pointer">No fill</span></label><label class="clrf"><input type="checkbox" id="tNS" style="accent-color:var(--acc)"><span class="clrl" style="cursor:pointer">No stroke</span></label></div>
<div class="vp" id="vp" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="handleDrop(event)"><div class="svgc" id="sC"></div><div class="hlo" id="hlo"></div><div class="dz" id="dz"><div class="dzi"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div><div class="dzt">Перетащите SVG сюда или <span onclick="$('fI').click()">выберите</span></div></div></div>
<div class="tb bot"><button class="btn" onclick="zoomBy(-.15)">−</button><span class="zl" id="zL">100%</span><button class="btn" onclick="zoomBy(.15)">+</button><div class="tsep"></div><button class="btn" onclick="fitV()">Fit</button><div style="flex:1"></div><label class="clrf" title="Фон canvas"><span class="clrl">BG</span><input type="color" id="vpBg" value="#0d0f12" class="clrp"><span class="clrv" id="vpBgV" style="background:#0d0f12;background-image:linear-gradient(45deg,#888 25%,transparent 25%),linear-gradient(-45deg,#888 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#888 75%),linear-gradient(-45deg,transparent 75%,#888 75%);background-size:8px 8px;background-position:0 0,0 4px,4px -4px,-4px 0" onclick="$('vpBg').click()"></span></label><button class="btn" style="padding:4px 8px;font-size:10px" onclick="resetVpBg()" title="Шашечка">⊘</button></div>
</div>
<div class="pr"><div class="ph">Properties</div><div class="prc" id="pC"><div class="empty"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Выберите элемент</span></div></div></div>
</div>
<!-- FONT MODAL -->
<div class="mo" id="fM" onclick="if(event.target===this)closeM('fM')"><div class="md"><div class="mh"><span class="mt">🔤 Fonts</span><button class="mx" onclick="closeM('fM')">&times;</button></div><div class="mb"><div class="ms"><div class="msl">В SVG</div><div class="df" id="dF"><span style="color:var(--t3);font-size:11px">Загрузите SVG</span></div></div><div class="ms"><div class="msl">Google Fonts</div><div style="display:flex;gap:6px;margin-bottom:10px"><input class="gfi" id="gfS" placeholder="Поиск…" oninput="searchGF(this.value)"></div><div class="gfr" id="gfR"></div></div><div class="ms"><div class="msl">Свой файл</div><div class="fuz" onclick="$('ffI').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="hFDrop(event)">.woff2 .woff .ttf .otf<p>Перетащите или кликните</p></div><input type="file" id="ffI" accept=".woff2,.woff,.ttf,.otf" multiple style="display:none" onchange="hFF(this.files)"><div id="fnP"></div></div><div class="ms"><div class="msl">Загруженные</div><div class="ll" id="lF"><span style="color:var(--t3);font-size:11px">Нет</span></div></div></div></div></div>
<!-- API MODAL -->
<div class="mo" id="aM" onclick="if(event.target===this)closeM('aM')"><div class="md" style="width:600px"><div class="mh"><span class="mt">⚡ API</span><button class="mx" onclick="closeM('aM')">&times;</button></div><div class="mb"><div class="ms"><p style="font-size:11px;color:var(--t2);line-height:1.5">Формат: <code style="background:var(--bgH);padding:1px 5px;border-radius:3px;font-size:10px">"alias.prop": value</code></p></div><div class="ms"><div class="msl" style="justify-content:space-between"><span>JSON</span><button class="btn" style="padding:2px 8px;font-size:9px" id="cpB" onclick="cpJ()">Копировать</button></div><pre id="jO" style="background:var(--inp);border:1px solid var(--brd);border-radius:6px;padding:12px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t1);overflow:auto;max-height:300px;white-space:pre-wrap;line-height:1.4"></pre></div><div class="ms"><div class="msl">Объекты</div><div id="dL"></div></div></div></div></div>
<!-- FIGMA MODAL -->
<div class="mo" id="figM" onclick="if(event.target===this)closeM('figM')"><div class="md" style="width:660px"><div class="mh"><span class="mt">🎨 Figma Import</span><button class="mx" onclick="closeM('figM')">&times;</button></div><div class="mb">
<div class="ms"><p style="font-size:11px;color:var(--t2);line-height:1.6"><b>Шаг 1:</b> Загрузите SVG из Figma.<br><b>Шаг 2:</b> Вставьте ссылку Figma API или JSON — layout привяжется к SVG.</p></div>
<div class="ms"><div class="msl">Figma API</div>
<div style="display:flex;gap:6px;margin-bottom:6px"><input class="pin" id="figToken" style="width:100%;font-size:10px" placeholder="Personal Access Token (figd_...)" value=""></div>
<div style="display:flex;gap:6px"><input class="pin" id="figUrl" style="flex:1;font-size:10px" placeholder="https://api.figma.com/v1/files/:key/nodes?ids=...  или ссылка на фрейм"><button class="btn btn-p" style="white-space:nowrap" onclick="fetchFigma()">Загрузить</button></div>
</div>
<div class="ms"><div class="msl">или JSON вручную</div><textarea id="figJson" style="width:100%;height:120px;background:var(--inp);border:1px solid var(--brd);border-radius:6px;padding:10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t1);resize:vertical" placeholder='Вставьте JSON сюда или загрузите по ссылке выше'></textarea>
<div style="display:flex;gap:6px;margin-top:8px"><button class="btn" onclick="$('figFile').click()">📁 .json файл</button><input type="file" id="figFile" accept=".json" style="display:none" onchange="loadFigFile(this.files[0])"><div style="flex:1"></div><button class="btn btn-p" onclick="applyFigmaMeta()">Привязать Layout</button></div>
<div id="figLog" style="margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t3);max-height:100px;overflow:auto"></div>
</div></div></div></div>

<script>
const $=id=>document.getElementById(id);
let svg=null,zm=1,px=0,py=0,isPan=false,lm={x:0,y:0};
let selEl=null,nM=new Map(),nc=0,hidS=new Set(),dynM=new Map();
const selSet=new Set(); // multi-selection nids
const LC=new Map();
const ANC=new Map(); // nid → {ax:'l'|'c'|'r', ay:'t'|'c'|'b'}
const LAY=new Map();
const GN=new Map(); // nid → custom group name
const TBB=new Map(); // nid → {w,h} text bounding box from Figma
const LCLR=['transparent','#ff6b6b','#ff9f43','#feca57','#2ed573','#1dd1a1','#54a0ff','#6c8cff','#a855f7','#f472b6','#c8d6e5'];
let ldF=[],detF=new Set(),gfL=null;
let tool='select',isDraw=false,dSt=null,dEl=null;
let isDrEl=false,dES=null,dEO=null;
const vp=$('vp');
// Undo/redo history
const HIST=[],HFWD=[];const HMAX=20;
function hPush(){if(!svg)return;const s=new XMLSerializer().serializeToString(svg);HIST.push(s);if(HIST.length>HMAX)HIST.shift();HFWD.length=0;}
function hUndo(){if(!HIST.length||!svg)return;HFWD.push(new XMLSerializer().serializeToString(svg));if(HFWD.length>HMAX)HFWD.shift();const s=HIST.pop();hRestore(s);}
function hRedo(){if(!HFWD.length||!svg)return;HIST.push(new XMLSerializer().serializeToString(svg));const s=HFWD.pop();hRestore(s);}
function hRestore(s){const d=new DOMParser().parseFromString(s,'image/svg+xml'),ns=d.querySelector('svg');if(!ns)return;const c=$('sC');c.innerHTML='';svg=ns;nM.clear();nc=0;selEl=null;selSet.clear();c.appendChild(ns);tagA(ns);ns.querySelectorAll('*').forEach(el=>{el.addEventListener('click',e=>{e.stopPropagation();let t=el;while(t&&!t.dataset.nid)t=t.parentElement;if(t?.dataset.nid)selN(t.dataset.nid,e);});el.style.cursor='pointer';});$('hlo').style.display='none';bT();sP(null);detFonts();uDB();upTf();}

function toggleTheme(){const h=document.documentElement,n=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=n;$('thmB').textContent=n==='dark'?'☀':'🌙';}
function openM(id){$(id).classList.add('open');if(id==='fM'){uDU();uLU();}if(id==='aM'){rJ();rDL();}if(id==='figM'){try{const t=localStorage.getItem('figma_token');if(t&&$('figToken'))$('figToken').value=t;}catch(e){}}}
function closeM(id){$(id).classList.remove('open');}
function handleFile(f){if(!f)return;const r=new FileReader();r.onload=e=>loadSVG(e.target.result);r.readAsText(f);}
function handleDrop(e){e.preventDefault();e.currentTarget.classList.remove('dragover');const f=e.dataTransfer.files[0];if(f?.name.endsWith('.svg'))handleFile(f);}

function loadSVG(t){
  const d=new DOMParser().parseFromString(t,'image/svg+xml'),s=d.querySelector('svg');if(!s)return;
  svg=s;nM.clear();nc=0;selEl=null;hidS.clear();dynM.clear();
  const vb=s.viewBox?.baseVal;if(vb?.width&&vb?.height){if(!s.getAttribute('width'))s.setAttribute('width',vb.width);if(!s.getAttribute('height'))s.setAttribute('height',vb.height);}
  const c=$('sC');c.innerHTML='';c.appendChild(s);tagA(s);
  s.querySelectorAll('*').forEach(el=>{el.addEventListener('click',e=>{e.stopPropagation();let t=el;while(t&&!t.dataset.nid)t=t.parentElement;if(t?.dataset.nid)selN(t.dataset.nid,e);});el.style.cursor='pointer';});
  $('dz').classList.add('has');$('hlo').style.display='none';sP(null);bT();detFonts();uDB();fitV();
}
function tagA(el){const tag=el.tagName?.toLowerCase();if(tag==='tspan')return;const id='n'+(nc++);el.dataset.nid=id;nM.set(id,el);for(const c of el.children)tagA(c);}

// TREE
const IC={svg:'<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>',g:'<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>',rect:'<rect x="3" y="3" width="18" height="18" rx="2"/>',circle:'<circle cx="12" cy="12" r="10"/>',ellipse:'<ellipse cx="12" cy="12" rx="10" ry="7"/>',line:'<line x1="5" y1="19" x2="19" y2="5"/>',polyline:'<polyline points="4 17 10 11 16 15 22 9"/>',polygon:'<polygon points="12 2 19 21 5 21"/>',path:'<path d="M3 17c4-6 8 2 12-4s4-6 6-2"/>',text:'<polyline points="4 7 4 4 20 4 20 7"/><line x1="12" y1="4" x2="12" y2="20"/>'};
const VT=new Set('svg g rect circle ellipse line polyline polygon path text image use defs clipPath mask linearGradient radialGradient pattern symbol marker foreignObject a'.split(' '));
function bT(){const c=$('tC');c.innerHTML='';if(!svg)return;let cnt=0;
function mk(el,d){const tag=el.tagName.toLowerCase();if(!VT.has(tag))return null;const nid=el.dataset.nid;cnt++;
const kids=[];for(const ch of el.children){const k=mk(ch,d+1);if(k)kids.push(k);}kids.reverse();const hk=kids.length>0,op=d<2;
const div=document.createElement('div'),row=document.createElement('div');
row.className='tn'+(hidS.has(nid)?' hid':'')+(selEl===el?' sel':'')+(selSet.has(nid)?' msel':'')+(tag==='g'?' tn-g':'');
row.style.setProperty('--d',d);row.dataset.nid=nid;
const lci=LC.get(nid)||0;
if(lci){
  row.dataset.lc='1';row.style.setProperty('--lc-clr',LCLR[lci]);
  if(tag==='g'){row.style.background=LCLR[lci]+'18';row.style.borderLeftColor=LCLR[lci];}
}
// Entire row is draggable
row.draggable=true;
row.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',nid);e.dataTransfer.effectAllowed='move';row.classList.add('drg');});
row.addEventListener('dragend',()=>{row.classList.remove('drg');clDI();});
row.addEventListener('dragover',e=>{e.preventDefault();e.stopPropagation();if(e.dataTransfer.getData('text/plain')===nid)return;clDI();const r=row.getBoundingClientRect(),y=e.clientY-r.top;row.classList.add(y<r.height*.25?'doa':y>r.height*.75?'dob':'doi');});
row.addEventListener('dragleave',()=>row.classList.remove('doa','dob','doi'));
row.addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();const src=e.dataTransfer.getData('text/plain');if(!src||src===nid)return;const r=row.getBoundingClientRect(),y=e.clientY-r.top;clDI();mvL(src,nid,y<r.height*.25?'above':y>r.height*.75?'below':'inside');});
const tg=document.createElement('span');tg.className='tt'+(hk?(op?' op':''):' em');tg.textContent='▶';
if(hk)tg.onclick=e=>{e.stopPropagation();const ch=div.querySelector('.tc0');if(!ch)return;const o=ch.style.display!=='none';ch.style.display=o?'none':'block';tg.classList.toggle('op',!o);};
const ic=document.createElement('span');ic.className='ti';
const elFill=el.getAttribute('fill');
const icFill=(elFill&&elFill!=='none'&&!elFill.startsWith('url'))?elFill:'currentColor';
const icStroke=(elFill&&elFill!=='none'&&!elFill.startsWith('url'))?elFill:'currentColor';
ic.innerHTML=`<svg width="11" height="11" viewBox="0 0 24 24" fill="${tag==='g'||tag==='line'||tag==='polyline'||tag==='path'?'none':icFill}" stroke="${icStroke}" stroke-width="2">${IC[tag]||IC.path}</svg>`;
const lb=document.createElement('span');lb.className='tl';
const eid=el.getAttribute('id'),cls=el.getAttribute('class');let lt=tag;
if(GN.has(nid))lt=GN.get(nid);
else if('text'.includes(tag)){const txt=el.textContent?.trim();if(txt)lt='"'+txt.slice(0,20)+(txt.length>20?'…':'')+'"';}
else if(eid)lt=eid;else if(cls)lt='.'+cls.split(/\s+/)[0];
lb.textContent=lt;
if(tag==='g'){lb.addEventListener('dblclick',e=>{e.stopPropagation();renameGroup(nid,lb);});}
lb.textContent=lt;
const ey=document.createElement('span');ey.className='te'+(hidS.has(nid)?' off':'');ey.textContent=hidS.has(nid)?'🚫':'👁';ey.onclick=e=>{e.stopPropagation();togV(nid);};
row.append(tg,ic,lb);
// Color dot
const cd=document.createElement('span');cd.className='lcdot';cd.style.background=lci?LCLR[lci]:'var(--brd)';
cd.onclick=e=>{e.stopPropagation();openLCPop(nid,cd);};
row.appendChild(cd);
if(dynM.has(nid)){const db=document.createElement('span');db.className='tdyn';db.textContent='API';row.appendChild(db);}
row.appendChild(ey);row.onclick=e=>selN(nid,e);div.appendChild(row);
if(hk){const kd=document.createElement('div');kd.className='tc0';kd.style.display=op?'block':'none';kids.forEach(k=>kd.appendChild(k));div.appendChild(kd);}return div;}
const tree=mk(svg,0);if(tree)c.appendChild(tree);$('nC').textContent=cnt;}
function clDI(){document.querySelectorAll('.doa,.dob,.doi').forEach(e=>e.classList.remove('doa','dob','doi'));}

// Inline rename for groups
function renameGroup(nid,lbSpan){
  const old=GN.get(nid)||lbSpan.textContent;
  const inp=document.createElement('input');
  inp.className='pin';inp.style.cssText='width:100%;padding:1px 4px;font-size:11px;';
  inp.value=old;lbSpan.textContent='';lbSpan.appendChild(inp);inp.focus();inp.select();
  const done=()=>{const v=inp.value.trim();if(v&&v!=='g')GN.set(nid,v);else GN.delete(nid);bT();
    const r=document.querySelector(`.tn[data-nid="${nid}"]`);if(r)r.classList.add('sel');};
  inp.addEventListener('blur',done);
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();done();}if(e.key==='Escape'){GN.delete(nid);bT();}});
}

// Shared layer-color popup
const lcPop=document.createElement('div');lcPop.className='lc-pop';lcPop.addEventListener('mousedown',e=>e.stopPropagation());
lcPop.addEventListener('click',e=>e.stopPropagation());
document.body.appendChild(lcPop);
let lcPopNid=null;

function openLCPop(nid,dot){
  if(lcPop.classList.contains('open')&&lcPopNid===nid){lcPop.classList.remove('open');return;}
  lcPopNid=nid;const curI=LC.get(nid)||0;
  lcPop.innerHTML='';
  LCLR.forEach((clr,i)=>{
    const sw=document.createElement('span');sw.className='lc-sw'+(i===curI?' act':'');
    sw.style.background=i===0?'var(--bg0)':clr;
    if(i===0){sw.style.backgroundImage='linear-gradient(135deg,var(--bg0) 45%,var(--red) 45%,var(--red) 55%,var(--bg0) 55%)';sw.title='Нет цвета';}
    sw.onclick=()=>{if(i===0)LC.delete(nid);else LC.set(nid,i);lcPop.classList.remove('open');bT();const r=document.querySelector(`.tn[data-nid="${nid}"]`);if(r)r.classList.add('sel');};
    lcPop.appendChild(sw);
  });
  const rc=dot.getBoundingClientRect();
  lcPop.style.left=rc.left+'px';lcPop.style.top=(rc.bottom+4)+'px';
  lcPop.classList.add('open');
}
document.addEventListener('mousedown',e=>{if(!lcPop.contains(e.target)&&!e.target.classList.contains('lcdot'))lcPop.classList.remove('open');});
function togV(nid){const el=nM.get(nid);if(!el)return;hidS.has(nid)?(hidS.delete(nid),el.style.display=''):(hidS.add(nid),el.style.display='none');bT();if(selEl)sP(selEl);}
function mvL(sn,tn,z){hPush();const s=nM.get(sn),t=nM.get(tn);if(!s||!t||s.contains(t))return;const p=t.parentNode;if(z==='above')p.insertBefore(s,t);else if(z==='below')p.insertBefore(s,t.nextSibling);else{const tg=t.tagName.toLowerCase();'g svg defs clipPath mask symbol marker a pattern'.split(' ').includes(tg)?t.appendChild(s):p.insertBefore(s,t.nextSibling);}bT();selN(sn);}
function mvU(){if(!selEl||selEl===svg)return;hPush();const nx=selEl.nextElementSibling;if(nx){const n=selEl.dataset.nid;selEl.parentNode.insertBefore(nx,selEl);bT();selN(n);}}
function mvD(){if(!selEl||selEl===svg)return;hPush();const p=selEl.previousElementSibling;if(p){const n=selEl.dataset.nid;selEl.parentNode.insertBefore(selEl,p);bT();selN(n);}}
function delS(){if(!selEl||selEl===svg)return;hPush();const n=selEl.dataset.nid;selEl.remove();nM.delete(n);dynM.delete(n);selEl=null;$('hlo').style.display='none';bT();sP(null);uDB();}

// SELECTION
function selN(nid,e){
  const el=nM.get(nid);
  const isShift=e&&(e.shiftKey||e.ctrlKey||e.metaKey);

  if(isShift&&nid){
    // Toggle in multi-select
    if(selSet.has(nid))selSet.delete(nid);
    else selSet.add(nid);
    // Also keep primary in set
    if(selEl&&selEl.dataset.nid)selSet.add(selEl.dataset.nid);
    selEl=el;
  }else{
    // Single select — clear multi
    selSet.clear();
    selEl=el;
  }
  // Update tree highlights
  document.querySelectorAll('.tn.sel,.tn.msel').forEach(n=>n.classList.remove('sel','msel'));
  if(selSet.size>1){
    selSet.forEach(sid=>{const r=document.querySelector(`.tn[data-nid="${sid}"]`);if(r)r.classList.add('msel');});
  }else{
    const row=document.querySelector(`.tn[data-nid="${nid}"]`);if(row)row.classList.add('sel');
  }
  // Expand parents
  const row=document.querySelector(`.tn[data-nid="${nid}"]`);
  if(row)row.scrollIntoView({behavior:'smooth',block:'nearest'});
  let p=row?.parentElement;
  while(p){if(p.classList?.contains('tc0')&&p.style.display==='none'){p.style.display='block';const t=p.previousElementSibling?.querySelector('.tt');if(t)t.classList.add('op');}p=p.parentElement;}
  hl(selEl);
  // Show/hide text frame visual
  clearTextFrames();
  if(el&&el.tagName?.toLowerCase()==='text'&&el.dataset.nid&&TBB.has(el.dataset.nid)){
    updateTextFrame(el,el.dataset.nid);
  }
  // Show props: multi or single
  if(selSet.size>1)showMultiProps();else sP(selEl);
}

function showMultiProps(){
  const c=$('pC');
  let h=`<div class="prs"><div class="prst">${selSet.size} элементов выбрано</div>`;
  h+=`<div class="la">`;
  h+=`<button class="btn" onclick="groupSel()" title="Ctrl+G">📁 Группа</button>`;
  h+=`<button class="btn" onclick="alignMulti('left')">⬅ Лево</button>`;
  h+=`<button class="btn" onclick="alignMulti('cx')">↔ Центр</button>`;
  h+=`<button class="btn" onclick="alignMulti('top')">⬆ Верх</button>`;
  h+=`<button class="btn" onclick="alignMulti('cy')">↕ Середина</button>`;
  h+=`</div></div>`;
  // List selected
  h+=`<div class="prs"><div class="prst">Выбранные</div>`;
  selSet.forEach(nid=>{
    const el=nM.get(nid);if(!el)return;
    const tag=el.tagName.toLowerCase();
    const name=el.id?'#'+el.id:el.textContent?.trim().slice(0,20)||tag;
    h+=`<div class="prr" style="cursor:pointer" onclick="selSet.clear();selN('${nid}')"><span class="prk">${tag}</span><span class="prv">${esc(name)}</span></div>`;
  });
  h+=`</div>`;
  c.innerHTML=h;
}

// Group selected elements
function groupSel(){
  if(selSet.size<2||!svg)return;hPush();
  const els=[];
  selSet.forEach(nid=>{const el=nM.get(nid);if(el&&el!==svg)els.push(el);});
  if(els.length<2)return;
  // Find common parent
  const parent=els[0].parentNode;
  // Create group
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');
  // Insert group before first selected element
  const sorted=[...els].sort((a,b)=>{
    const children=Array.from(parent.children);
    return children.indexOf(a)-children.indexOf(b);
  });
  parent.insertBefore(g,sorted[0]);
  // Move elements into group
  sorted.forEach(el=>g.appendChild(el));
  // Re-tag and rebuild
  tagA(g);
  g.addEventListener('click',e=>{e.stopPropagation();if(g.dataset.nid)selN(g.dataset.nid);});
  g.style.cursor='pointer';
  selSet.clear();
  bT();selN(g.dataset.nid);
}

// Ungroup
function ungroupSel(){
  if(!selEl||selEl.tagName.toLowerCase()!=='g'||selEl===svg)return;hPush();
  const parent=selEl.parentNode;
  const kids=[...selEl.children];
  const ref=selEl;
  kids.forEach(ch=>parent.insertBefore(ch,ref));
  ref.remove();nM.delete(ref.dataset.nid);
  selEl=null;selSet.clear();bT();sP(null);
}

// Align multiple selected elements to each other
function alignMulti(dir){
  if(selSet.size<2)return;hPush();
  const els=[];
  selSet.forEach(nid=>{const el=nM.get(nid);if(el)try{els.push({el,b:el.getBBox()});}catch(e){}});
  if(els.length<2)return;
  // Find reference bounds
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  els.forEach(({b})=>{minX=Math.min(minX,b.x);minY=Math.min(minY,b.y);maxX=Math.max(maxX,b.x+b.width);maxY=Math.max(maxY,b.y+b.height);});
  const cx=(minX+maxX)/2,cy=(minY+maxY)/2;

  els.forEach(({el,b})=>{
    let dx=0,dy=0;
    if(dir==='left')dx=minX-b.x;
    else if(dir==='cx')dx=cx-b.width/2-b.x;
    else if(dir==='right')dx=maxX-b.width-b.x;
    else if(dir==='top')dy=minY-b.y;
    else if(dir==='cy')dy=cy-b.height/2-b.y;
    else if(dir==='bottom')dy=maxY-b.height-b.y;
    if(!dx&&!dy)return;
    const pi=pA(el);
    if(pi&&pi._t){const t=gTr(el);sTr(el,Math.round((t.x+dx)*10)/10,Math.round((t.y+dy)*10)/10);}
    else if(pi&&pi.x1){['x1','x2'].forEach(a=>el.setAttribute(a,Math.round((+el.getAttribute(a)+dx)*10)/10));['y1','y2'].forEach(a=>el.setAttribute(a,Math.round((+el.getAttribute(a)+dy)*10)/10));}
    else if(pi){const xa=pi.x||pi.cx||'x',ya=pi.y||pi.cy||'y';if(dx)el.setAttribute(xa,Math.round(((+el.getAttribute(xa)||0)+dx)*10)/10);if(dy)el.setAttribute(ya,Math.round(((+el.getAttribute(ya)||0)+dy)*10)/10);}
    else{const t=gTr(el);sTr(el,Math.round((t.x+dx)*10)/10,Math.round((t.y+dy)*10)/10);}
  });
  hl(selEl);
}
function hl(el){const o=$('hlo');if(!el||el.tagName.toLowerCase()==='svg'||hidS.has(el.dataset?.nid)){o.style.display='none';return;}try{const r=el.getBoundingClientRect(),v=vp.getBoundingClientRect();if(!r.width&&!r.height){o.style.display='none';return;}o.style.display='block';o.style.left=(r.left-v.left-2)+'px';o.style.top=(r.top-v.top-2)+'px';o.style.width=(r.width+4)+'px';o.style.height=(r.height+4)+'px';}catch(e){o.style.display='none';}}

// Text frame visual — shows bounding box from Figma TBB
function updateTextFrame(textEl,nid){
  const NS='http://www.w3.org/2000/svg';
  let old=svg?.querySelector('[data-tframe="'+nid+'"]');
  if(old)old.remove();
  const tbb=TBB.get(nid);
  if(!tbb||!tbb.w||!textEl)return;
  const tspans=textEl.querySelectorAll('tspan');
  const firstX=parseFloat((tspans[0]||textEl).getAttribute('x'))||0;
  const firstY=parseFloat((tspans[0]||textEl).getAttribute('y'))||0;
  const fs=parseFloat(textEl.getAttribute('font-size'))||14;
  const lineCount=Math.max(1,tspans.length);
  let lh=fs*1.3;
  if(tspans.length>1){
    const dy=parseFloat(tspans[1].getAttribute('dy'));
    if(dy>0)lh=dy;
    else{
      const y0=parseFloat(tspans[0].getAttribute('y'))||0;
      const y1=parseFloat(tspans[1].getAttribute('y'))||0;
      if(y1>y0)lh=y1-y0;
    }
  }
  // Height: dynamic based on actual line count
  const frameH=lineCount*lh;
  // Update TBB height so layout knows the new size
  tbb.h=frameH;
  const r=document.createElementNS(NS,'rect');
  r.dataset.tframe=nid;
  r.setAttribute('x',firstX);
  r.setAttribute('y',firstY-fs*0.85); // approx ascender offset
  r.setAttribute('width',tbb.w);
  r.setAttribute('height',frameH);
  r.setAttribute('fill','none');
  r.setAttribute('stroke','#6391FF');
  r.setAttribute('stroke-width','1.5');
  r.setAttribute('stroke-dasharray','6 4');
  r.setAttribute('pointer-events','none');
  textEl.parentElement.insertBefore(r,textEl);
}
function clearTextFrames(){
  if(!svg)return;
  svg.querySelectorAll('[data-tframe]').forEach(r=>r.remove());
}

// POSITION
function pA(el){const t=el.tagName.toLowerCase();if('rect image use foreignObject'.includes(t))return{x:'x',y:'y',w:'width',h:'height'};if(t==='circle')return{cx:'cx',cy:'cy',r:'r'};if(t==='ellipse')return{cx:'cx',cy:'cy',rx:'rx',ry:'ry'};if('text tspan'.includes(t))return{x:'x',y:'y'};if(t==='line')return{x1:'x1',y1:'y1',x2:'x2',y2:'y2'};if('g path polygon polyline'.includes(t))return{_t:1};return null;}
function gTr(el){const m=(el.getAttribute('transform')||'').match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/);return m?{x:+m[1],y:+m[2]}:{x:0,y:0};}
function sTr(el,x,y){let t=el.getAttribute('transform')||'';t=/translate\(/.test(t)?t.replace(/translate\([^)]*\)/,`translate(${x},${y})`):`translate(${x},${y}) ${t}`.trim();el.setAttribute('transform',t);}

// Alignment
function alignEl(dir){
  if(!selEl||selEl===svg)return;hPush();
  // Get canvas bounds from viewBox
  const vb=svg.viewBox?.baseVal;
  const cw=vb?.width||parseFloat(svg.getAttribute('width'))||400;
  const ch=vb?.height||parseFloat(svg.getAttribute('height'))||300;
  // Get element bbox
  let bbox;try{bbox=selEl.getBBox();}catch(e){return;}
  const pi=pA(selEl);
  if(!pi)return;

  let dx=0,dy=0;
  if(dir==='left')dx=-bbox.x;
  else if(dir==='cx')dx=(cw-bbox.width)/2-bbox.x;
  else if(dir==='right')dx=cw-bbox.width-bbox.x;
  else if(dir==='top')dy=-bbox.y;
  else if(dir==='cy')dy=(ch-bbox.height)/2-bbox.y;
  else if(dir==='bottom')dy=ch-bbox.height-bbox.y;

  if(pi._t){
    const tr=gTr(selEl);
    if(dir==='left'||dir==='cx'||dir==='right')sTr(selEl,Math.round((tr.x+dx)*10)/10,tr.y);
    else sTr(selEl,tr.x,Math.round((tr.y+dy)*10)/10);
  }else if(pi.x1){
    // line
    if(dx){selEl.setAttribute('x1',Math.round((parseFloat(selEl.getAttribute('x1'))||0)+dx));selEl.setAttribute('x2',Math.round((parseFloat(selEl.getAttribute('x2'))||0)+dx));}
    if(dy){selEl.setAttribute('y1',Math.round((parseFloat(selEl.getAttribute('y1'))||0)+dy));selEl.setAttribute('y2',Math.round((parseFloat(selEl.getAttribute('y2'))||0)+dy));}
  }else{
    const xa=pi.x||pi.cx||'x',ya=pi.y||pi.cy||'y';
    if(dx)selEl.setAttribute(xa,Math.round(((parseFloat(selEl.getAttribute(xa))||0)+dx)*10)/10);
    if(dy)selEl.setAttribute(ya,Math.round(((parseFloat(selEl.getAttribute(ya))||0)+dy)*10)/10);
  }
  hl(selEl);sP(selEl);
}

// PROPERTIES
function sP(el){const c=$('pC');if(!el){c.innerHTML='<div class="empty"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Выберите элемент</span></div>';return;}
const tag=el.tagName.toLowerCase(),nid=el.dataset.nid,isR=tag==='svg';let h='';
h+=`<div class="prs"><div class="prst">Слой</div><div class="prr"><span class="prk">Тег</span><span class="prv">&lt;${tag}&gt;</span></div>`;
if(el.id){
  let idDisplay=el.id;
  // For text elements, Figma exports encoded names as IDs — show text snippet instead
  if(tag==='text'&&el.textContent){idDisplay=el.textContent.trim().slice(0,40);}
  h+=`<div class="prr"><span class="prk">ID</span><span class="prv" style="word-break:break-all;font-size:10px">${esc(idDisplay)}</span></div>`;
}
if(tag==='g')h+=`<div class="pcr"><span class="prk">Имя</span><input class="pin" style="width:130px" id="gName" value="${esc(GN.get(nid)||el.id||'')}" placeholder="Имя группы"></div>`;
// Color label — all elements including SVG root
{const curLC=LC.get(nid)||0;
  h+=`<div class="prr"><span class="prk">Метка</span><div class="lclr-row" id="lcRow">`;
  LCLR.forEach((clr,i)=>{h+=`<span class="lc-sw${i===curLC?' act':''}" style="width:16px;height:16px;border-radius:4px;cursor:pointer;background:${i===0?'var(--bg0)':clr}${i===0?';background-image:linear-gradient(135deg,var(--bg0) 45%,var(--red) 45%,var(--red) 55%,var(--bg0) 55%)':''}" data-lci="${i}" title="${i===0?'Нет цвета':'Цвет '+(i)}"></span>`;});
  h+=`</div></div>`;
}
// Actions — not for SVG root (can't delete/move root)
if(!isR)h+=`<div class="la"><button class="btn" onclick="togV('${nid}')">${hidS.has(nid)?'Показать':'Скрыть'}</button><button class="btn" onclick="mvU()">↑</button><button class="btn" onclick="mvD()">↓</button>${tag==='g'?'<button class="btn" onclick="ungroupSel()" title="Ctrl+Shift+G">Разгруппировать</button>':''}<button class="btn" style="border-color:var(--red);color:var(--red)" onclick="delS()">✕</button></div>`;
h+='</div>';

// Position / Size
const pi=isR?null:pA(el);
if(isR){
  const vb=el.viewBox?.baseVal;
  const svbx=vb?.x||0, svby=vb?.y||0;
  const sw=vb?.width||parseFloat(el.getAttribute('width'))||0;
  const sh=vb?.height||parseFloat(el.getAttribute('height'))||0;
  h+=`<div class="prs"><div class="prst">Размер и позиция</div><div class="pig" id="pI">`;
  h+=mI('X','_svgX',svbx)+mI('Y','_svgY',svby)+mI('W','_svgW',sw)+mI('H','_svgH',sh);
  h+=`</div></div>`;
}
if(pi){h+=`<div class="prs"><div class="prst">Позиция</div>`;
h+=`<div class="align-row"><button class="abtn" onclick="alignEl('left')" title="Лево"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="4" x2="4" y2="20"/><rect x="8" y="8" width="12" height="8" rx="1"/></svg></button><button class="abtn" onclick="alignEl('cx')" title="Центр X"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="4" x2="12" y2="20"/><rect x="6" y="8" width="12" height="8" rx="1"/></svg></button><button class="abtn" onclick="alignEl('right')" title="Право"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="20" y1="4" x2="20" y2="20"/><rect x="4" y="8" width="12" height="8" rx="1"/></svg></button><div class="tsep" style="height:16px;margin:0 3px"></div><button class="abtn" onclick="alignEl('top')" title="Верх"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="4" x2="20" y2="4"/><rect x="8" y="8" width="8" height="12" rx="1"/></svg></button><button class="abtn" onclick="alignEl('cy')" title="Центр Y"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/><rect x="8" y="6" width="8" height="12" rx="1"/></svg></button><button class="abtn" onclick="alignEl('bottom')" title="Низ"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="20" x2="20" y2="20"/><rect x="8" y="4" width="8" height="12" rx="1"/></svg></button></div>`;
// Anchor grid
const anc=ANC.get(nid)||{ax:'l',ay:'t'};
const axOpts=['l','c','r'],ayOpts=['t','c','b'];
h+=`<div class="anc-wrap"><div class="anc-grid" id="ancGrid">`;
for(const ay of ayOpts)for(const ax of axOpts){
  const isAct=(ax===anc.ax&&ay===anc.ay);
  h+=`<div class="anc-dot${isAct?' act':''}" data-anc="${ax},${ay}"><span class="dp"></span></div>`;
}
h+=`</div><span class="anc-lbl">Якорь при<br>ресайзе</span></div>`;
h+=`<div class="pig" id="pI">`;if(pi._t){const t=gTr(el);h+=mI('X','tx',t.x)+mI('Y','ty',t.y);}else for(const[l,a]of Object.entries(pi))h+=mI(l.toUpperCase(),a,parseFloat(el.getAttribute(a))||0);h+=`</div></div>`;}
// Layout section (groups only)
if(tag==='g'&&!isR){
  const ly=LAY.get(nid)||{on:false,dir:'v',gap:0,pt:0,pr:0,pb:0,pl:0,align:'start',mainSizing:'fixed',crossSizing:'fixed',spacing:'packed',childSizing:{}};
  h+=`<div class="prs"><div class="prst">Layout</div>`;
  h+=`<div class="dr"><input type="checkbox" id="layOn" ${ly.on?'checked':''}><label for="layOn" style="font-weight:600">Auto Layout</label></div>`;
  h+=`<div id="layDet" style="display:${ly.on?'block':'none'};margin-top:6px">`;
  // Direction
  h+=`<div class="lay-row"><span class="prk">Dir</span><div class="lay-dirs"><button class="lay-dir${ly.dir==='h'?' act':''}" data-ld="h" title="→"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="15 8 19 12 15 16"/></svg></button><button class="lay-dir${ly.dir==='v'?' act':''}" data-ld="v" title="↓"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="8 15 12 19 16 15"/></svg></button></div></div>`;
  // Alignment
  h+=`<div class="lay-row"><span class="prk">Align</span><div class="lay-aligns"><button class="lay-al${ly.align==='start'?' act':''}" data-la="start" title="Start">╟</button><button class="lay-al${ly.align==='center'?' act':''}" data-la="center" title="Center">╫</button><button class="lay-al${ly.align==='end'?' act':''}" data-la="end" title="End">╢</button></div></div>`;
  // Container sizing
  h+=`<div class="lay-row"><span class="prk" style="min-width:36px">Main</span><div class="lay-aligns"><button class="lay-al${ly.mainSizing==='fixed'?' act':''}" data-ms="fixed" title="Fixed">Fix</button><button class="lay-al${ly.mainSizing==='hug'?' act':''}" data-ms="hug" title="Hug contents">Hug</button></div></div>`;
  h+=`<div class="lay-row"><span class="prk" style="min-width:36px">Cross</span><div class="lay-aligns"><button class="lay-al${ly.crossSizing==='fixed'?' act':''}" data-cs="fixed" title="Fixed">Fix</button><button class="lay-al${ly.crossSizing==='hug'?' act':''}" data-cs="hug" title="Hug contents">Hug</button></div></div>`;
  // Spacing mode
  h+=`<div class="lay-row"><span class="prk" style="min-width:36px">Space</span><div class="lay-aligns"><button class="lay-al${(ly.spacing||'packed')==='packed'?' act':''}" data-sp="packed" title="Packed">Pack</button><button class="lay-al${ly.spacing==='between'?' act':''}" data-sp="between" title="Space between">Btw</button></div></div>`;
  // Gap + Padding
  h+=`<div class="lay-fields">`;
  h+=`<div class="lay-f"><span class="prk">Gap</span><input class="pin" style="width:42px" type="number" id="layGap" value="${ly.gap}" min="0" step="1"></div>`;
  h+=`<div class="lay-f"><span class="prk">Pt</span><input class="pin" style="width:36px" type="number" id="layPt" value="${ly.pt}" min="0"></div>`;
  h+=`<div class="lay-f"><span class="prk">Pr</span><input class="pin" style="width:36px" type="number" id="layPr" value="${ly.pr}" min="0"></div>`;
  h+=`<div class="lay-f"><span class="prk">Pb</span><input class="pin" style="width:36px" type="number" id="layPb" value="${ly.pb}" min="0"></div>`;
  h+=`<div class="lay-f"><span class="prk">Pl</span><input class="pin" style="width:36px" type="number" id="layPl" value="${ly.pl}" min="0"></div>`;
  h+=`</div>`;
  h+=`</div></div>`;
}
// Appearance — all elements
{const gf=el.getAttribute('fill')||'',gs=el.getAttribute('stroke')||'',gw=el.getAttribute('stroke-width')||'',go=el.getAttribute('opacity')||'';
h+=`<div class="prs"><div class="prst">Оформление</div>`;
h+=pCR('fill',gf)+pCR('stroke',gs);
h+=`<div class="pcr"><span class="prk">stroke-w</span><input type="number" class="pin" style="width:50px" data-ap="stroke-width" value="${gw}" min="0" step=".5"></div>`;
h+=`<div class="pcr"><span class="prk">opacity</span><input type="number" class="pin" style="width:50px" data-ap="opacity" value="${go||'1'}" min="0" max="1" step=".05"></div>`;
if('text tspan'.includes(tag)){h+=`<div class="pcr"><span class="prk">size</span><input type="number" class="pin" style="width:50px" data-ap="font-size" value="${el.getAttribute('font-size')||''}" min="1"></div><div class="pcr"><span class="prk">font</span><input class="pin" style="width:100px" data-ap="font-family" value="${esc(el.getAttribute('font-family')||'')}"></div><div class="pcr"><span class="prk">weight</span><input class="pin" style="width:50px" data-ap="font-weight" value="${el.getAttribute('font-weight')||''}"></div>`;}
h+=`</div>`;}
if('text tspan'.includes(tag)){
  const tbbData=TBB.get(nid);
  const tfw=tbbData?tbbData.w:'';
  h+=`<div class="prs"><div class="prst">Текст</div><div class="pcr"><span class="prk">Текст</span><input class="pin" style="width:150px" id="pTx" value="${esc(el.textContent||'')}"></div><div class="pcr"><span class="prk">Ширина</span><input type="number" class="pin" style="width:60px" id="tFrameW" value="${tfw}" min="0" placeholder="auto"></div></div>`;
}
// Dynamic — available for all elements including SVG root
{const isDy=dynM.has(nid),dd=isDy?dynM.get(nid):{alias:'',props:new Set()},al=dd.alias||el.id||nid;
const ap=['fill','stroke','stroke-width','opacity'];
if(isR)ap.push('width','height');
else{if('rect image use foreignObject'.includes(tag))ap.push('x','y','width','height');if(tag==='circle')ap.push('cx','cy','r');if(tag==='ellipse')ap.push('cx','cy','rx','ry');if('text tspan'.includes(tag))ap.push('x','y','font-size','textContent');if(tag==='line')ap.push('x1','y1','x2','y2');if('g path polygon polyline'.includes(tag))ap.push('transform');}
h+=`<div class="prs"><div class="dr"><input type="checkbox" id="dT" ${isDy?'checked':''}><label for="dT" style="font-weight:600">Dynamic — API</label></div><div id="dD" style="display:${isDy?'block':'none'};margin-top:6px"><div class="dr"><span class="prk">Alias</span><input class="dal" id="dA" value="${esc(al)}"></div><div style="font-size:8px;color:var(--t3);margin:4px 0 3px;text-transform:uppercase;letter-spacing:.5px" class="mono">Параметры:</div><div class="dg">`;
ap.forEach(p=>h+=`<div class="dc"><input type="checkbox" data-dp="${p}" ${dd.props.has(p)?'checked':''}><label>${p==='textContent'?'text':p}</label></div>`);
h+=`</div></div></div>`;}
c.innerHTML=h;bindI(el);}
function pCR(a,v){const hx=c2h(v||'#000');return `<div class="pcr"><span class="prk">${a}</span><input type="color" class="pci" data-ap="${a}" value="${hx}"><input class="pin" style="width:68px" data-ap="${a}" value="${esc(v)}" placeholder="none"></div>`;}
function mI(l,a,v){return `<div class="pip"><span class="pil" data-sc="${a}">${l}</span><input class="pin" type="number" step="1" data-pa="${a}" value="${Math.round(v*100)/100}"></div>`;}
function c2h(c){if(!c||c==='none'||c==='transparent')return'#000000';if(/^#[0-9a-f]{6}$/i.test(c))return c;if(/^#[0-9a-f]{3}$/i.test(c))return'#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];if(c.startsWith('rgb')){const m=c.match(/(\d+)/g);if(m?.length>=3)return'#'+m.slice(0,3).map(n=>(+n).toString(16).padStart(2,'0')).join('');}try{const x=document.createElement('canvas').getContext('2d');x.fillStyle=c;return x.fillStyle;}catch(e){}return'#000000';}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}

// Auto-layout engine
function applyLayout(gEl){
  const nid=gEl.dataset?.nid;
  const ly=LAY.get(nid);if(!ly||!ly.on)return;
  // Collect visible layout children (skip clipPath, defs, bg rects that are first child)
  const kids=[];
  let bgRect=null;
  for(const ch of gEl.children){
    const tg=ch.tagName?.toLowerCase();
    if(tg==='clippath'||tg==='defs')continue;
    if(!bgRect&&tg==='rect'&&!ch.dataset?.nid){bgRect=ch;continue;} // first rect = bg
    if(!ch.dataset?.nid||hidS.has(ch.dataset.nid))continue;
    try{const b=ch.getBBox();kids.push({el:ch,b,nid:ch.dataset.nid});}catch(e){}
  }
  if(!kids.length)return;
  const isH=ly.dir==='h';
  const CSIZ=ly.childSizing||{};

  // Container dimensions from bg rect or group bbox
  let cW,cH,cX,cY;
  if(bgRect){
    cX=parseFloat(bgRect.getAttribute('x'))||0;
    cY=parseFloat(bgRect.getAttribute('y'))||0;
    cW=parseFloat(bgRect.getAttribute('width'))||0;
    cH=parseFloat(bgRect.getAttribute('height'))||0;
  }else{
    const gb=gEl.getBBox();cX=gb.x;cY=gb.y;cW=gb.width;cH=gb.height;
  }

  const mainPadS=isH?ly.pl:ly.pt;
  const mainPadE=isH?ly.pr:ly.pb;
  const crossPadS=isH?ly.pt:ly.pl;
  const crossPadE=isH?ly.pb:ly.pr;
  const containerMain=isH?cW:cH;
  const containerCross=isH?cH:cW;
  const crossAvail=containerCross-crossPadS-crossPadE;

  // Measure fixed vs fill
  let fixedTotal=0,fillCount=0;
  kids.forEach(k=>{
    const cs=CSIZ[k.nid]||{};
    if(cs.main==='fill')fillCount++;
    else fixedTotal+=(isH?k.b.width:k.b.height);
  });

  // Effective gap
  let effGap=ly.gap;
  if(ly.spacing==='between'&&kids.length>1){
    effGap=(containerMain-mainPadS-mainPadE-fixedTotal)/(kids.length-1);
    if(effGap<0)effGap=0;
  }
  const gapTotal=effGap*(kids.length-1);
  const fillSpace=Math.max(0,containerMain-mainPadS-mainPadE-fixedTotal-(ly.spacing==='between'?0:gapTotal));
  const fillSize=fillCount>0?fillSpace/fillCount:0;

  // Origin is container's top-left
  const oX=cX, oY=cY;
  let cursor=mainPadS;

  kids.forEach((k,i)=>{
    const el=k.el,b=k.b;
    const cs=CSIZ[k.nid]||{};
    let mSize=isH?b.width:b.height;
    let cSize=isH?b.height:b.width;

    // FILL main: resize
    if(cs.main==='fill'&&fillSize>0){
      mSize=fillSize;
      const sizeAttr=isH?'width':'height';
      if(el.hasAttribute(sizeAttr))el.setAttribute(sizeAttr,Math.round(mSize));
      const br=el.querySelector(':scope > rect');
      if(br&&br.hasAttribute(sizeAttr))br.setAttribute(sizeAttr,Math.round(mSize));
    }
    // FILL cross: stretch
    if(cs.cross==='fill'){
      cSize=crossAvail;
      const sizeAttr=isH?'height':'width';
      if(el.hasAttribute(sizeAttr))el.setAttribute(sizeAttr,Math.round(cSize));
      const br=el.querySelector(':scope > rect');
      if(br&&br.hasAttribute(sizeAttr))br.setAttribute(sizeAttr,Math.round(cSize));
    }

    // Target position (absolute, relative to container origin)
    let tMain=cursor, tCross;
    if(ly.align==='center')tCross=crossPadS+(crossAvail-cSize)/2;
    else if(ly.align==='end')tCross=crossPadS+crossAvail-cSize;
    else tCross=crossPadS;

    const targetX=isH?(oX+tMain):(oX+tCross);
    const targetY=isH?(oY+tCross):(oY+tMain);

    // Move element: figure out how to set its position
    // For <g> elements, we look at their first child (bg rect) or use getBBox
    const elTag=el.tagName?.toLowerCase();
    if(elTag==='g'){
      // Move entire group by shifting all direct children
      const curBbox=b; // current bbox of group
      const dx=targetX-curBbox.x;
      const dy=targetY-curBbox.y;
      if(Math.abs(dx)>0.5||Math.abs(dy)>0.5){
        shiftGroup(el,dx,dy);
      }
    }else if(elTag==='text'){
      // For text: get first tspan's x,y or the text's x,y
      const tsp=el.querySelector('tspan');
      if(tsp){
        const oldX=parseFloat(tsp.getAttribute('x'))||0;
        const oldY=parseFloat(tsp.getAttribute('y'))||0;
        const baselineOffset=oldY-b.y; // preserve baseline offset
        const dx=targetX-b.x;
        const dy=targetY-b.y;
        el.querySelectorAll('tspan').forEach(ts=>{
          ts.setAttribute('x',Math.round((parseFloat(ts.getAttribute('x'))||0)+dx));
        });
        tsp.setAttribute('y',Math.round(targetY+baselineOffset));
      }else{
        el.setAttribute('x',Math.round(targetX));
        el.setAttribute('y',Math.round(targetY+(parseFloat(el.getAttribute('font-size'))||14)));
      }
    }else if(elTag==='rect'){
      el.setAttribute('x',Math.round(targetX));
      el.setAttribute('y',Math.round(targetY));
    }else if(elTag==='ellipse'){
      el.setAttribute('cx',Math.round(targetX+(parseFloat(el.getAttribute('rx'))||0)));
      el.setAttribute('cy',Math.round(targetY+(parseFloat(el.getAttribute('ry'))||0)));
    }else if(elTag==='circle'){
      el.setAttribute('cx',Math.round(targetX+(parseFloat(el.getAttribute('r'))||0)));
      el.setAttribute('cy',Math.round(targetY+(parseFloat(el.getAttribute('r'))||0)));
    }else if(elTag==='line'){
      const dx=targetX-b.x,dy=targetY-b.y;
      ['x1','x2'].forEach(a=>el.setAttribute(a,Math.round((parseFloat(el.getAttribute(a))||0)+dx)));
      ['y1','y2'].forEach(a=>el.setAttribute(a,Math.round((parseFloat(el.getAttribute(a))||0)+dy)));
    }else{
      // fallback: use transform
      const ct=gTr(el);
      const dx=targetX-b.x,dy=targetY-b.y;
      sTr(el,Math.round((ct.x+dx)*10)/10,Math.round((ct.y+dy)*10)/10);
    }

    cursor+=mSize+(i<kids.length-1?effGap:0);
  });

  // HUG: resize container bg rect
  if(ly.mainSizing==='hug'&&bgRect){
    const newMain=cursor+mainPadE;
    bgRect.setAttribute(isH?'width':'height',Math.round(newMain));
  }
  if(ly.crossSizing==='hug'&&bgRect){
    let maxC=0;kids.forEach(k=>{maxC=Math.max(maxC,isH?k.b.height:k.b.width);});
    bgRect.setAttribute(isH?'height':'width',Math.round(maxC+crossPadS+crossPadE));
  }
  hl(selEl);
}

// Shift all children of a <g> by dx,dy (recursively handles position attrs)
function shiftGroup(g,dx,dy){
  for(const ch of g.children){
    const t=ch.tagName?.toLowerCase();
    if(t==='rect'||t==='image'||t==='use'||t==='foreignobject'){
      ch.setAttribute('x',Math.round(((parseFloat(ch.getAttribute('x'))||0)+dx)*10)/10);
      ch.setAttribute('y',Math.round(((parseFloat(ch.getAttribute('y'))||0)+dy)*10)/10);
    }else if(t==='circle'){
      ch.setAttribute('cx',Math.round(((parseFloat(ch.getAttribute('cx'))||0)+dx)*10)/10);
      ch.setAttribute('cy',Math.round(((parseFloat(ch.getAttribute('cy'))||0)+dy)*10)/10);
    }else if(t==='ellipse'){
      ch.setAttribute('cx',Math.round(((parseFloat(ch.getAttribute('cx'))||0)+dx)*10)/10);
      ch.setAttribute('cy',Math.round(((parseFloat(ch.getAttribute('cy'))||0)+dy)*10)/10);
    }else if(t==='line'){
      ['x1','x2'].forEach(a=>ch.setAttribute(a,Math.round(((parseFloat(ch.getAttribute(a))||0)+dx)*10)/10));
      ['y1','y2'].forEach(a=>ch.setAttribute(a,Math.round(((parseFloat(ch.getAttribute(a))||0)+dy)*10)/10));
    }else if(t==='text'){
      ch.querySelectorAll('tspan').forEach(ts=>{
        if(ts.hasAttribute('x'))ts.setAttribute('x',Math.round(((parseFloat(ts.getAttribute('x'))||0)+dx)*10)/10);
        if(ts.hasAttribute('y'))ts.setAttribute('y',Math.round(((parseFloat(ts.getAttribute('y'))||0)+dy)*10)/10);
      });
      if(ch.hasAttribute('x'))ch.setAttribute('x',Math.round(((parseFloat(ch.getAttribute('x'))||0)+dx)*10)/10);
      if(ch.hasAttribute('y'))ch.setAttribute('y',Math.round(((parseFloat(ch.getAttribute('y'))||0)+dy)*10)/10);
    }else if(t==='g'){
      shiftGroup(ch,dx,dy);
    }else if(t==='path'){
      // paths use transform
      const ct=gTr(ch);sTr(ch,Math.round((ct.x+dx)*10)/10,Math.round((ct.y+dy)*10)/10);
    }else if(t==='clippath'||t==='defs'||t==='mask'){}
    else{
      const ct=gTr(ch);sTr(ch,Math.round((ct.x+dx)*10)/10,Math.round((ct.y+dy)*10)/10);
    }
  }
}

// Cascade relayout: from changed element up through all layout ancestors
function relayoutFrom(el){
  if(!el||!svg)return;
  // Find parent layout container
  let p=el.parentElement;
  while(p&&p!==svg){
    if(p.dataset?.nid&&LAY.has(p.dataset.nid)){
      const ly=LAY.get(p.dataset.nid);
      if(ly&&ly.on){
        shiftSiblingsAfter(el,p,ly);
        return;
      }
    }
    p=p.parentElement;
  }
}

// Shift only siblings AFTER the changed element, by the height difference
function shiftSiblingsAfter(changedEl,layoutG,ly){
  const isH=ly.dir==='h';
  // Snapshot: record bbox of changed element BEFORE and AFTER
  // We stored old bbox on focus, compare with current
  const oldH=changedEl._oldBBox;
  let curB;
  try{curB=changedEl.getBBox();}catch(e){return;}
  if(!oldH)return;
  const delta=isH?(curB.width-oldH.width):(curB.height-oldH.height);
  if(Math.abs(delta)<1)return; // no meaningful change
  
  // Find all layout children after this element
  let found=false;
  const siblings=[];
  for(const ch of layoutG.children){
    const tg=ch.tagName?.toLowerCase();
    if(tg==='clippath'||tg==='defs')continue;
    if(!ch.dataset?.nid)continue; // skip bg rect
    if(ch===changedEl||ch.contains(changedEl)){found=true;continue;}
    if(found)siblings.push(ch);
  }
  // Also check inside clip-path groups
  if(!found){
    layoutG.querySelectorAll('g[clip-path] > *').forEach(ch=>{
      if(!ch.dataset?.nid)return;
      if(ch===changedEl||ch.contains(changedEl)){found=true;return;}
      if(found)siblings.push(ch);
    });
  }
  
  const dx=isH?delta:0;
  const dy=isH?0:delta;
  siblings.forEach(sib=>{
    const ct=gTr(sib);
    sTr(sib,Math.round((ct.x+dx)*10)/10,Math.round((ct.y+dy)*10)/10);
  });
  // Resize SVG canvas to fit new content
  growCanvas(dx,dy);
  hl(selEl);
}

// Grow SVG viewBox and dimensions to accommodate content shift
function growCanvas(dw,dh){
  if(!svg)return;
  if(dw){
    const oldW=parseFloat(svg.getAttribute('width'))||0;
    const vb=svg.viewBox.baseVal;
    svg.setAttribute('width',Math.round(oldW+dw));
    if(vb&&vb.width)svg.viewBox.baseVal.width=Math.round(vb.width+dw);
  }
  if(dh){
    const oldH=parseFloat(svg.getAttribute('height'))||0;
    const vb=svg.viewBox.baseVal;
    svg.setAttribute('height',Math.round(oldH+dh));
    if(vb&&vb.height)svg.viewBox.baseVal.height=Math.round(vb.height+dh);
  }
  // Also resize root bg rect if exists
  const bgRect=svg.querySelector(':scope > rect');
  if(bgRect){
    if(dw){const rw=parseFloat(bgRect.getAttribute('width'))||0;bgRect.setAttribute('width',Math.round(rw+dw));}
    if(dh){const rh=parseFloat(bgRect.getAttribute('height'))||0;bgRect.setAttribute('height',Math.round(rh+dh));}
  }
}

function bindI(el){if(!el)return;const nid=el.dataset.nid;
const tag=el.tagName.toLowerCase(),isR=tag==='svg';

// Group name
const gn=$('gName');
if(gn)gn.addEventListener('input',()=>{const v=gn.value.trim();if(v)GN.set(nid,v);else GN.delete(nid);bT();const r=document.querySelector(`.tn[data-nid="${nid}"]`);if(r)r.classList.add('sel');});

// SVG root viewBox X/Y/W/H
if(isR){
  const pw=$('pI');
  if(pw)pw.querySelectorAll('.pin').forEach(i=>{i.addEventListener('focus',()=>hPush(),{once:true});i.addEventListener('input',()=>{
    const a=i.dataset.pa,v=+i.value||0,vb=el.viewBox?.baseVal;
    if(a==='_svgW'){el.setAttribute('width',v);if(vb)vb.width=v;}
    else if(a==='_svgH'){el.setAttribute('height',v);if(vb)vb.height=v;}
    else if(a==='_svgX'){if(vb)vb.x=v;}
    else if(a==='_svgY'){if(vb)vb.y=v;}
    hl(el);
  });});
}

// Anchor grid clicks
const ag=$('ancGrid');
if(ag)ag.querySelectorAll('.anc-dot').forEach(d=>d.addEventListener('click',()=>{
  const[ax,ay]=d.dataset.anc.split(',');ANC.set(nid,{ax,ay});
  ag.querySelectorAll('.anc-dot').forEach(dd=>dd.classList.remove('act'));d.classList.add('act');
}));

// Position/size inputs with anchor-aware resize
const pw=$('pI');if(pw){const pi=pA(el),tf=pi&&pi._t;
const sizeAttrs=new Set(['width','height','r','rx','ry','w','h']);
pw.querySelectorAll('.pin').forEach(i=>{i.addEventListener('focus',()=>hPush(),{once:true});i.addEventListener('input',()=>{
  const a=i.dataset.pa,v=+i.value||0;
  if(tf){const t=gTr(el);a==='tx'?sTr(el,v,t.y):sTr(el,t.x,v);}
  else{
    // Check if this is a size attr that needs anchor compensation
    const anc=ANC.get(nid)||{ax:'l',ay:'t'};
    const realA=a.toLowerCase();
    if(realA==='width'||realA==='w'){
      const oldW=parseFloat(el.getAttribute('width'))||0;
      const dw=v-oldW;
      el.setAttribute('width',v);
      if(anc.ax==='c'){el.setAttribute('x',(parseFloat(el.getAttribute('x'))||0)-dw/2);}
      else if(anc.ax==='r'){el.setAttribute('x',(parseFloat(el.getAttribute('x'))||0)-dw);}
      // Refresh x input
      const xi=pw.querySelector('[data-pa="x"]');if(xi)xi.value=Math.round((parseFloat(el.getAttribute('x'))||0)*10)/10;
    }else if(realA==='height'||realA==='h'){
      const oldH=parseFloat(el.getAttribute('height'))||0;
      const dh=v-oldH;
      el.setAttribute('height',v);
      if(anc.ay==='c'){el.setAttribute('y',(parseFloat(el.getAttribute('y'))||0)-dh/2);}
      else if(anc.ay==='b'){el.setAttribute('y',(parseFloat(el.getAttribute('y'))||0)-dh);}
      const yi=pw.querySelector('[data-pa="y"]');if(yi)yi.value=Math.round((parseFloat(el.getAttribute('y'))||0)*10)/10;
    }else if(realA==='r'){
      const oldR=parseFloat(el.getAttribute('r'))||0;
      const dr=v-oldR;
      el.setAttribute('r',v);
      // Circle: anchor compensate cx/cy
      if(anc.ax==='l'){el.setAttribute('cx',(parseFloat(el.getAttribute('cx'))||0)+dr);}
      else if(anc.ax==='r'){el.setAttribute('cx',(parseFloat(el.getAttribute('cx'))||0)-dr);}
      if(anc.ay==='t'){el.setAttribute('cy',(parseFloat(el.getAttribute('cy'))||0)+dr);}
      else if(anc.ay==='b'){el.setAttribute('cy',(parseFloat(el.getAttribute('cy'))||0)-dr);}
      const cxi=pw.querySelector('[data-pa="cx"]');if(cxi)cxi.value=Math.round((parseFloat(el.getAttribute('cx'))||0)*10)/10;
      const cyi=pw.querySelector('[data-pa="cy"]');if(cyi)cyi.value=Math.round((parseFloat(el.getAttribute('cy'))||0)*10)/10;
    }else if(realA==='rx'){
      const oldRx=parseFloat(el.getAttribute('rx'))||0;
      const drx=v-oldRx;
      el.setAttribute('rx',v);
      if(anc.ax==='l'){el.setAttribute('cx',(parseFloat(el.getAttribute('cx'))||0)+drx);}
      else if(anc.ax==='r'){el.setAttribute('cx',(parseFloat(el.getAttribute('cx'))||0)-drx);}
      const cxi=pw.querySelector('[data-pa="cx"]');if(cxi)cxi.value=Math.round((parseFloat(el.getAttribute('cx'))||0)*10)/10;
    }else if(realA==='ry'){
      const oldRy=parseFloat(el.getAttribute('ry'))||0;
      const dry=v-oldRy;
      el.setAttribute('ry',v);
      if(anc.ay==='t'){el.setAttribute('cy',(parseFloat(el.getAttribute('cy'))||0)+dry);}
      else if(anc.ay==='b'){el.setAttribute('cy',(parseFloat(el.getAttribute('cy'))||0)-dry);}
      const cyi=pw.querySelector('[data-pa="cy"]');if(cyi)cyi.value=Math.round((parseFloat(el.getAttribute('cy'))||0)*10)/10;
    }else{
      el.setAttribute(a,v);
    }
  }
  hl(el);
});});
pw.querySelectorAll('.pil').forEach(lb=>lb.addEventListener('mousedown',e=>{e.preventDefault();hPush();const a=lb.dataset.sc,inp=pw.querySelector(`[data-pa="${a}"]`);let sx=e.clientX,sv=+inp.value||0;const mv=e2=>{inp.value=Math.round((sv+e2.clientX-sx)*100)/100;inp.dispatchEvent(new Event('input'));},up=()=>{removeEventListener('mousemove',mv);removeEventListener('mouseup',up);document.body.style.cursor='';};addEventListener('mousemove',mv);addEventListener('mouseup',up);document.body.style.cursor='ew-resize';}));}
document.querySelectorAll('[data-ap]').forEach(i=>{i.addEventListener('focus',()=>hPush(),{once:true});const h=()=>{const a=i.dataset.ap,v=i.value;el.setAttribute(a,v);hl(el);const r=i.closest('.pcr');if(!r)return;if(i.type==='color'){const t=r.querySelector('.pin[data-ap="'+a+'"]');if(t)t.value=v;}else{const c=r.querySelector('.pci[data-ap="'+a+'"]');if(c&&v&&v!=='none')try{c.value=c2h(v);}catch(e){}}};i.addEventListener('input',h);i.addEventListener('change',h);});
const tx=$('pTx');if(tx){tx.addEventListener('focus',()=>{
  hPush();
  // Save current bbox for relayout delta calculation
  try{el._oldBBox=el.getBBox();}catch(e){}
},{once:true});tx.addEventListener('input',()=>{
  const tspans=el.querySelectorAll('tspan');
  const newText=tx.value;
  if(tspans.length>0){
    const firstX=parseFloat(tspans[0].getAttribute('x'))||0;
    const tbb=TBB.get(nid);
    let wrapW=tbb?tbb.w:0;
    if(!wrapW){
      let pg=el.parentElement;
      for(let i=0;i<3&&pg;i++){
        const bgR=pg.querySelector(':scope > rect[width]');
        if(bgR){const rw=parseFloat(bgR.getAttribute('width'))||0;if(rw>0){wrapW=rw;break;}}
        pg=pg.parentElement;
      }
    }
    const fs=parseFloat(el.getAttribute('font-size'))||14;
    const firstY=parseFloat(tspans[0].getAttribute('y'))||fs;
    let lh=fs*1.3;
    if(tspans.length>1){
      const dy=parseFloat(tspans[1].getAttribute('dy'));
      if(dy>0)lh=dy;
      else{
        const y0=parseFloat(tspans[0].getAttribute('y'))||0;
        const y1=parseFloat(tspans[1].getAttribute('y'))||0;
        if(y1>y0)lh=y1-y0;
      }
    }
    // Use SVG text measurement — put all text in first tspan, measure with getComputedTextLength
    const NS='http://www.w3.org/2000/svg';
    function svgMeasure(str){
      tspans[0].textContent=str;
      return tspans[0].getComputedTextLength();
    }
    // Word-wrap using real SVG measurement
    const lines=[];
    if(wrapW>0){
      const words=newText.split(/(\s+)/);
      let line='';
      for(const w of words){
        const test=line+w;
        if(svgMeasure(test)>wrapW&&line.trim()){
          lines.push(line.trimEnd());line=w.trimStart();
        }else{line=test;}
      }
      if(line)lines.push(line.trimEnd());
    }else{lines.push(newText);}
    // Remove excess tspans
    while(el.querySelectorAll('tspan').length>lines.length&&el.querySelectorAll('tspan').length>1){
      el.removeChild(el.querySelectorAll('tspan')[el.querySelectorAll('tspan').length-1]);
    }
    // Update/create tspans
    const curTs=el.querySelectorAll('tspan');
    lines.forEach((ln,i)=>{
      if(i<curTs.length){
        curTs[i].textContent=ln;
      }else{
        const ts=document.createElementNS(NS,'tspan');
        ts.setAttribute('x',firstX);
        ts.setAttribute('dy',lh);
        ts.textContent=ln;
        el.appendChild(ts);
      }
    });
    // Update text frame visual
    updateTextFrame(el,nid);
  }else{
    el.textContent=newText;
  }
  hl(el);
});
tx.addEventListener('blur',()=>{relayoutFrom(el);});
}
// Text frame width binding
const tFW=$('tFrameW');if(tFW)tFW.addEventListener('input',()=>{
  if(!el._oldBBox)try{el._oldBBox=el.getBBox();}catch(e){}
  const w=+tFW.value||0;
  if(w>0){TBB.set(nid,{...(TBB.get(nid)||{}),w});}else{TBB.delete(nid);}
  // Re-trigger text wrap
  const txI=$('pTx');if(txI)txI.dispatchEvent(new Event('input'));
  // Relayout parent since text size changed
  setTimeout(()=>relayoutFrom(el),50);
});
const dt=$('dT'),dd=$('dD');if(dt)dt.addEventListener('change',()=>{if(dt.checked){if(!dynM.has(nid))dynM.set(nid,{alias:el.id||nid,props:new Set(['fill','opacity'])});if(dd)dd.style.display='block';}else{dynM.delete(nid);if(dd)dd.style.display='none';}uDB();bT();const r=document.querySelector(`.tn[data-nid="${nid}"]`);if(r)r.classList.add('sel');});
const da=$('dA');if(da)da.addEventListener('input',()=>{const d=dynM.get(nid);if(d)d.alias=da.value.trim().replace(/\s+/g,'_')||nid;});
document.querySelectorAll('[data-dp]').forEach(cb=>cb.addEventListener('change',()=>{const d=dynM.get(nid);if(!d)return;cb.checked?d.props.add(cb.dataset.dp):d.props.delete(cb.dataset.dp);}));
// Layer color swatches in properties
const lcR=$('lcRow');if(lcR)lcR.querySelectorAll('[data-lci]').forEach(sw=>sw.addEventListener('click',()=>{const i=+sw.dataset.lci;if(i===0)LC.delete(nid);else LC.set(nid,i);lcR.querySelectorAll('.lc-sw').forEach(s=>s.classList.remove('act'));sw.classList.add('act');bT();const r=document.querySelector(`.tn[data-nid="${nid}"]`);if(r)r.classList.add('sel');}));

// Layout bindings
const layOn=$('layOn'),layDet=$('layDet');
if(layOn){
  function getLay(){return LAY.get(nid)||{on:false,dir:'v',gap:0,pt:0,pr:0,pb:0,pl:0,align:'start',mainSizing:'fixed',crossSizing:'fixed',spacing:'packed',childSizing:{}};}
  function setLay(upd){const ly={...getLay(),...upd};LAY.set(nid,ly);if(ly.on){applyLayout(el);relayoutFrom(el);}}
  layOn.addEventListener('change',()=>{
    if(layOn.checked){if(!LAY.has(nid))LAY.set(nid,{on:true,dir:'v',gap:8,pt:0,pr:0,pb:0,pl:0,align:'start',mainSizing:'fixed',crossSizing:'fixed',spacing:'packed',childSizing:{}});else{const l=getLay();l.on=true;LAY.set(nid,l);}if(layDet)layDet.style.display='block';applyLayout(el);}
    else{const l=getLay();l.on=false;LAY.set(nid,l);if(layDet)layDet.style.display='none';}
    hl(el);
  });
  document.querySelectorAll('[data-ld]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-ld]').forEach(bb=>bb.classList.remove('act'));b.classList.add('act');
    setLay({dir:b.dataset.ld});
  }));
  document.querySelectorAll('[data-la]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-la]').forEach(bb=>bb.classList.remove('act'));b.classList.add('act');
    setLay({align:b.dataset.la});
  }));
  // Main/Cross sizing
  document.querySelectorAll('[data-ms]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-ms]').forEach(bb=>bb.classList.remove('act'));b.classList.add('act');
    setLay({mainSizing:b.dataset.ms});
  }));
  document.querySelectorAll('[data-cs]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-cs]').forEach(bb=>bb.classList.remove('act'));b.classList.add('act');
    setLay({crossSizing:b.dataset.cs});
  }));
  // Spacing mode
  document.querySelectorAll('[data-sp]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-sp]').forEach(bb=>bb.classList.remove('act'));b.classList.add('act');
    setLay({spacing:b.dataset.sp});
  }));
  ['Gap','Pt','Pr','Pb','Pl'].forEach(f=>{
    const inp=$('lay'+f);
    if(inp)inp.addEventListener('input',()=>{const key=f.toLowerCase();setLay({[key]:+inp.value||0});});
  });
}
}

// ZOOM & PAN & DRAG
function upTf(){$('sC').style.transform=`translate(${px}px,${py}px) scale(${zm})`;$('zL').textContent=Math.round(zm*100)+'%';if(selEl)hl(selEl);}
function zoomBy(d){zm=Math.max(.05,Math.min(10,zm+d));upTf();}
function fitV(){if(!svg)return;const r=vp.getBoundingClientRect(),vb=svg.viewBox.baseVal;let w,h;if(vb?.width&&vb?.height){w=vb.width;h=vb.height;}else{w=+svg.getAttribute('width')||300;h=+svg.getAttribute('height')||150;}zm=Math.min((r.width-80)/w,(r.height-80)/h,3);px=(r.width-w*zm)/2;py=(r.height-h*zm)/2;upTf();}
function s2s(cx,cy){const r=vp.getBoundingClientRect();return{x:(cx-r.left-px)/zm,y:(cy-r.top-py)/zm};}
$('vpBg').addEventListener('input',e=>{vp.style.backgroundImage='none';vp.style.background=e.target.value;$('vpBgV').style.backgroundImage='none';$('vpBgV').style.background=e.target.value;});
function resetVpBg(){vp.style.background='';vp.style.backgroundImage='';$('vpBgV').style.background='#0d0f12';$('vpBgV').style.backgroundImage='linear-gradient(45deg,#888 25%,transparent 25%),linear-gradient(-45deg,#888 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#888 75%),linear-gradient(-45deg,transparent 75%,#888 75%)';$('vpBgV').style.backgroundSize='8px 8px';$('vpBgV').style.backgroundPosition='0 0,0 4px,4px -4px,-4px 0';}

vp.addEventListener('wheel',e=>{e.preventDefault();const d=e.deltaY>0?-.08:.08,r=vp.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,oz=zm;zm=Math.max(.05,Math.min(10,zm+d*zm));px=mx-(mx-px)*(zm/oz);py=my-(my-py)*(zm/oz);upTf();},{passive:false});
vp.addEventListener('mousedown',e=>{
  if(tool!=='select'&&e.button===0&&!e.altKey)return;
  if(e.button===1||e.button===2||(e.button===0&&e.altKey)){isPan=true;lm={x:e.clientX,y:e.clientY};e.preventDefault();return;}
  if(e.button!==0||tool!=='select')return;
  const hit=e.target.closest('[data-nid]');
  if(hit&&hit!==svg){hPush();isDrEl=true;dES={x:e.clientX,y:e.clientY};e.preventDefault();const pi=pA(hit);
    if(pi&&pi._t){const t=gTr(hit);dEO={m:'tf',x:t.x,y:t.y,el:hit};}
    else if(pi&&pi.x1)dEO={m:'ln',x1:+hit.getAttribute('x1')||0,y1:+hit.getAttribute('y1')||0,x2:+hit.getAttribute('x2')||0,y2:+hit.getAttribute('y2')||0,el:hit};
    else if(pi){const xa=pi.x||pi.cx||'x',ya=pi.y||pi.cy||'y';dEO={m:'at',xa,ya,x:+hit.getAttribute(xa)||0,y:+hit.getAttribute(ya)||0,el:hit};}
    else{const t=gTr(hit);dEO={m:'tf',x:t.x,y:t.y,el:hit};}return;}
  if(e.target===vp||e.target.id==='sC'){isPan=true;lm={x:e.clientX,y:e.clientY};e.preventDefault();}
});
vp.addEventListener('mousemove',e=>{
  if(isDrEl&&dEO){vp.classList.add('eldrag');const dx=(e.clientX-dES.x)/zm,dy=(e.clientY-dES.y)/zm,el=dEO.el,rn=v=>Math.round(v*10)/10;
    if(dEO.m==='tf')sTr(el,rn(dEO.x+dx),rn(dEO.y+dy));else if(dEO.m==='ln'){el.setAttribute('x1',rn(dEO.x1+dx));el.setAttribute('y1',rn(dEO.y1+dy));el.setAttribute('x2',rn(dEO.x2+dx));el.setAttribute('y2',rn(dEO.y2+dy));}else{el.setAttribute(dEO.xa,rn(dEO.x+dx));el.setAttribute(dEO.ya,rn(dEO.y+dy));}hl(el);return;}
  if(isPan){px+=e.clientX-lm.x;py+=e.clientY-lm.y;lm={x:e.clientX,y:e.clientY};upTf();}
});
addEventListener('mouseup',e=>{if(isDrEl&&dEO&&(Math.abs(e.clientX-dES.x)>2||Math.abs(e.clientY-dES.y)>2)&&selEl)sP(selEl);isPan=false;isDrEl=false;dEO=null;vp.classList.remove('eldrag');});
vp.addEventListener('contextmenu',e=>e.preventDefault());

// DRAWING
function setTool(t){tool=t;document.querySelectorAll('.bt').forEach(b=>b.classList.toggle('act',b.dataset.tool===t));vp.classList.remove('t-rect','t-circle','t-text');if(t!=='select')vp.classList.add('t-'+t);}
document.addEventListener('keydown',e=>{if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'){if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey){e.preventDefault();hUndo();}if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&e.shiftKey){e.preventDefault();hRedo();}return;}if(e.key==='v'||e.key==='Escape'){setTool('select');selSet.clear();if(selEl)selN(selEl.dataset.nid);}if(e.key==='r'&&!e.ctrlKey)setTool('rect');if(e.key==='c'&&!e.ctrlKey)setTool('circle');if(e.key==='t'&&!e.ctrlKey)setTool('text');if((e.key==='Delete'||e.key==='Backspace')&&selEl&&selEl!==svg&&e.target===document.body){e.preventDefault();delS();}if(e.key==='g'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey){e.preventDefault();groupSel();}if(e.key==='g'&&(e.ctrlKey||e.metaKey)&&e.shiftKey){e.preventDefault();ungroupSel();}if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey){e.preventDefault();hUndo();}if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&e.shiftKey){e.preventDefault();hRedo();}});
function gC(){return{fi:$('tNF').checked?'none':$('tFi').value,st:$('tNS').checked?'none':$('tSt').value,sw:+$('tSW').value||0};}
$('tFi').addEventListener('input',e=>$('tFiV').style.background=e.target.value);
$('tSt').addEventListener('input',e=>$('tStV').style.background=e.target.value);

vp.addEventListener('mousedown',function(e){if(tool==='select'||e.button!==0||e.altKey||!svg)return;const pt=s2s(e.clientX,e.clientY);e.preventDefault();e.stopPropagation();isPan=false;
if(tool==='text'){const txt=prompt('Текст:','Text');if(!txt)return;hPush();const cl=gC(),el=document.createElementNS('http://www.w3.org/2000/svg','text');el.setAttribute('x',Math.round(pt.x));el.setAttribute('y',Math.round(pt.y));el.setAttribute('font-size','20');el.setAttribute('font-family','sans-serif');el.setAttribute('fill',cl.fi);if(cl.st!=='none'){el.setAttribute('stroke',cl.st);el.setAttribute('stroke-width',cl.sw);}el.textContent=txt;svg.appendChild(el);finN(el);setTool('select');return;}
hPush();isDraw=true;dSt=pt;const cl=gC();
if(tool==='rect'){dEl=document.createElementNS('http://www.w3.org/2000/svg','rect');dEl.setAttribute('x',Math.round(pt.x));dEl.setAttribute('y',Math.round(pt.y));dEl.setAttribute('width',0);dEl.setAttribute('height',0);}
else{dEl=document.createElementNS('http://www.w3.org/2000/svg','ellipse');dEl.setAttribute('cx',Math.round(pt.x));dEl.setAttribute('cy',Math.round(pt.y));dEl.setAttribute('rx',0);dEl.setAttribute('ry',0);}
dEl.setAttribute('fill',cl.fi);if(cl.st!=='none'){dEl.setAttribute('stroke',cl.st);dEl.setAttribute('stroke-width',cl.sw);}dEl.style.pointerEvents='none';svg.appendChild(dEl);},true);

vp.addEventListener('mousemove',function(e){if(!isDraw||!dSt||!dEl)return;const pt=s2s(e.clientX,e.clientY),x=Math.min(dSt.x,pt.x),y=Math.min(dSt.y,pt.y),w=Math.abs(pt.x-dSt.x),h=Math.abs(pt.y-dSt.y);
if(tool==='rect'){dEl.setAttribute('x',Math.round(x));dEl.setAttribute('y',Math.round(y));dEl.setAttribute('width',Math.round(w));dEl.setAttribute('height',Math.round(h));}
else{dEl.setAttribute('cx',Math.round(x+w/2));dEl.setAttribute('cy',Math.round(y+h/2));dEl.setAttribute('rx',Math.round(w/2));dEl.setAttribute('ry',Math.round(h/2));}});

vp.addEventListener('mouseup',function(e){if(!isDraw||!dSt||!dEl)return;isDraw=false;const pt=s2s(e.clientX,e.clientY),w=Math.abs(pt.x-dSt.x),h=Math.abs(pt.y-dSt.y);dSt=null;
if(w<3&&h<3){dEl.remove();dEl=null;return;}
if(tool==='circle'&&Math.abs(w-h)<8){const cx=dEl.getAttribute('cx'),cy=dEl.getAttribute('cy'),r=Math.round(Math.max(w,h)/2),c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',cx);c.setAttribute('cy',cy);c.setAttribute('r',r);for(const a of['fill','stroke','stroke-width'])if(dEl.getAttribute(a))c.setAttribute(a,dEl.getAttribute(a));dEl.replaceWith(c);dEl=c;}
dEl.style.pointerEvents='';finN(dEl);dEl=null;setTool('select');});

function finN(el){tagA(el);el.addEventListener('click',e=>{e.stopPropagation();let t=el;while(t&&!t.dataset.nid)t=t.parentElement;if(t?.dataset.nid)selN(t.dataset.nid,e);});el.style.cursor='pointer';bT();selN(el.dataset.nid);}

// DYNAMIC/API
function uDB(){$('dBdg').textContent=dynM.size;}
function bJ(){const o={};dynM.forEach((d,nid)=>{const el=nM.get(nid);if(!el)return;const a=d.alias||nid;d.props.forEach(p=>{if(p==='textContent')o[a+'.text']=el.textContent||'';else if(p==='transform'){const t=gTr(el);o[a+'.translateX']=t.x;o[a+'.translateY']=t.y;}else{const r=el.getAttribute(p)||'';o[a+'.'+p]='x y cx cy r rx ry width height x1 y1 x2 y2 stroke-width opacity font-size font-weight'.split(' ').includes(p)?(parseFloat(r)||0):r;}});});return o;}
function rJ(){const j=bJ(),o=$('jO');o.textContent=Object.keys(j).length?JSON.stringify(j,null,2):'{ /* Нет dynamic объектов */ }';}
function rDL(){const c=$('dL');if(!dynM.size){c.innerHTML='<span style="color:var(--t3);font-size:11px">Нет</span>';return;}c.innerHTML='';dynM.forEach((d,nid)=>{const el=nM.get(nid);if(!el)return;const cd=document.createElement('div');cd.className='doc';cd.onclick=()=>{closeM('aM');selN(nid);};cd.innerHTML=`<div><div class="don">${esc(d.alias||nid)}</div><div class="dot2">&lt;${el.tagName.toLowerCase()}&gt;${el.id?' #'+el.id:''}</div></div><div class="dop">${[...d.props].map(p=>p==='textContent'?'text':p).join(', ')}</div>`;c.appendChild(cd);});}
function cpJ(){const t=JSON.stringify(bJ(),null,2),el=document.createElement('textarea');el.value=t;el.style.cssText='position:fixed;left:-9999px';document.body.appendChild(el);el.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(el);try{navigator.clipboard.writeText(t).catch(()=>{});}catch(e){}const b=$('cpB');if(b){b.textContent='✓ OK';b.style.color='var(--grn)';setTimeout(()=>{b.textContent='Копировать';b.style.color='';},1200);}}

// FONTS
function detFonts(){detF.clear();if(!svg)return;const G=new Set('serif sans-serif monospace cursive fantasy system-ui'.split(' '));const add=s=>s.split(',').map(f=>f.trim().replace(/^['"]|['"]$/g,'')).filter(f=>f&&!G.has(f.toLowerCase())).forEach(f=>detF.add(f));svg.querySelectorAll('[font-family]').forEach(e=>add(e.getAttribute('font-family')));svg.querySelectorAll('[style]').forEach(e=>{const m=e.getAttribute('style').match(/font-family\s*:\s*([^;]+)/i);if(m)add(m[1]);});svg.querySelectorAll('style').forEach(e=>{for(const m of e.textContent.matchAll(/font-family\s*:\s*([^;}"]+)/gi))add(m[1]);});$('fBdg').textContent=ldF.length;}
function isFL(f){if(ldF.some(l=>l.f.toLowerCase()===f.toLowerCase()))return true;try{return document.fonts.check(`16px "${f}"`);}catch(e){return false;}}
function uDU(){const c=$('dF');if(!detF.size){c.innerHTML=`<span style="color:var(--t3);font-size:11px">${svg?'Нет':'Загрузите SVG'}</span>`;return;}c.innerHTML='';detF.forEach(f=>{const ok=isFL(f),ch=document.createElement('span');ch.className='fc';ch.innerHTML=`<span class="dot ${ok?'ok':'no'}"></span>${esc(f)}`;if(!ok){const b=document.createElement('button');b.className='btn';b.style.cssText='padding:1px 6px;font-size:8px;margin-left:3px';b.textContent='Найти';b.onclick=()=>{$('gfS').value=f;searchGF(f);};ch.appendChild(b);}c.appendChild(ch);});}
function uLU(){const c=$('lF');if(!ldF.length){c.innerHTML='<span style="color:var(--t3);font-size:11px">Нет</span>';return;}c.innerHTML='';ldF.forEach((f,i)=>{const it=document.createElement('div');it.className='li';it.innerHTML=`<div class="lii"><div class="lin">${esc(f.f)}</div><div class="lis">${f.s==='g'?'Google':'📁 '+esc(f.n||'Файл')}</div><div class="lip" style="font-family:'${f.f}',sans-serif">AaBb Привет</div></div><button class="btn" style="padding:3px 6px;font-size:9px;border-color:var(--red);color:var(--red)" onclick="rmF(${i})">✕</button>`;c.appendChild(it);});}
function rmF(i){ldF.splice(i,1);uLU();uDU();$('fBdg').textContent=ldF.length;}
let gfTo=null;async function fGF(){if(gfL)return gfL;try{const r=await fetch('https://fonts.google.com/metadata/fonts'),t=await r.text();gfL=(JSON.parse(t.replace(/^\)]\}'?\n?/,''))).familyMetadataList||[];return gfL;}catch(e){return null;}}
function searchGF(q){clearTimeout(gfTo);const r=$('gfR');if(!q.trim()){r.innerHTML='';return;}gfTo=setTimeout(async()=>{r.innerHTML='<div style="padding:8px;color:var(--t3);font-size:11px">…</div>';const l=await fGF(),ql=q.toLowerCase().trim();r.innerHTML='';if(l){const m=l.filter(f=>f.family.toLowerCase().includes(ql)).slice(0,10);if(!m.length){r.innerHTML='<div style="padding:6px;color:var(--t3);font-size:10px">Не найдено</div>';return;}m.forEach(f=>r.appendChild(mkGF(f.family)));}else r.appendChild(mkGF(q.trim()));},200);}
function mkGF(fam){const it=document.createElement('div');it.className='gfit';const l=document.createElement('div');l.className='gfil';const n=document.createElement('span');n.className='gfin';n.textContent=fam;const p=document.createElement('span');p.className='gfip';p.style.fontFamily=`"${fam}",sans-serif`;p.textContent='AaBb Привет';l.append(n,p);const al=ldF.some(f=>f.f.toLowerCase()===fam.toLowerCase());const b=document.createElement('button');b.className='btn'+(al?'':' btn-p');b.style.cssText='padding:3px 10px;font-size:9px';b.textContent=al?'✓':'Load';b.disabled=al;if(!al)b.onclick=async()=>{b.textContent='…';b.disabled=true;const ok=await lGF(fam);b.textContent=ok?'✓':'✕';if(ok){uLU();uDU();$('fBdg').textContent=ldF.length;rfS();}};it.append(l,b);return it;}
async function lGF(fam){try{const lk=document.createElement('link');lk.rel='stylesheet';lk.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(fam)}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap`;document.head.appendChild(lk);await new Promise(r=>{lk.onload=r;lk.onerror=r;setTimeout(r,3500)});try{await document.fonts.load(`16px "${fam}"`);}catch(e){}ldF.push({f:fam,s:'g',n:null});return true;}catch(e){return false;}}
function hFDrop(e){e.preventDefault();e.stopPropagation();e.currentTarget.classList.remove('dragover');hFF(e.dataTransfer.files);}
async function hFF(files){for(const f of files){const ext=f.name.split('.').pop().toLowerCase();if(!'woff2 woff ttf otf'.includes(ext))continue;let fn=f.name.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ').replace(/\b(Regular|Bold|Italic|Light|Medium|SemiBold|ExtraBold|Thin|Black|Heavy|Condensed|Expanded)\b/gi,'').replace(/\s+/g,' ').trim();for(const d of detF){if(d.toLowerCase().replace(/\s/g,'').includes(fn.toLowerCase().replace(/\s/g,''))||fn.toLowerCase().replace(/\s/g,'').includes(d.toLowerCase().replace(/\s/g,''))){fn=d;break;}}const cn=await pFN(fn,f.name);if(!cn)continue;try{const buf=await f.arrayBuffer();let face;try{face=new FontFace(cn,buf,{style:'normal',weight:'1 999'});}catch(e){face=new FontFace(cn,buf);}await face.load();document.fonts.add(face);ldF.push({f:cn,s:'l',n:f.name});uLU();uDU();$('fBdg').textContent=ldF.length;rfS();}catch(e){alert('Ошибка: '+e.message);}}}
function pFN(def,fn){return new Promise(res=>{const c=$('fnP');c.innerHTML=`<div class="fnd"><span style="font-size:10px;color:var(--t2);white-space:nowrap">📁 ${esc(fn)} →</span><input class="gfi" id="fnI" value="${esc(def)}"><button class="btn btn-p" style="padding:4px 10px;font-size:9px" id="fnO">OK</button><button class="btn" style="padding:4px 8px;font-size:9px" id="fnX">✕</button></div>`;const i=$('fnI');i.focus();i.select();$('fnO').onclick=()=>{c.innerHTML='';res(i.value.trim()||null);};$('fnX').onclick=()=>{c.innerHTML='';res(null);};i.addEventListener('keydown',e=>{if(e.key==='Enter'){c.innerHTML='';res(i.value.trim()||null);}if(e.key==='Escape'){c.innerHTML='';res(null);}});});}
function rfS(){if(!svg)return;const w=svg.getAttribute('width');svg.setAttribute('width',+w+.001);requestAnimationFrame(()=>{svg.setAttribute('width',w);if(selEl)hl(selEl);});}

// ═══ FIGMA JSON → METADATA BINDING ═══
function loadFigFile(f){if(!f)return;const r=new FileReader();r.onload=e=>{$('figJson').value=e.target.result;};r.readAsText(f,'UTF-8');}

async function fetchFigma(){
  const log=$('figLog');log.innerHTML='';
  const token=$('figToken').value.trim();
  let url=$('figUrl').value.trim();
  if(!token){log.innerHTML='<span style="color:var(--red)">❌ Нужен Personal Access Token. Получить: Figma → Settings → Personal Access Tokens</span>';return;}
  if(!url){log.innerHTML='<span style="color:var(--red)">❌ Вставьте ссылку</span>';return;}
  
  // Parse different URL formats
  // 1. Direct API URL: https://api.figma.com/v1/files/KEY/nodes?ids=ID
  // 2. Figma file URL: https://www.figma.com/file/KEY/Name?node-id=ID
  // 3. Figma design URL: https://www.figma.com/design/KEY/Name?node-id=ID
  let apiUrl=url;
  if(!url.includes('api.figma.com')){
    const m=url.match(/figma\.com\/(?:file|design)\/([^/]+)\/[^?]*(?:\?.*node-id=([^&]+))?/);
    if(m){
      const fileKey=m[1];
      const nodeId=m[2]?decodeURIComponent(m[2]).replace(/-/g,':'):'';
      if(nodeId){
        apiUrl=`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;
      }else{
        apiUrl=`https://api.figma.com/v1/files/${fileKey}`;
      }
    }
  }
  
  log.innerHTML='⏳ Загрузка из Figma API...';
  try{
    const resp=await fetch(apiUrl,{headers:{'X-Figma-Token':token}});
    if(!resp.ok){
      const err=await resp.text();
      log.innerHTML=`<span style="color:var(--red)">❌ ${resp.status}: ${err.slice(0,200)}</span>`;
      return;
    }
    const json=await resp.json();
    $('figJson').value=JSON.stringify(json,null,2);
    log.innerHTML=`<span style="color:var(--grn)">✓ JSON загружен (${Math.round(JSON.stringify(json).length/1024)}KB). Нажмите "Привязать Layout"</span>`;
    // Save token to localStorage for convenience
    try{localStorage.setItem('figma_token',token);}catch(e){}
  }catch(e){
    log.innerHTML=`<span style="color:var(--red)">❌ Ошибка: ${e.message}</span>`;
  }
}

function applyFigmaMeta(){
  const log=$('figLog');log.innerHTML='';
  if(!svg){log.innerHTML='<span style="color:var(--red)">❌ Сначала загрузите SVG (Open SVG или drag-and-drop)</span>';return;}
  const jsonText=$('figJson').value.trim();
  if(!jsonText){log.innerHTML='<span style="color:var(--red)">❌ Вставьте Figma JSON</span>';return;}
  let raw;try{raw=JSON.parse(jsonText);}catch(e){log.innerHTML='<span style="color:var(--red)">❌ Invalid JSON: '+e.message+'</span>';return;}
  if(Array.isArray(raw))raw=raw[0];

  // Find root frame node
  function findFrame(obj){
    if(!obj||typeof obj!=='object')return null;
    if(obj.type&&obj.absoluteBoundingBox)return obj;
    if(obj.type==='DOCUMENT'||obj.type==='CANVAS'){
      if(obj.children){for(const ch of obj.children){const f=findFrame(ch);if(f)return f;}}
    }
    if(obj.document)return findFrame(obj.document);
    if(obj.nodes){for(const k of Object.keys(obj.nodes)){const n=obj.nodes[k];if(n.document)return findFrame(n.document);}}
    if(Array.isArray(obj)){for(const ch of obj){const f=findFrame(ch);if(f)return f;}}
    if(obj.children&&obj.type)return obj;
    return null;
  }
  const root=findFrame(raw);
  if(!root){log.innerHTML='<span style="color:var(--red)">❌ Не найден фрейм в JSON</span>';return;}

  // Match Figma nodes to SVG elements by id/name
  // Figma SVG export uses node.name as id (spaces→spaces, Figma keeps them)
  let matched=0,layouts=0;
  function matchNode(node){
    if(!node)return;
    const name=node.name||'';
    let svgEl=null;
    try{
      svgEl=svg.querySelector('[id="'+CSS.escape(name)+'"]');
      if(!svgEl){const safe=name.replace(/[^a-zA-Z0-9_-]/g,'_');svgEl=svg.querySelector('#'+CSS.escape(safe));}
    }catch(e){}
    // For TEXT nodes: match by textContent if id didn't work (Cyrillic encoding issue)
    if(!svgEl&&node.type==='TEXT'&&node.characters){
      const chars=node.characters.trim();
      svg.querySelectorAll('text').forEach(t=>{
        if(!svgEl&&t.textContent.trim()===chars)svgEl=t;
      });
    }
    // For FRAME nodes without match: try matching by Figma node id pattern
    if(!svgEl&&node.name){
      // Figma SVG uses spaces in ids like "Frame 2131329238"
      svg.querySelectorAll('[id]').forEach(e=>{
        if(!svgEl&&e.id===node.name)svgEl=e;
      });
    }

    if(svgEl&&svgEl.dataset.nid){
      const nid=svgEl.dataset.nid;
      GN.set(nid,name);
      matched++;

      // Store text bounding box for TEXT nodes
      if(node.type==='TEXT'&&node.absoluteBoundingBox){
        const ab=node.absoluteBoundingBox;
        TBB.set(nid,{w:ab.width,h:ab.height,autoResize:node.style?.textAutoResize||'NONE'});
      }

      // Store layout metadata if this is a layout frame
      if(node.layoutMode&&node.layoutMode!=='NONE'){
        layouts++;
        const dir=node.layoutMode==='HORIZONTAL'?'h':'v';
        const isH=dir==='h';
        const align=node.counterAxisAlignItems==='CENTER'?'center':node.counterAxisAlignItems==='MAX'?'end':'start';
        const mainSz=(isH?node.primaryAxisSizingMode:node.primaryAxisSizingMode)==='AUTO'?'hug':'fixed';
        const crossSz=node.counterAxisSizingMode==='AUTO'?'hug':'fixed';

        // Per-child sizing
        const childSizing={};
        (node.children||[]).forEach(kid=>{
          const kName=kid.name||'';
          let kEl=null;
          try{
            kEl=svg.querySelector('[id="'+CSS.escape(kName)+'"]');
            if(!kEl){const ks=kName.replace(/[^a-zA-Z0-9_-]/g,'_');kEl=svg.querySelector('#'+CSS.escape(ks));}
          }catch(e){}
          if(kEl&&kEl.dataset.nid){
            const mainMode=(isH?kid.layoutSizingHorizontal:kid.layoutSizingVertical)||'FIXED';
            const crossMode=(isH?kid.layoutSizingVertical:kid.layoutSizingHorizontal)||'FIXED';
            childSizing[kEl.dataset.nid]={
              main:mainMode==='FILL'?'fill':mainMode==='HUG'?'hug':'fixed',
              cross:crossMode==='FILL'?'fill':crossMode==='HUG'?'hug':'fixed'
            };
          }
        });

        LAY.set(nid,{
          on:true,dir,
          gap:node.itemSpacing||0,
          pt:node.paddingTop||0,pr:node.paddingRight||0,
          pb:node.paddingBottom||0,pl:node.paddingLeft||0,
          align,mainSizing:mainSz,crossSizing:crossSz,
          spacing:'packed',childSizing
        });
      }
    }
    // Recurse
    (node.children||[]).forEach(ch=>matchNode(ch));
  }
  matchNode(root);
  bT(); // rebuild tree to show names
  closeM('figM');
  log.innerHTML=`<span style="color:var(--grn)">✓ Привязано ${matched} нод, ${layouts} layout, ${TBB.size} текстовых фреймов</span>`;
}

// ═══ TEMPLATE INTEGRATION ═══
let tplId = null;
const urlParams = new URLSearchParams(window.location.search);

async function initEditor() {
  tplId = urlParams.get('tpl');
  if (tplId) {
    try {
      const res = await fetch(`/api/templates/${tplId}`);
      if (res.ok) {
        const tpl = await res.json();
        document.title = `${tpl.name} — HUIGMA`;
        if (tpl.svg) loadSVG(tpl.svg);
        // Restore dynamic config
        if (tpl.dynamicConfig) {
          for (const [alias, cfg] of Object.entries(tpl.dynamicConfig)) {
            if (cfg.nid && nM.has(cfg.nid)) {
              dynM.set(cfg.nid, { alias, props: new Set(cfg.props || []) });
            }
          }
          uDB(); bT();
        }
        return;
      }
    } catch(e) { console.error('Load template error:', e); }
  }
  // Default demo
  loadSVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#16213e"/></linearGradient></defs><rect id="sky" width="400" height="300" fill="url(#skyGrad)"/><g id="stars"><circle cx="50" cy="40" r="1.5" fill="#fff" opacity=".8"/><circle cx="120" cy="80" r="1" fill="#fff" opacity=".6"/><circle cx="200" cy="30" r="1.2" fill="#fff" opacity=".9"/><circle cx="300" cy="60" r="1" fill="#fff" opacity=".5"/></g><g id="mountains"><polygon points="0,300 80,160 160,300" fill="#0f3460"/><polygon points="100,300 200,130 300,300" fill="#1a1a4e"/><polygon points="220,300 330,170 400,300" fill="#0f3460"/></g><rect id="card" x="130" y="100" width="140" height="80" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/><text x="200" y="135" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#e8ecf4">Hello SVG</text><text x="200" y="158" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#8891a5">Создайте шаблон на главной</text><circle id="dot" cx="200" cy="220" r="12" fill="#6c8cff" opacity=".8"/></svg>`);
}

async function saveTemplate() {
  if (!tplId || !svg) return;
  // Serialize current SVG
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  // Build dynamic config
  const dc = {};
  dynM.forEach((d, nid) => { dc[d.alias || nid] = { nid, props: [...d.props] }; });
  const vb = svg.viewBox?.baseVal;
  const w = vb?.width || parseInt(svg.getAttribute('width')) || 400;
  const h = vb?.height || parseInt(svg.getAttribute('height')) || 300;
  try {
    const res = await fetch(`/api/templates/${tplId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ svg: svgStr, dynamicConfig: dc, width: w, height: h })
    });
    if (res.ok) {
      const sb = $('saveBtn');
      if (sb) { sb.textContent = '✓ Saved'; sb.style.color = 'var(--grn)'; setTimeout(() => { sb.textContent = '💾 Save'; sb.style.color = ''; }, 1200); }
    }
  } catch(e) { alert('Ошибка сохранения: ' + e.message); }
}

// Keyboard shortcut Ctrl+S
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveTemplate(); }
});

initEditor();
</script>
</body>
</html>
