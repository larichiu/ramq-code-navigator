# RAMQ Code Navigator

**Find the service code you need. Trace it straight to the source.**

RAMQ Code Navigator is an independent, browser-based interface for exploring medical service codes in the RAMQ specialist fee-for-service manual. Created by **L. Chiu**, it combines a compact search box, anatomy browsing and step-by-step navigation through the manual’s hierarchy.

The interface gives priority to orthopedic workflows while retaining access to the other indexed specialty headings. It is intended to make the manual easier to navigate. It is not an official RAMQ application, a clinical decision tool, or a guarantee that a billing code is eligible for a particular case.

**Version:** v3  
**Manual snapshot:** October 15, 2026  
**Original software:** Copyright (c) 2026 Chiu · [MIT License](LICENCE.txt)

## Website and sharing link

This repository is ready for GitHub Pages. **A public website has not yet been deployed from this package.** After you upload it and enable Pages, GitHub will display your actual website URL in **Settings → Pages → Visit site**.

With a repository named `ramq-code-navigator`, the usual address is:

```text
https://larichiu.github.io/ramq-code-navigator/
```

A link beginning with `localhost` or `127.0.0.1` only points to the computer on which it is opened. Sending that development link to colleagues will not give them access to your copy.

## Publish on GitHub Pages: no coding required

