const assert=require('node:assert/strict'),fs=require('node:fs');
const engine=require('./search.js'),data=JSON.parse(fs.readFileSync(__dirname+'/data.json','utf8'));
const run=(q,opts={})=>engine.find(q,data.entries,{scope:'ortho',role:'surgery',inferRole:false,...opts});
for(const q of ['ankle fracture without reduction','not an ankle fracture','sans réduction cheville']){
 const r=run(q);assert.equal(r.clarification,'negation');assert.equal(r.entries.length,0,q)
}
for(const q of ['ACL repair','repair of the ACL','PCL primary repair','réparation du LCA']){const r=run(q);assert.equal(r.clarification,'distinctTechnique');assert.equal(r.entries.length,0,q)}
assert.equal(run('TKA 02708').clarification,'codeConflict');
assert.equal(run('09542 02403').clarification,'multipleCodes');
assert.equal(run('09542',{scope:'Cardiologie'}).clarification,'scopeMismatch');
assert.deepEqual(run('09542',{scope:'all'}).entries.map(e=>e.code),['09542']);
assert.deepEqual(run('ACL reconstruction').entries.map(e=>e.code),['18020']);
assert.deepEqual(run('PCL reconstruction').entries.map(e=>e.code),['18021']);
assert.deepEqual(run('ACL and PCL reconstruction').entries.map(e=>e.code),['18022']);
assert.deepEqual(run('total knee replacement').entries.map(e=>e.code),['02403']);
assert.equal(run('knee replacement under anesthesia').role,'surgery');
assert.equal(run('knee replacement under anesthesia').entries.length,run('knee replacement').entries.length);
for(const q of ['nonunion femur','ankle hardware removal','bimalleolar ankle ORIF'])assert(!run(q).clarification,q);
console.log('Passed search safety checks: negation, repair/reconstruction, conflicting/multiple codes, specialty, combined ligaments, no hidden R2 filtering.');
