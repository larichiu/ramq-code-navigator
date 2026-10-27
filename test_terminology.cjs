const fs=require('node:fs'),assert=require('node:assert/strict'),search=require('./search.js');
const data=JSON.parse(fs.readFileSync(__dirname+'/data.json'));
const run=q=>search.find(q,data.entries,{scope:'ortho',inferRole:false}).entries.map(e=>e.code).sort();
for(const term of data.anatomyGlossary.filter(t=>t.bodyLabel)){assert.deepEqual(run(term.fr),run(term.en),`${term.fr} / ${term.en}`);assert(run(term.fr).length>0,term.fr)}
assert.deepEqual(run('subtalar fusion'),run('arthrodèse sous-astragalienne'));
assert(run('subtalar fusion').includes('02734'));assert(!run('subtalar fusion').includes('02938'),'Subtalar must not mean tibiotalar');
assert.deepEqual(run('ulna'),run('cubitus'));assert.deepEqual(run('talus'),run('astragale'));
assert.equal(data.translations['arthrodèse primaire sous-astragalienne'],'Primary subtalar arthrodesis');
assert.equal(data.translations['cubitus'],'Ulna');assert.equal(data.translations['astragale'],'Talus');assert.equal(data.translations['bassin'],'Pelvis');
const foot=data.entries.find(e=>e.code==='02246');assert.equal(foot.translationOverrides[foot.title],'Navicular or accessory navicular (PG-28)');
const immutable=e=>[e.id,e.code,e.anchor,e.surgicalFee,e.baseUnits,e.title,e.path,e.notes];assert.equal(require('node:crypto').createHash('sha256').update(JSON.stringify(data.entries.map(immutable))).digest('hex'),'211c1f5141720b5f3b1077cee2c04400df82282ee7b2b70ac8642cd65e25ece8','Source rows, French labels, prices, conditions and paths unchanged');
assert.equal(data.anatomyGlossary.filter(t=>t.bodyLabel).length,15);
for(const term of data.anatomyGlossary){assert(term.sources.length>0);assert(term.sources.every(s=>/^https:\/\/(vitrinelinguistique.oqlf.gouv.qc.ca|www.btb.termiumplus.gc.ca)\//.test(s.url)));}
console.log('Passed terminology checks: all 15 body labels search equivalently EN/FR; subtalar differs from tibiotalar; ulna/talus aliases; context-specific foot navicular; all source fields unchanged.');
