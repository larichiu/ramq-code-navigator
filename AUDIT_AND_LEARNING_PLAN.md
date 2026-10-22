# RAMQ Navigator: critical audit and physician vocabulary plan

Audit date: October 21, 2026. Code: original v3 compared with local patch v3.2. Manual index: snapshot captured October 15, 2026; 5,679 source rows. This audit did not refresh the RAMQ manual or establish current billing eligibility.

## Assessment

The application is a useful interface prototype with a deterministic search engine. It does not currently learn, record physician feedback, maintain personal synonyms, or share learning between users. Browser storage holds language, device and theme preferences only.

It is not ready to be treated as an independently reliable clinical or billing code selector. Broader testing found dangerous semantic matches, missing common terms, wrong translations and at least one incorrect imported heading relationship. Adding an LLM or automatically accepting clicked codes would amplify those problems unless the source model and review process are corrected first.

## Changes implemented in v3.2

- Browse by body part is a native, accessible disclosure. It starts collapsed as one compact row and expands when clicked or activated with the keyboard. Pelvis and Spinal column remain separate.
- Negated queries now request clarification instead of discarding words such as “without” and returning the opposite procedure. This is a conservative guard, not complete clinical negation understanding.
- ACL/PCL direct-repair phrases no longer silently map to reconstruction. Isolated ACL/PCL reconstruction does not automatically include the combined ACL+PCL code.
- Procedure/code conflicts, multiple distinct typed codes and exact codes outside the selected specialty now request clarification.
- The main UI no longer lets “under anesthesia” silently restrict results to rows with an R=2 value. An explicit legacy anesthesia-search mode remains in the engine for existing utilities; the main UI disables that inference.
- Sixteen specific mistranslated glossary entries were corrected. This is not full clinical translation validation. The result caption now makes incomplete translation review visible outside collapsed notes.

These changes are implemented locally and included in the updated release package. They do not implement the proposed learning system below.

## Search failures reproduced

A 41-query exploratory set was run against the earlier search implementation. Fifteen queries returned no rows. This is a deliberately selected stress set, not a representative accuracy estimate, and a nonempty result does not establish correctness.

| Query / behavior | Before patch | After patch / remaining issue |
| --- | --- | --- |
| ankle fracture without reduction | Six results, including open and closed reductions | No automatic procedure result; asks for clarification |
| ACL repair | Reconstruction candidates 18020 and 18022 | Requests clarification; repair and reconstruction are not equated |
| ACL reconstruction | Included combined ACL+PCL reconstruction | Isolated query returns 18020; combined query retains 18022 |
| TKA 02708 | Returned 02708 despite contradictory TKA intent | Requests clarification |
| 09542 under Cardiology scope | Exact-code lookup bypassed the scope | Asks to use All specialties |
| knee replacement under anesthesia | Silently changed role and reduced 16 results to 10 | Main UI keeps surgery role and 16 candidates |
| knee replacement | 16 candidates, including revisions and supplements | Remains broad; needs a primary/revision/variant question or grouping |
| distal radius ORIF with volar plate | No results, although a shorter query returns candidates | Unfixed vocabulary/detail-handling gap |
| rotator cuff tear repair | No results, although rotator cuff repair works | Unfixed vocabulary gap |
| hip hemiarthroplasty; hip hemi; DHS hip fracture; gamma nail; hip pinning | No results | Unfixed; needs source-reviewed procedure/implant terminology |
| trigger finger release; cubital tunnel release; shoulder scope | No results | Unfixed vocabulary gaps |
| bankart repair | No results, although Bankart alone is a supported alias | Unfixed composition problem |
| rotator cuf repair | No results | No general spelling correction |
| trimalleolar ankle ORIF | Primary and supplement rows returned together | Needs explicit primary/supplement grouping and source-reviewed combined-procedure handling |

The raw [before](search-before.json) and [after](search-after.json) JSON reports accompany this audit. The “after” report uses the main UI’s configuration, with automatic anesthesia-role inference disabled. Existing regression checks and new conservative-search checks pass; they do not validate all 5,679 rows.

## Translation assessment

The previous dictionary had 5,404 translation entries and covered all 5,394 distinct nonempty source strings used by the indexed paths, titles and notes in the sampled data inventory. Coverage does not mean correctness.

Examples found before this patch:

| French source | Previous English output | Targeted correction |
| --- | --- | --- |
| coiffe des rotateurs | rotator cap | Rotator cuff |
| bourse superficielle | superficial stock exchange | Superficial bursa |
| bourse ischiatique | ischiatic scholarship | Ischial bursa |
| tête et col | head and collar | Head and neck |
| dure-mère intacte | intact dura mother | Intact dura mater |
| fracture simple avec enfoncement | single fracture with draught | Simple depressed fracture |
| par enclouage à foyer ouvert ou fermé | by open or closed house | By open or closed intramedullary nailing |

Other wrong translations may remain. Whole-phrase medical qualifiers, negation, laterality, anatomical location, implants, inclusions/exclusions, combined procedures and supplements all require review. Fixing a short glossary term does not fix independently translated longer sentences containing it.

Recommended translation model:

1. Preserve the exact French source text and its immutable source reference.
2. Store a separate reviewed English preferred label, with translation status, reviewer, date and source edition.
3. Search both languages through the same procedure concept. Do not translate an English query into French with a generic model and assume an exact billing equivalence.
4. Require review when a translation changes numbers, time units, a code, negation, primary/revision status or an inclusion/exclusion.
5. Track field-level review. A reviewed short title does not establish that its conditions have been reviewed.
6. Keep the French source available and make unreviewed English status visible. Do not market this as fully clinically validated English/French coverage yet.

## Source hierarchy and notes: unresolved blocker

Imported row 07500 (“dure-mère intacte”) has the path:

```text
Fractures → arcade zygomatique → crâne → traitement opératoire → fracture simple avec enfoncement
```

Inspection of the captured original HTML shows “arcade zygomatique” and “crâne” as successive headings in the fracture table. The importer retained the earlier zygomatic heading as an ancestor of the skull branch. The parser relies on inferred indentation and mutable heading stacks; that is insufficient to establish every parent/child relationship.

Consequences include misleading breadcrumbs, wrong candidate matching and possible note leakage across adjacent groups. v3 previously needed a one-off removal of a fracture-treatment note inherited by surgeon time-code families. Removing one bad inherited note does not certify the remaining notes.

The `orthopedic` flag currently means the broad G musculoskeletal section; it also includes skull/face procedures. It is not a validated specialist-scope classification. Other specialty filters rely largely on visit headings and may miss clinically relevant shared procedures.

Before building learning on top of this data:

- Rebuild source parsing around explicit table groups, headings and row indentation; reset sibling context deterministically.
- Preserve source row HTML or an immutable excerpt/hash as evidence, separate from inferred ancestry.
- Compare parent/child chains and inherited conditions against representative original branches in every specialty.
- Test skull versus zygoma, primary versus revision, direct repair versus reconstruction, and supplement versus main procedure as negative cases.
- Track source edition, active/retired codes and changed conditions. Code identity alone is insufficient across editions.

## What to build next: reviewed physician vocabulary

Use this separation:

```text
Physician wording (English / French / shorthand)
    → clinical procedure concept
    → anatomical and technical modifiers
    → valid RAMQ candidate rows for the source edition
    → targeted question if a billing distinction is missing
```

A synonym normally identifies a clinical meaning or procedure family. It must not bypass technique or eligibility distinctions to force one preferred billing code.

### Data files

| File | Purpose |
| --- | --- |
| procedure_concepts.json | Stable clinical concepts, anatomy, technique, preferred EN/FR labels and review status |
| approved_synonyms.json | Reviewed phrases and abbreviations pointing to those concepts; versioned and edition-linked |
| ramq_mappings.json | Source-backed candidate row IDs, conditions, primary/supplement classification and active dates |
| translations.json | Field-level reviewed English labels and conditions with exact French originals |
| physician_aliases.json | Optional personal wording overrides, scoped to one physician and the same concepts |
| evaluation_cases.json | Queries, correct candidate sets, forbidden codes and required clarification cases |

The attached `procedure_vocabulary.template.json` illustrates a record. `physician_terms_template.csv` is a worksheet for collecting terms. All supplied examples are marked draft. **The current application does not load these templates; uploading them alone will not make it learn.** An importer, schema validator, review screen and runtime vocabulary loader are the next implementation work.

### Physician interaction