1. Extract `RAMQ_GitHub_Ready.zip` on your computer.
2. Sign in to [GitHub](https://github.com/) and [create a repository](https://github.com/new) named `ramq-code-navigator`. For the free Pages route, make the repository **Public**. The package already contains a README and licence, so you do not need GitHub to generate them.
3. In the repository, choose **Add file → Upload files**. Upload the extracted contents, including the `downloads` and `tests` folders. Upload the files themselves, not the ZIP or an extra enclosing folder. Commit the upload to `main`.
4. Check that `index.html`, `app.js`, `search.js`, `style.css`, `data.json`, `README.md` and `LICENCE.txt` appear at the repository’s top level. Keep the supplied `.nojekyll` file if your upload method includes hidden files; it disables the unnecessary Jekyll build step.
5. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Choose branch **main** and folder **/(root)**, then save.
6. Wait for the deployment to finish, return to **Settings → Pages**, and use **Visit site**. Check the repository’s **Actions** tab if deployment fails.
7. Test a search and a body-part selection on the published site. Copy the actual Pages URL and send that URL to colleagues.

No npm installation, build command, API key, backend or database is required. The largest supplied file is below GitHub’s documented browser-upload size limit. GitHub Free supports Pages for public repositories; other account and organization policies may affect availability. Pages sites are normally public, so do not add private information to this repository.

GitHub’s instructions: [create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [upload files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository), and [configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Share with multiple people

### Recommended: send the published website URL

Everyone opens the same public URL on their phone, tablet or computer. They do not need a GitHub account. You do not need to leave your computer running. Multiple people can use the static website at the same time; searches run independently in each browser.

The application does not provide shared patient records, shared search history, user accounts or synchronized preferences. Each browser has its own layout, language and theme preferences.

To distribute updates, upload the revised files to the same repository and commit them. Pages republishes the site at the same address. A browser refresh may be necessary to see a new version.

### Alternative: send a standalone file

Send the `downloads/RAMQ_Navigator_v3.html` file together with `LICENCE.txt` and this README, or distribute the separately supplied `RAMQ_Navigator_v3.zip`.

Recipients save and open the HTML file in a modern browser. Its code and manual index are embedded, so searches can work without a server. Official RAMQ links require internet. Clipboard support for a locally opened file varies by browser; use the hosted HTTPS version for the most consistent experience.

Each standalone copy is a snapshot. You must send a new file when the application or manual index changes. A website link is easier to maintain for a group.

## What the application does

- **Simple search:** a compact text box for a procedure, body region, supported surgical abbreviation or five-digit service code.
- **Quick searches:** ankle fracture, orthopedic surgeon time codes and knee replacement.
- **Browse by body part:** upper extremities, lower extremities, **Pelvis** and **Spinal column** as separate choices. Body-map points and named buttons navigate to the corresponding entries.
- **Advanced fields:** dependent dropdowns follow the indexed RAMQ parent/child order. Selecting a parent reveals the next level, and a final procedure selector appears at the end of a branch.
- **Readable results:** the service code and contextual procedure description appear first. Surgical dollar values and anesthesia base-unit columns are omitted from the main cards.
- **Click to copy:** clicking a result’s code copies it. The browser may restrict clipboard access in some environments.
- **Notes and source:** expandable notes contain the manual path, conditions, original French wording, a source popup and a link to the indexed RAMQ anchor.
- **Specialties:** orthopedics is listed first, followed by All specialties and the other indexed specialty headings.
- **Language and layout:** English/French interface, phone/tablet/desktop layout controls and a light/dark toggle. A version mark appears at the bottom right.

## How to use it

### Find a procedure by name

1. Choose a specialty, or use **All specialties** if the procedure is classified elsewhere in the manual.
2. Type a supported term, such as `ankle fracture`, `ORIF distal radius`, `TKA`, `THA`, `RTSA`, `ACL reconstruction` or `carpal tunnel release`.
3. Click **Find codes**, or press Enter. Shift+Enter adds a line break.
4. Review the procedure variant and any supplement separately. Expand **Notes & conditions** when needed, or open the original source.
5. Click the desired code to copy it.

Search uses a defined bilingual vocabulary and matching rules. It does not use a live AI model and cannot infer every colloquial procedure name. An unrecognized term can return no results. Try a body-part name, a more specific procedure, a known code, or advanced navigation.

### Browse anatomically

Choose an anatomical region, then a named body part or a point on the body diagram. The application shows matching indexed procedure rows. **Pelvis** and **Spinal column** are distinct filters.

The anatomical browser is orthopedic. Using it switches the specialty to orthopedics. A whole-body browser for every medical specialty is not implemented.

### Navigate the manual hierarchy

Open **Advanced fields**, select a manual section, and continue through the source hierarchy. The available labels depend on the selected branch. Some branches have more subtypes than others. Choose a specific coded procedure at the final level, or leave the selector at All to see all matching variants.

Switching into advanced mode starts a fresh navigation sequence. **Reset fields** clears the sequence.

### Find orthopedic surgeon time codes

Use **Orthopedic surgeon time codes**, then choose the relevant family:

- Complex orthopedic surgery.
- Complex tumor or oncologic surgery.
- Surgical assistance within the specified national amputation/emergency microvascular revascularization program.

Enter hours and minutes of **total anesthesia duration** to filter the published time bands. Leave the inputs empty, or use **Show all time bands**, to view the full family.

These are surgeon time-based code families, not a conversion of anesthesia base units into surgical minutes. The assistance family is program-specific, not a general assistance fee. Code 18185 has designated pediatric-practice and patient-age conditions. Other eligibility rules also apply; duration alone does not determine entitlement.

At an exact boundary shared by adjacent published bands, the interface can show both. The open-ended “over 12 hours” band excludes exactly 12 hours. Consult the linked rule to resolve billing eligibility and boundaries rather than treating the filter as an automatic billing decision.

## Data, translations and practical limits

The index contains **5,679 imported source table rows**, including **888 musculoskeletal rows**. The orthopedic scope also includes visit rows explicitly headed Orthopedic surgery. These counts describe the imported snapshot, not a claim that every RAMQ rule or medical act has been comprehensively validated.

Source: [RAMQ specialist fee-for-service manual](https://www.ramq.gouv.qc.ca/fr/professionnels/medecin-specialiste/manuels-guides/manuel-remuneration-acte).

- **No automatic updates:** the manual was captured on October 15, 2026. Loading the website does not download current RAMQ changes.
- **English is not official wording:** English descriptions and notes include machine translations that have not all been clinically reviewed. Selected common labels and examples have manual corrections. The French source wording remains available. Do not assume all translations are clinically validated.
- **Hierarchy comes from an import:** context and notes are parsed from the source manual. Source links are provided to help inspect the original; a working interface does not establish that every imported association is correct.
- **Specialty filters follow source headings:** they are not a complete clinical cross-specialty classification. Procedures in shared anatomical sections may not appear under every clinically relevant specialty. Try All specialties when necessary.
- **Source links can change:** RAMQ can revise its page structure or anchors. A link may need updating after a manual revision.
- **No billing submission:** the application does not submit claims, determine remuneration, verify patient eligibility or connect to a RAMQ account.

## Privacy and technical operation

The application is static HTML, CSS and JavaScript. Search and filtering run in the browser against the downloaded JSON index. No external AI API or application backend receives the search text. The supplied app has no analytics integration or server-side search history.

Layout, language and theme preferences are stored in browser local storage. The host may maintain normal web-access logs. Opening an external RAMQ link connects the browser to RAMQ. Do not enter patient names, identifiers or other confidential clinical details in the search box.

A public GitHub Pages deployment does not provide access control. This project is designed to distribute a public manual-navigation tool, not confidential clinical material.

## Files in this repository

```text
index.html                         Website entry point
style.css                          Responsive grayscale styles and themes
app.js                             UI, navigation, results and source dialogs
search.js                          Search matching and supported terminology
data.json                         Imported manual snapshot and translations
LICENCE.txt                        MIT licence for original software
README.md                          Project and publishing documentation
SOURCE_INFO.json                   Snapshot date, counts and source references
.nojekyll                          Serve as a plain static site
.gitignore                         Common local files to exclude
tests/search.cjs                  Search-engine regression checks
downloads/RAMQ_Navigator_v3.html   Standalone offline application
```

`data.json` belongs in the repository root. No `node_modules`, credentials, local translation models or private workspace files are included.

## Local development

Edit the HTML, CSS and JavaScript directly. No framework build is needed. Serve the repository folder over HTTP so that `app.js` can fetch `data.json`:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/` on the same computer. Stop the server with Ctrl+C. Opening the multi-file `index.html` directly as a file can prevent JSON loading; use a local server or the standalone HTML file instead.

If Node.js is installed, run the included search checks:

```sh
node tests/search.cjs
```

The checks cover representative bilingual anatomy searches, supported spelling variants and surgical abbreviations, fracture versus hardware-removal matching, selected source-row references and duration-unit calculations. They are regression checks, not clinical certification or validation of every source row. The search module retains anesthesia-duration utilities from the earlier app; the main surgeon lookup uses the separate time families in the JSON index.

Browser checks performed during v3 development included source popup/notes expansion, copying a code and pasting it into the search field, pelvis/spinal-column navigation, cascading dropdowns, specialty selection, language/theme controls and a 4-hour-30-minute surgeon time-band lookup.

## Updating the manual or extending the software

When updating the index, retain each original code, title, hierarchy, note, source anchor and capture date. Review the parent/child context, especially shared headings and inherited notes. Revalidate time-code eligibility rules against the current RAMQ publication. Review medical translations before presenting them as verified.

Update `SOURCE_INFO.json`, the version mark and this README. Rerun the search checks and manually test representative UI flows. The standalone HTML embeds a separate copy of the code and data; changing the multi-file website does not update it automatically. Regenerate the standalone file or clearly identify its snapshot/version before sharing it.

This package contains the browser application and tests. It does not include a complete automated RAMQ refresh pipeline or the local machine-translation tooling used during development.

Contributions are welcome. Include a concrete example, the exact source reference and expected code when reporting search or import problems. Preserve the original copyright and licence notice when modifying or redistributing the software.

## Copyright, credit and licence

Copyright (c) 2026 Chiu.

Original project software is released under the [MIT License](LICENCE.txt). It permits use, copying, modification, further development, redistribution and sale, including commercial use, provided the copyright and permission notices are retained in copies or substantial portions of the software. It includes a warranty disclaimer.

Suggested credit: **RAMQ Code Navigator — originally created by Chiu, 2026.**

MIT requires preservation of the notices; it does not require a visible website credit, a link back, publication of modifications, or that redistributed copies be free of charge. A visible footer or About-page credit is appreciated. Contributors may add notices for their own contributions without removing the original notice.

The MIT grant applies only to original project material to the extent Chiu holds the rights. RAMQ manual text, codes, rules, schedules and other third-party material are not relicensed by this project. Their respective terms and rights remain applicable. No RAMQ endorsement or ownership of RAMQ content is claimed.

In Canada, eligible original works may receive copyright protection automatically when fixed in a material form. A notice or licence file is not government registration and does not establish ownership of third-party material. AI-assisted content can raise authorship questions. Keep dated source files and contribution records. Formal registration, if desired, is a separate application; this project has not filed one.

References: [MIT terms](https://opensource.org/license/mit), [CIPO copyright guidance](https://ised-isde.canada.ca/site/canadian-intellectual-property-office/en/what-you-should-know-about-copyright), [software IP guidance](https://www.ised-isde.canada.ca/site/canadian-intellectual-property-office/en/intellectual-property-rights-software-canada), and [copyright registration](https://ised-isde.canada.ca/site/canadian-intellectual-property-office/en/application-registration-copyright-work).

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Colleagues cannot open the localhost link | Publish with Pages and send the actual HTTPS website URL. |
| Pages shows a 404 | Confirm `index.html` is at the top level of the selected publishing folder and Pages is configured for `main` → `/(root)`. Check deployment status. |
| The site opens but the manual does not load | Confirm `data.json` is beside `index.html`, with the exact filename and case. Use HTTP/HTTPS or the standalone file. |
| The page is an old mockup | Use the repository’s current `index.html` and refresh the browser. Old preview tabs can retain old content. |
| Some anatomy selections seem missing | Choose the relevant region first. The anatomy browser switches to orthopedics; use All specialties for a broader source search. |
| A colloquial procedure name finds nothing | Use a supported abbreviation, anatomical term, exact code or advanced fields. Report the phrase with a source example. |
| English wording is unclear | Expand the original French wording and inspect the source. Report the translation with its code. |
| A copied code does not reach the clipboard | Try the hosted HTTPS site and allow clipboard access if the browser requests it. Local-file restrictions differ by browser. |
| A RAMQ link no longer reaches the row | Use the official manual and code, then update the source anchor in the index. |
| A change appears only in the website or only offline | The multi-file website and standalone download are separate artifacts; update both. |
