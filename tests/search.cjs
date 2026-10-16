const assert=require('node:assert/strict'),{readFileSync}=require('node:fs');
const engine=require('../search.js'),data=JSON.parse(readFileSync(__dirname+'/../data.json','utf8')),entries=data.entries;
const run=(q,opts)=>engine.find(q,entries,opts);
const codes=q=>run(q).entries.map(e=>e.code);
// Expected references checked against the official table rows, including row 111747.
for (const q of ['ankle fracture','fracture de cheville']){
 const es=run(q).entries;assert(es.length>0,q);assert(es.every(e=>e.body==='Cheville'&&/Fracture/.test(e.category)),q);assert(!es.some(e=>e.code==='02306'),q+' must exclude hardware removal');assert(es.some(e=>e.code==='09542'),q);
}
for(const q of ['upper extremities','upper extremeties','membres supérieurs']){const es=run(q).entries;assert(es.length>200,q);assert(es.every(e=>e.topic==='Extrémités - Membres supérieurs'),q);assert(es.every(e=>e.code&&e.title&&e.category),q+' returns full rows')}
assert.deepEqual(codes('bimalleolar ankle ORIF'),['09542']);
assert(codes('ORIF distal radius').includes('18152'));assert(codes('ORIF distal radius').includes('18065'));assert(!codes('ORIF distal radius').includes('18042'));
assert.deepEqual(codes('reverse shoulder arthroplasty'),['18176']);
assert.deepEqual(codes('RTSA'),['18176']);assert.deepEqual(codes('TKA'),['02403']);assert.deepEqual(codes('THA'),['02333']);
assert(codes('revision TKA').includes('18161'));assert(!codes('revision TKA').includes('02403'));
assert(codes('rotator cuff repair').includes('18098'));assert(!codes('rotator cuff repair').includes('02158'));
assert(codes('carpal tunnel release').includes('02383'));
assert(codes('ACL reconstruction').includes('18020'));
assert(codes('ankle hardware removal').includes('02306'));assert(!codes('ankle hardware removal').includes('09542'));
const a=run('time codes under anesthesia for orthopedics');assert.equal(a.role,'anesthesia');assert.equal(a.entries.length,entries.filter(e=>e.orthopedic&&e.baseUnits).length);assert(a.entries.length>700);assert(a.entries.every(e=>e.baseUnits));
assert.equal(run('nonsense nonexistent procedure').entries.length,0);
for(const [mins,units] of [[14,0],[15,1],[120,8],[135,10],[285,30],[300,33],[1200,213]])assert.equal(engine.durationUnits(mins).units,units);
const ankle=entries.find(e=>e.code==='09542');assert.equal(ankle.anchor,'111747');assert.equal(ankle.baseUnits,'6');assert.equal(ankle.surgicalFee,'580,55');
assert.equal(new Set(entries.map(e=>e.id)).size,entries.length);
console.log('Passed: bilingual anatomy, typos, fracture vs hardware removal, ORIF radius/ankle, arthroplasty/revision aliases, anesthesia completeness, duration boundaries, exact source row.');
console.log('Orthopedics:',entries.filter(e=>e.orthopedic).length,'R=2 rows:',a.entries.length);