1. Physician types a phrase and reviews candidates.
2. Offer “This is what I meant” or “Teach this term” after a deliberate procedure selection, not after an incidental click or clipboard action.
3. Capture the phrase, selected concept, body region, technique and unresolved modifiers. Offer a personal alias separately from a shared suggestion.
4. If two concepts or techniques fit, ask one targeted question. Do not hide ambiguity with a high confidence score.
5. Save the shared suggestion as pending. A qualified reviewer checks its clinical meaning and RAMQ source relationship.
6. Approval creates a versioned mapping and regression examples. Retain author/reviewer provenance, revocation and rollback.
7. Publish the approved vocabulary version; clients reload that version. Revalidate affected mappings when RAMQ changes.

Never learn a billing association merely because a user clicked or copied it. Those actions may represent comparison, error or existing miscoding. Multiple physicians repeating a mistaken code does not make the mapping valid. Do not use reimbursement amount to determine relevance.

### Improving recall without inventing billing facts

- Start with physician-supplied lists of the most frequent procedures in the intended practice; review the top 100–200 as an initial bounded set rather than promising all specialties.
- Include bilingual abbreviations, eponyms, implant names, spelling variants and ordinary procedure descriptions. Implant terminology is a modifier and may not determine the entire procedure.
- Add controlled spelling suggestions. Show the proposed correction rather than silently rewriting clinically meaningful terms.
- Optional semantic retrieval can retrieve/rank existing concepts. Candidate generation must stay within the validated source index and respect exclusions.
- An LLM can help propose synonyms or extract modifiers for review. It should not generate RAMQ codes, rewrite billing conditions or auto-approve a new mapping.
- SNOMED CT’s concept/description model is a useful reference for language-specific preferred terms and acceptable synonyms. It is not an automatic SNOMED-to-RAMQ billing crosswalk. Confirm rights before importing terminology content.

### Static sharing versus continuous shared learning

The least complex first version can remain on GitHub Pages. Add a vocabulary loader, collect suggestions with a local export, review the exported records, and commit an approved JSON vocabulary update. This is reviewed incremental updating, not real-time learning.

For a shared suggestion queue, multiple physician accounts, central review and audit history, add an authenticated API and a database. GitHub Pages hosts static files; it does not supply this application backend. Do not put repository write tokens or administrator secrets into browser JavaScript. Protect reviewer actions on the server.

An optional personal dictionary can be stored locally and exported/imported, but it will not follow a physician to another device without synchronization and may be lost if browser data is cleared. Keep shared mappings independent of one physician’s preferences.

Store only the minimum generic procedure phrase needed for vocabulary improvement. Do not record patient names, identifiers, dates, copied operative reports or full encounter narratives. Logging must be opt-in and deletable; raw search text is not automatically safe to collect merely because the search box says “no patient information.”

## Evaluation and release gates

Build a clinician-reviewed test set from real, de-identified procedure vocabulary and reserve an unseen portion for evaluation. Version it with the manual. Measure:

- Recall of the correct concept/candidate within the first few results.
- Incorrect single-code suggestions and clinically meaningful false positives.
- No-match and clarification rates, separately for English/French and each specialty.
- Repair versus reconstruction, primary versus revision, side/site qualifiers, and primary versus supplement distinctions.
- Whether the source conditions and translations agree, not merely whether strings are populated.
- Stability after each approved alias update, including contradictory aliases and intentional misuse.

Do not convert the 41 exploratory cases or passing regression checks into an accuracy percentage. Do not describe ranking scores as calibrated probabilities of billing correctness. Prioritize eliminating dangerous false positives over always returning a code.

Recommended order: repair/validate source hierarchy → review translations for the initial orthopedic scope → add a versioned concept/synonym loader → collect explicit physician feedback → review and publish vocabulary updates → add shared-account infrastructure if needed. Full model fine-tuning is unnecessary for the first useful learning version.

## References

- [RAMQ specialist manual](https://www.ramq.gouv.qc.ca/fr/professionnels/medecin-specialiste/manuels-guides/manuel-remuneration-acte)
- [SNOMED CT logical model: concepts and synonyms](https://docs.snomed.org/snomed-ct-practical-guides/snomed-ct-starter-guide/5-snomed-ct-logical-model)
- [SNOMED CT translation guide](https://docs.snomed.org/snomed-ct-practical-guides/snomed-ct-translation-guide/3-snomed-ct-as-a-health-terminology)
- [GitHub Pages: static website hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
