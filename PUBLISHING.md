# Publishing and maintaining RAMQ Code Navigator

Maintainer documentation. For the user guide, see [README.md](README.md).

## Website and sharing link

This repository is ready for GitHub Pages. **The project is published at https://larichiu.github.io/ramq-code-navigator/.** After you upload it and enable Pages, GitHub will display your actual website URL in **Settings → Pages → Visit site**.

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

Send the `downloads/RAMQ_Navigator_v3.2.html` file together with `LICENCE.txt` and this README, or distribute the separately supplied `RAMQ_Navigator_v3.2.zip`.

Recipients save and open the HTML file in a modern browser. Its code and manual index are embedded, so searches can work without a server. Official RAMQ links require internet. Clipboard support for a locally opened file varies by browser; use the hosted HTTPS version for the most consistent experience.

Each standalone copy is a snapshot. You must send a new file when the application or manual index changes. A website link is easier to maintain for a group.

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

