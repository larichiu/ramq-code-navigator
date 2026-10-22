# RAMQ Code Navigator

**Find a service code. Browse the manual. Open its source.**

### [Open RAMQ Code Navigator ↗](https://larichiu.github.io/ramq-code-navigator/)

Created by **L. Chiu**. An independent interface for exploring codes in RAMQ’s specialist fee-for-service manual, with orthopedic shortcuts and access to the other indexed specialty headings. It works in a browser on a phone, tablet or computer; no installation or account is needed to use the website.

## Search for a procedure

Type a procedure, body part, supported abbreviation or five-digit code, then select **Find codes** or press Enter.

Examples: `ankle fracture`, `bimalleolar ankle ORIF`, `ORIF distal radius`, `TKA`, `THA`, `RTSA` or `carpal tunnel release`.

Each result puts the **code and procedure description** first. Click the code to copy it. Different techniques, revisions and supplements may appear as separate candidates.

![Simple search with a procedure result and click-to-copy code](navigator-search.png)

Search recognizes a defined set of English/French terms and abbreviations. It does not understand every colloquial name or learn new terms automatically. If a phrase finds nothing, try the anatomical browser, advanced fields or the official code. A query with recognized negation or contradictory procedure/code information asks for clarification instead of silently ignoring the difference.

## Browse by body part

Select **Browse by body part** to expand the anatomical browser. It starts collapsed to keep the search area clear. Select a region, then a named body part or a point on the diagram. **Pelvis** and **Spinal column** are separate options.

Select the heading again to collapse it. This browser is orthopedic and switches the specialty filter to orthopedics.

![Expanded anatomical browser with separate pelvis and spinal-column options](navigator-anatomy.png)

## Use advanced fields

Choose **Advanced fields** and select a manual section. Each selection reveals the next level in the indexed RAMQ hierarchy. Continue through the available region, body part, category and subtype fields, then choose a specific procedure. Use **Reset fields** to start again.

Orthopedics appears first in the specialty selector. Choose another indexed specialty, or **All specialties** for a broader search. The filters follow the manual’s headings, so a shared procedure may be classified outside the specialty you expect.

## Read notes and check the source

Expand **Notes & conditions** beneath a result to view the manual path, conditions and original French wording. Select **Source** for the source popup, or the RAMQ link to open the indexed source location.

![Source popup with the original French wording and RAMQ source link](navigator-source.png)

## Find orthopedic surgeon time codes

Select **Orthopedic surgeon time codes**, choose the relevant surgery family and enter hours/minutes of **total anesthesia duration**. Leave the duration empty to see all bands.

These are surgeon code families with eligibility conditions, not a general conversion of anesthesia units into minutes. Read the family’s linked conditions; duration alone does not determine eligibility. Pediatric and program-specific restrictions apply to some codes.

## Language, appearance and layout

Use **EN / FR** to change language, **Phone / Tablet / Desktop** to choose the layout, and the bottom-right control to switch light/dark mode. These preferences are saved in your browser.

## Current limits

**Version 3.2 · manual snapshot: October 15, 2026.**

This is a navigation prototype, not an official RAMQ application or a validated autonomous billing-code selector. The data does not refresh automatically. Known vocabulary gaps, imported hierarchy errors and unreviewed translations remain. English medical descriptions and conditions are **not fully clinically reviewed**; consult the original RAMQ source when meaning or eligibility is uncertain.

No claims are submitted by this application. Search runs in your browser; do not enter patient names, identifiers or confidential clinical details.

See the [audit and improvement plan](AUDIT_AND_LEARNING_PLAN.md) for specific known failures. To report an issue, use [GitHub Issues](https://github.com/larichiu/ramq-code-navigator/issues) and include the generic search phrase, relevant code and source reference—without patient information.

## Credit and licence

Originally created by **L. Chiu**. Copyright (c) 2026 Chiu. The original software is available under the [MIT License](LICENCE.txt), permitting free use and further development while preserving the copyright and licence notices. RAMQ source material retains its own rights and terms; no RAMQ endorsement is claimed.

Maintainers can find publishing and development instructions in [PUBLISHING.md](PUBLISHING.md).
