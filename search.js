(function(root){
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const has=(s,t)=>(' '+norm(s)+' ').includes(' '+norm(t)+' ');
const body=e=>norm(e.body),cat=e=>norm(e.category),sub=e=>norm(e.subfields.join(' ')),label=e=>norm(e.title),all=e=>norm(e.path.join(' ')+' '+e.title);
const concepts=[
 [/\b(subtalar|sous astragalien(?:ne)?|sous talien(?:ne)?|subtalien(?:ne)?|subtalaire)\b/g,e=>/sous astragal|astragalo calcane|sous tal|subtal/.test(all(e)),'subtalar'],
 [/\b(talus|astragale)\b/g,e=>/\bastragale\b|\btalus\b/.test(all(e)),'talus'],
 [/\b(ulna|cubitus)\b/g,e=>/\bulna\b|\bcubitus\b/.test(all(e)),'ulna'],
 [/\b(navicular|naviculaire)\b/g,e=>body(e)==='pied'&&/navicul|scaphoide/.test(all(e)),'navicular'],

 [/\b(?:(?:1st|first|1er|premier|great toe|big toe|hallux)\s+)?(?:mtp(?:j|1)?|metatarsophalangeal(?: joint)?|metatarso phalangienne?)\b/g,e=>body(e)==='pied'&&/metatarso phalang/.test(label(e)),'mtp'],
 [/\b(?:(?:first|1st|big|great) toe|hallux)(?: joint)?\b/g,e=>body(e)==='pied'&&(/metatarso phalang|interphalang/.test(label(e))||/hallux/.test(all(e))),'toe'],
 [/\b(ip(?:j)?|interphalangeal(?: joint)?|interphalangienne?)\b/g,e=>/interphalang/.test(all(e)),'ip'],
 [/\b(hallux valgus|hallux varus|bunion(?: correction)?)\b/g,e=>body(e)==='pied'&&/hallux valgus|hallux varus/.test(all(e)),'hallux'],
 [/\b(laminectomy|laminectomie)\b/g,e=>/laminectomie/.test(all(e)),'laminectomy'],
 [/\b(discectomy|diskectomy|discectomie|discoidectomie)\b/g,e=>/discoidectomie|discectomie/.test(all(e)),'discectomy'],
 [/\b(lumbar|lombaire)\b/g,e=>/lombaire/.test(all(e)),'lumbar'],
 [/\b(cervical|cervicale)\b/g,e=>/cervicale/.test(all(e)),'cervical'],
 [/\b(thoracic|thoracique|dorsale)\b/g,e=>/dorsale|thoracique/.test(all(e)),'thoracic'],
 [/\b(upper extrem(?:ities|eties|ity|ety)|upper limbs?|membres? superieurs?)\b/g,e=>norm(e.topic).includes('membres superieurs'),'upper'],
 [/\b(lower extrem(?:ities|eties|ity|ety)|lower limbs?|membres? inferieurs?)\b/g,e=>norm(e.topic).includes('membres inferieurs'),'lower'],
 [/\b(distal radius|distal radial|radius distal|epiphyse distale (?:du )?radius|colles|smith fracture)\b/g,e=>body(e)==='avant bras'&&sub(e).includes('distale radius'),'distalRadius'],
 [/\b(ankles?|chevilles?)\b/g,e=>body(e)==='cheville','ankle'],
 [/\b(shoulders?|epaules?)\b/g,e=>body(e)==='epaule','shoulder'],
 [/\b(humerus|upper arm|bras)\b/g,e=>body(e)==='bras humerus','arm'],
 [/\b(elbows?|coudes?)\b/g,e=>body(e)==='coude','elbow'],
 [/\b(forearms?|avant bras)\b/g,e=>body(e)==='avant bras','forearm'],
 [/\b(wrists?|hands?|poignet|main)\b/g,e=>body(e)==='main et poignet','hand'],
 [/\b(hips?|hanches?)\b/g,e=>body(e)==='hanche'||body(e)==='femur'&&/col|trochanter/.test(sub(e)),'hip'],
 [/\b(thighs?|cuisses?)\b/g,e=>body(e)==='cuisse','thigh'],
 [/\b(femurs?|femoral)\b/g,e=>body(e)==='femur','femur'],
 [/\b(knees?|genoux|genou)\b/g,e=>body(e)==='genou','knee'],
 [/\b(tibia and fibula|tibia et perone|tibia|fibula|perone|lower leg)\b/g,e=>body(e)==='tibia et perone','leg'],
 [/\b(feet|foot|pieds?)\b/g,e=>body(e)==='pied','foot'],
 [/\b(spine|spinal(?: column)?|vertebral|colonne vertebrale|rachis)\b/g,e=>body(e)==='colonne vertebrale','spine'],
 [/\b(pelvis|pelvic|acetabul(?:um|ar)|bassin)\b/g,e=>body(e)==='bassin','pelvis'],
 [/\b(fractures?|fractured|fx)\b/g,e=>/fractur/.test(cat(e))||/fractur/.test(label(e)),'fracture'],
 [/\b(orif|rofi|open reduction(?: (?:and )?internal fixation)?|reduction ouverte(?: et fixation interne)?)\b/g,e=>/reduction ouverte/.test(sub(e)+' '+label(e)),'openReduction'],
 [/\b(crif|closed reduction(?: (?:and )?internal fixation)?|reduction fermee)\b/g,e=>/reduction fermee/.test(sub(e)+' '+label(e)),'closedReduction'],
 [/\b(hardware removal|removal of hardware|ablation (?:du )?materiel|exerese (?:du )?materiel|remove plates? and screws?)\b/g,e=>/exerese/.test(cat(e))&&/vis|clou|plaque|broche|materiel/.test(sub(e)+' '+label(e)),'hardwareRemoval'],
 [/\b(arthroscopy|arthroscopic|arthroscopie)\b/g,e=>/arthroscop/.test(cat(e)+' '+label(e)),'arthroscopy'],
 [/\b(arthrodesis|fusion|arthrodese)\b/g,e=>/arthrodes/.test(all(e))&&!['02213','02223'].includes(e.code),'fusion'],
 [/\b(osteotomy|osteotomie)\b/g,e=>/osteotom/.test(cat(e)+' '+label(e)),'osteotomy'],
 [/\b(bimalleolar|bimalleolaire|bimal)\b/g,e=>has(label(e),'bimalleolaire'),'bimalleolar'],
 [/\b(trimalleolar|trimalleolaire|trimal)\b/g,e=>body(e)==='cheville'&&/fracture/.test(cat(e))&&(/bimalleolaire|posterieure/.test(label(e))),'trimalleolar'],
 [/\b(unimalleolar|unimalleolaire|lateral malleolus|medial malleolus)\b/g,e=>body(e)==='cheville'&&/unimalleolaire/.test(label(e)),'unimalleolar'],
 [/\b(syndesmosis|syndesmotic|syndesmose|syndesmotique)\b/g,e=>/syndesmot/.test(label(e)),'syndesmosis'],
 [/\b(achilles tendon repair|achilles repair|reparation (?:du )?tendon d achille)\b/g,e=>e.code==='02441','achillesRepair'],
 [/\b(rotator cuff repair|rotator cuff reconstruction|rcr|reparation (?:de la )?coiffe(?: des rotateurs)?)\b/g,e=>['18098','18099','18110'].includes(e.code),'cuffRepair'],
 [/\b(reverse total shoulder(?: arthroplasty| replacement)?|reverse shoulder(?: arthroplasty| replacement)?|rtsa|rsa|prothese (?:totale )?(?:d epaule )?inversee)\b/g,e=>e.code==='18176','reverseShoulder'],
 [/\b(total shoulder(?: arthroplasty| replacement)?|tsa|prothese totale d epaule)\b/g,e=>e.code==='02407','totalShoulder'],
 [/\b(total knee(?: arthroplasty| replacement)?|tka|tkr|ptg|prothese totale du genou)\b/g,e=>e.code==='02403','totalKnee'],
 [/\b(unicompartmental knee(?: arthroplasty| replacement)?|uka|ukr|puc)\b/g,e=>e.code==='02492','unicompartmentalKnee'],
 [/\b(total hip(?: arthroplasty| replacement)?|tha|thr|pth|prothese totale de hanche)\b/g,e=>e.code==='02333','totalHip'],
 [/\b(acl(?: reconstruction| repair)?|lca|anterior cruciate(?: ligament)?(?: reconstruction)?|reconstruction (?:du )?ligament croise anterieur)\b/g,e=>['18020','18022'].includes(e.code),'acl'],
 [/\b(pcl(?: reconstruction| repair)?|lcp|posterior cruciate(?: ligament)?(?: reconstruction)?)\b/g,e=>['18021','18022'].includes(e.code),'pcl'],
 [/\b(carpal tunnel(?: release| decompression)?|ctr|tunnel carpien|canal carpien)\b/g,e=>['02383','02382'].includes(e.code),'carpalTunnel'],
 [/\b(latarjet)\b/g,e=>e.code==='02590','latarjet'],
 [/\b(bankart|bristow)\b/g,e=>e.code==='02575','bankart'],
 [/\b(mua|manipulation under anesthe[st]ia|manipulation sous anesthesie)\b/g,e=>/manipulation/.test(label(e)+' '+cat(e)),'mua'],
 [/\b(intramedullary nail(?:ing)?|im nail(?:ing)?|imn|cephalomedullary nail(?:ing)?|enclouage centromedullaire)\b/g,e=>/enclouage|clou.*verrouill/.test(label(e))&&!/exerese/.test(cat(e)),'nail'],
 [/\b(meniscectomy|meniscectomie)\b/g,e=>/meniscectomie/.test(label(e))&&body(e)==='genou','meniscectomy'],
 [/\b(revision|reprise|replacement revision)\b/g,e=>/remplacement|revision|reintervention/.test(cat(e)+' '+label(e)),'revision']
];
// Long phrases take precedence over their component anatomy words.
const ordered=concepts.slice().sort((a,b)=>b[0].source.length-a[0].source.length);
const translations={plates:'plaque',plate:'plaque',screws:'vis',screw:'vis',percutaneous:'percutanee',pinning:'fixation percutanee',pins:'broche',pin:'broche',arthroplasty:'arthroplastie',replacement:'prothese',repair:'reparation',reconstruction:'reconstruction',debridement:'debridement',drainage:'drainage',decompression:'decompression',primary:'primaire',secondary:'secondaire',ligament:'ligament',medial:'medial',lateral:'lateral',proximal:'proximale',distal:'distale',anterior:'anterieur',posterior:'posterieur',patella:'rotule',patellar:'rotulien',humeral:'humerale',femoral:'femorale',osteosynthesis:'osteosynthese',ulna:'cubitus',radial:'radius',malunion:'malunion',nonunion:'pseudarthrose',humerus:'humerus',tendon:'tendon',biopsy:'biopsie',excision:'excision',amputation:'amputation'};
const stop=new Set('articulation articulations correction joint joints i did do doing had have performed performing patient a an the of for to my with without on in at from under and or is it this that procedure surgery surgical case please find show me all possible code codes time ortho orthopedics orthopaedics orthopedic orthopaedic anesthesiology anesthesiologie anaesthesiology anesthesia anaesthesia anesthesie general generale ga r2 r1 units unit duration temps duree unite unites de du des d la le les un une au aux en pour sous avec sans et ou par je ai fait une intervention chirurgie orthopedique service services des what which can you need would like looking look want cases case right left bilateral both done perform performed type get give related show looking search some give please'.split(' '));
function infer(q){const n=norm(q);return{role:/anesth|anaesth|r 2|r2|time code|time units|unites de base/.test(n)?'anesthesia':null,durationOnly:!/fracture|orif|rofi|ankle|cheville|ortho/.test(n)&&/duration units|unites de duree|time table|duration table|tableau.*duree/.test(n)}}
function inSpecialty(e,scope){if(scope==='all')return true;if(scope==='ortho'||scope==='Chirurgie orthopédique')return e.orthopedic||e.topic==='Chirurgie orthopédique';return e.topic===scope||e.path.some(p=>norm(p)===norm(scope));}
function find(q,entries,{scope='ortho',role='surgery',inferRole=true}={}){
 let n=norm(q).replace(/\bhalgus\b/g,'hallux').replace(/\bvalgous\b/g,'valgus').replace(/extremeties/g,'extremities').replace(/othopedics/g,'orthopedics');const intent=infer(n);role=(inferRole&&intent.role)||role;
 // Only supported explicit exclusions are interpreted; all other negatives remain guarded.
 const noOsteotomy=/\b(?:without|no|sans) (?:an |any |une |d )?(?:osteotomy|osteotomie)\b/.test(n);
 if(noOsteotomy)n=n.replace(/\b(?:without|no|sans) (?:an |any |une |d )?(?:osteotomy|osteotomie)\b/g,' ');
 const clarify=reason=>({entries:[],concepts:[],unrecognized:[],role,clarification:reason});
 // Do not discard negation or conflate direct ligament repair with reconstruction.
 if(/\b(without|not|no|sans|aucun|aucune|pas de|pas d|ne pas|non)\b/.test(n))return clarify('negation');
 if(/\b(?:acl|pcl|lca|lcp)\s+(?:primary\s+)?repair\b|\brepair\s+(?:of\s+)?(?:the\s+)?(?:acl|pcl)\b|\breparation\s+(?:du\s+)?(?:lca|lcp)\b/.test(n)&&! /reconstruct/.test(n))return clarify('distinctTechnique');
 const explicitCodes=n.match(/\b\d{5}\b/g)||[];if(new Set(explicitCodes).size>1)return clarify('multipleCodes');
 const code=n.match(/\b\d{5}\b/);if(code){
 const list=entries.filter(e=>e.code===code[0]);
 if(list.length&&!list.some(e=>inSpecialty(e,scope)))return clarify('scopeMismatch');
 const remainder=n.replace(code[0],'').trim();
 if(remainder){const described=find(remainder,entries,{scope,role,inferRole});if(described.clarification)return described;if(described.concepts.length&& !described.entries.some(e=>e.code===code[0]))return clarify('codeConflict')}
 return{entries:list.filter(e=>inSpecialty(e,scope)),concepts:['code'],unrecognized:[],role,code:true}}

 let remaining=n,tests=noOsteotomy?[e=>/sans osteotomie/.test(all(e))]:[],used=[];const revision=/\b(revision|reprise)\b/.test(n);
 const phraseLength=([re])=>Math.max(0,...Array.from(n.matchAll(new RegExp(re.source,'g')),m=>m[0].length));
 const queryOrder=ordered.slice().sort((a,b)=>phraseLength(b)-phraseLength(a));
 for(const [re,test,key] of queryOrder){re.lastIndex=0;if(re.test(remaining)){
   // Revision arthroplasty uses its own published table, rather than the primary-implant alias.
   if(revision&&['totalKnee','totalHip','totalShoulder','unicompartmentalKnee','reverseShoulder'].includes(key)){
     const region=key==='totalKnee'||key==='unicompartmentalKnee'?'genou':key==='totalHip'?'hanche':'epaule';tests.push(e=>body(e)===region&&/arthroplastie de remplacement/.test(cat(e)));
   }else tests.push(test);
   used.push(key);re.lastIndex=0;remaining=remaining.replace(re,' ');
 }}
 const tokens=remaining.split(' ').filter(t=>t&&!stop.has(t)&&!/^\d+$/.test(t));
 const list=entries.filter(e=>(!used.includes('acl')||used.includes('pcl')||e.code!=='18022')&&(!used.includes('pcl')||used.includes('acl')||e.code!=='18022')&&inSpecialty(e,scope)&&(role!=='anesthesia'||!!e.baseUnits)&&tests.every(f=>f(e))&&tokens.every(t=>{let tr=translations[t]||t;return tr.split(' ').every(part=>all(e).split(' ').some(w=>w===part||part.length>4&&(w===part+'s'||w+'s'===part)))}));
 const specificity=e=>{let s=0;if(/supplement/.test(label(e)))s-=5;if(/revision|remplacement/.test(cat(e))&&!revision)s-=2;return s};
 // Preserve manual order. Anatomy grouping is performed by the UI, never relevance-shuffled.
 list.sort((a,b)=>(a.sourceOrder??entries.indexOf(a))-(b.sourceOrder??entries.indexOf(b)));
 return{entries:list,concepts:used,unrecognized:tokens.filter(t=>!translations[t]),role,durationOnly:intent.durationOnly,exclusion:noOsteotomy?'osteotomy':null};
}
function durationUnits(minutes){let periods=Math.floor(Math.max(0,Number(minutes)||0)/15);return{periods,units:Math.min(periods,8)+Math.min(Math.max(periods-8,0),11)*2+Math.max(periods-19,0)*3}}
const api={norm,find,infer,durationUnits,inSpecialty};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.RAMQSearch=api;
})(typeof window==='undefined'?globalThis:window);
