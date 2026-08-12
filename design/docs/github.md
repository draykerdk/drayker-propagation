repo: draykerdk/drayker.org
branch: master

Related repos read for content: draykerdk/dfmp

## Last sync
date: 2026-08-11T02:47:28Z

### Updated in this project
- **The forum became its own site**, not a page of the portal: `Drayker Forum.dc.html`, a complete standalone Design Component to be published from the existing `draykerdk/general-forum` repository on GitHub Pages at **forum.drayker.org**. Its own header, navigation, routes and footer, in the same design system.
- Its routes are its own: `#/` every thread · `#/t/<repo>/<number>` one thread (a shareable public address, so a discussion can be linked from a README or a paper) · `#/new` · `#/decisions` · `#/routing` · `#/about`. A deep link to a thread outside the loaded list fetches that issue on its own.
- Reads `org:draykerdk is:issue` (open and closed, with bodies) and `org:draykerdk is:pr is:merged`, unauthenticated, cached 30 min in `localStorage`, preferring a committed `data/forum.json` snapshot. Comments are fetched only when a thread is opened, once per session. Thread types come from the organization's own labels. Nothing is invented when there is nothing published.
- Body and replies are converted from Markdown into **text blocks, never HTML**. Public input is not injected into the page.
- Composer opens a prefilled issue **in the repository that owns the subject**, following the routing table published in the `general-forum` README. The site transmits, stores and asks nothing.
- The mark uses the rotating Earth from `Drayker Logo Variations.html` (variation 1d, "Terra brasa"): the brand sphere with real coastlines cut into it in negative, over the same physics-driven ring and shadow wedge as the portal. d3 + topojson only draw the coastline path. If they fail to load, the mark stays the plain sphere.
- **Portal cleaned up**: the forum page built earlier inside `Drayker v3.dc.html` was removed entirely (template, logic and data model), the GitHub cache key went back to `drayker-gh-v1`, and the `Forum` item in both navigations now crosses to `forum.drayker.org`. No forum content is duplicated between the two sites.
- Publish handoff in `handoff/forum-site/`: `PUBLICAR.md` (copy to `index.html` in `general-forum`, CNAME, Pages, DNS, snapshot, proposal form), `CNAME`, and `forum-snapshot.yml`. A nightly `gh api` + `jq` job that commits `data/forum.json` in the exact shape the site consumes.
- `handoff/general-forum-proposal.yml` specifies the `proposal.yml` issue form (fields `summary`, `change`, `component`, plus optional smallest step and strongest argument against). Until it is published the composer writes a plain prefilled issue, which works in every repository.

### Previously in this project (2026-08-10T12:55Z)
- Verification pass, no content change: the published `index.html` on `draykerdk/drayker.org@master` is byte-identical to `design/Drayker v3.dc.html`, and `draykerdk/drayker.com` carries its generated `index.html`. Both surfaces are live from package 3.0.
- Pulled the deployed copy back into the design project: the local `Drayker v3.dc.html` was 313 bytes behind (launch-state wording on DAF / drayker.com canonical, plus the production favicon links). Local file is now byte-identical to the published `index.html` (357568 bytes), including the full favicon set, and root `favicon.ico` was copied in so no reference is missing locally. `github.md` and `V3-HANDOFF.md` re-synced from the repository.
- **The system on one screen** (both homes): the twenty parts, the seventeen repositories plus the three no-repository concepts, placed in their six layers. Each card carries the standing its own contract declares and opens the part's page, the case page on `.com`, the technical page on `.org`. Built from `CASE_LAYERS` / `CASE_LAYER_OF`, so the map cannot drift from the layer argument above it.
- **What blocks what** (`.org` home): pick any part and the page computes, from the dependencies declared in the contracts, which upstream parts are not running yet. Each shows the gap its own page states, with a click through to it. Chains are bounded to three hops and a part is never its own blocker. When nothing upstream blocks it, the page says the missing work is inside it.
- **Vocabulary** (Docs, both sites): eighteen terms. DFM, DFMP, Dk, BSDK, LCrypt, UID, OSDK, DAF, DAO/DAC, federative points, councils, value unit, open function, component contract, Dknowledge and the rest. Each defined from what the repositories actually say, and each stating where the specification is still missing. Linked from the layers section on both homes.
- **One real issue, walked through the live flow** (DFM page): the six GitHub steps bound to an actual open issue from `org:draykerdk` (preferring the `open-function` label), with its repository, number, branch name and pull-request base spelled out. Honest fallbacks when the API is unreachable or nothing is open. No invented issue.
- **New Dknowledge page** at `#com/knowledge` · `#org/knowledge`, in the nav of both sites: the knowledge layer argued as a network rather than a wiki. The brain of the system, the place it thinks from. Six node types (requirement, motion, contract, decision, term, record) with where each lives today, seven edge types, and a five-level trust scale (T0 SOURCE → T4 EMPTY) shown explicitly as **proposed, not yet specified**, because nothing in the repository defines it. Levels are evidence statements, never maturity badges.
- The page's inventory is the repository as actually read: the 17 contracts, `CURRENT.md`, the papers index, the **sixteen papers that are titles only** (dk 8 · ecosystem 7 · organization 1, files of 7–130 bytes), the historical roadmap and the PT/ES translations that trail English. Filterable by trust level, each row linking to the real file. The empty ones are presented as the opening.
- `DKNOWLEDGE-DESIGN.md` added for the agent doing the internal static work: an opening instruction to read Drayker's own extensive internal material first and let it override the proposed model where it is richer (keeping page and repository from diverging), then the front-matter node schema, trust computed as a pure function of evidence, `tools/build-graph.js` emitting `data/graph.json` · `trust.json` · `openings.json` committed by an Action, CI validation rules, implementation order, and what stays out of scope.
- **Layers back to four, with the real definitions**: 01 DFM as one method in its versions (organization, engineering, architecture, A.I. agents) · 02 Dk as the whole technological system (kernel, base structure, network, cryptography, identity, intelligence, devices) · 03 organization and resources held distributed, transparent and intelligent · 04 **transition and emergence**, what is actually being built with available resources. The DAF, the organization running on GitHub, the public sites and knowledge base, on the way to an evolutionary platform of its own. The short-lived identity/network/what-it-serves split was folded back in. `CASE_LAYERS` and `CASE_LAYER_OF` now carry these four ids and the twenty parts distribute across them (7 method-and-system reads unchanged elsewhere).
- The layers section now states the thesis before the list: Drayker as a **collective intelligence integrated with artificial intelligence**. People, teams and agents deliver inside one structure, neither supervising the other, with the six layers presented as what that requires. The method card says a person and an agent claim a function on identical terms.
- `.org` hero title rewritten: "Nobody hands out the work. You take the piece you can finish." The old line described the problem's size instead of the invitation.
- **SEO per route**: new `ROUTE_META` table (title + description for every route) and `setMeta()`, applied on each route change. `<title>`, description, canonical, `og:title` / `og:description` / `og:url` now follow the page instead of describing the whole site once. The twenty component routes are documents in their own right: title from the part's name and tagline, description from its vision (from the `.com` pitch claim on the institutional domain), so no two routes share a head. Verified live on `#org/knowledge`, `#org/project/uid` and `#org/project/valueunit`.
- **`tools/prerender.js`** (handoff, no dependencies): emits one real HTML document per route, `./knowledge/index.html`, `./project/<key>/index.html`, and so on, reading `ROUTE_META` and the part records (name, tagline, vision) out of the built `index.html` so there is a single source of truth and each prerendered document, including its `<noscript>` heading, names its own part. Rewrites head metadata per copy, injects a readable `<noscript>` with links to every route, fixes relative asset depth, boots the component into the right hash, and writes `sitemap.xml`. The hash routes the READMEs depend on are untouched.
- **`.github/workflows/org-snapshot.yml`** (handoff): nightly `gh api` + `jq` job that commits `data/org.json` (repos, open issues, contributors) in the exact shape the component consumes. `loadGH()` now prefers that snapshot, lets the live API only refresh it, and keeps the snapshot on screen when the API fails instead of falling to the error state. The curated content stays the last resort. The 30-minute `localStorage` cache still sits in front of both.
- **`INFRA-HANDOFF.md`** documents both, with the publish order and what was deliberately left out (per-route `og:image`, render-check rules for the new pieces).
- The ten-step Volunteer flow test was run by another agent in a separate session. The result was not written into this package. Nothing else from this turn is open.
- **Not yet published**: everything above lives in `Drayker v3.dc.html` in this design project only. `draykerdk/drayker.org@master` still serves the previous `index.html`, and `drayker.com` its generated copy. The publish step (copy the component to `index.html`, regenerate `.com` with `tools/make-com.js`, run `tools/render-check.js`) needs push access.

### Previously in this project (2026-08-10T11:23Z)
- Integrated the package 3.0 Design Component as the published `index.html` and preserved the identical v3 source under `design/`. The React/Vinext approximation is not used.
- Reconciled launch-state copy with the live deployment: `drayker.com` is canonical and indexable, while DAF, its contract, federative points and voting remain explicitly proposed rather than operational.
- Removed the obsolete repository-local volunteer form so introductions and partnership proposals have one public intake in `general-forum`. Aligned the local open-function review field with the founding-phase Git flow.
- Updated the generator metadata, project instructions and static regression suite for Archivo, twenty `.com` cases, technical deep links, honest offline states and both real issue forms.
- **drayker.com now has its own component pages** at `#com/project/<key>`. The case for each of the 20 parts, written for a reader deciding whether the idea is worth anything: `HOW IT WORKS TODAY` vs `WHAT THIS CHANGES`, `WHERE YOU WOULD NOTICE IT`, `WHY THE REST DEPENDS ON IT`, which of the four layers (plus public surface) it belongs to and why that layer exists, and `IT NEEDS` / `WHAT NEEDS IT` chips that open sibling `.com` pages. New `PITCH`, `CASE_LAYERS`, `CASE_LAYER_OF` and `CASE_STANDING` tables. No vision, architecture, contract or issue text is duplicated from the portal.
- Standing on the `.com` page is derived from the published contract level, never hand-written: `WRITTEN, NOT BUILT` / `RUNNING TODAY`, and `NOT WRITTEN YET` for the three parts with no repository.
- **Deep links instead of duplication**: `THE TECHNICAL RECORD` on each `.com` page opens the exact section of the portal page, `#org/project/<key>/arch`, `/open`, `/map`, `/contract` (contract card omitted for the three concepts). The portal sections carry `data-focus` anchors and the router scrolls to them with a header offset. Ecosystem cards on `.com` changed from `FULL PAGE ON DRAYKER.ORG` to `What it changes →`.
- `#org/project/<key>` and every other README route are unchanged. `.com` and `.org` now resolve the same key to different questions.
### Previously in this project (2026-08-10T07:06Z)
- Component pages restructured into three explicit tiers a reader can fold: **01 IN ONE SENTENCE** (a new jargon-free sentence written for all 20 parts), **02 WHY IT EXISTS** (vision, problem, role, relations, what is open, sources, neighbourhood map) and **03 THE ARCHITECTURE** (component contract, architecture, open issues). Tier 01 is always open. Tiers 02 and 03 toggle from a rail at the top that also shows the reading-trail position.
- **WHERE IT SITS**: a per-page neighbourhood map. The component at the centre, what it needs on the left, what needs it on the right, computed from the declared dependencies (and from a small `CONCEPT_DEPS` table for the three parts with no contract), every node clickable. Components with no declared dependency in either direction say so.
- **ARCHITECTURE became didactic**: each of the 79 architecture labels now expands to an explanation of what it means and why it is there (`ARCH_NOTES`, index-aligned per component). Labels alone taught nothing.
- **Reading trail** across all twenty pages (`TRAIL`): method → what it is used to design → how it would be governed → public surfaces, with step position, previous/next cards and an explicit way to leave the trail.
- Home rewritten to carry the thesis instead of a slogan. `.com` hero: "Intelligence stops being the bottleneck. Organization becomes it." (kicker: FOR THE AGE OF SUPERINTELLIGENCE), with a body that names the concentration problem directly. `.org` hero keeps the concrete invitation and gains the same premise in one sentence.
- New **WHY NOW** section on both homes: machine intelligence as the productive force of the century, the historical pattern of every leap being absorbed and concentrated by existing organizations, and the alternative. Work anyone can finish, decisions anyone can audit, resources following delivery, with intelligence integrated symbiotically into life and work rather than sitting above them, amplifying latent human capacity. Closes by naming the distance between what is written and what runs.
- Three layers → **four layers**: DFM (method) · Dk (kernel) · Organization & resources (federation, weight from delivered work, value unit) · Ecosystem. Resource distribution is now a pillar of the front door instead of a footnote in the proof strip. Kernel and ecosystem card copy rewritten off jargon lists.
- Manifesto gained the era paragraph. The Dk page hero states the substrate is meant to be inhabited, not operated.
- New organization-wide structure picked up from GitHub: every repository now publishes a **public component contract** at `.drayker/component.yml`, validated on every pull request by the shared workflow `draykerdk/.github/.github/workflows/validate-component.yml` against `schema/component.schema.json`. All 17 contracts were read verbatim and are now the spine of every project page.
- Project pages (`#org/project/<key>`) gained a **PUBLIC COMPONENT CONTRACT** section: declared problem, IN SCOPE / NOT IN SCOPE, implementation level with its own scope sentence, linked evidence (document / deployment / test / usage), DEPENDS ON as chips that open the dependency's page, WHAT COULD BE MISREAD (the contract's risks), contributions entrypoint, source of truth, last-reviewed date, and a link to the contract file and the schema.
- Implementation level is rendered as evidence language, never as a maturity badge: `none` → "NO IMPLEMENTATION PUBLISHED", `operational` → "OPERATIONAL · WITHIN THE SCOPE BELOW". Five components are operational per their own contracts (drayker.org, drayker.com, drayker-theme, dknowledge, general-forum). The other twelve declare no implementation.
- The three no-repository concepts (`dsupport`, `openscience`, `valueunit`) get a **NO COMPONENT CONTRACT YET** block instead of an implied one, with the schema linked as the list of questions a first document has to answer.
- Ecosystem cards now carry the declared artifact type beside the layer (KERNEL · ARCHITECTURE, ORGANIZATION · GOVERNANCE PROPOSAL, PORTAL · PORTAL…), read from the same contracts.
- Project pages no longer depend on the GitHub API for their own repository links: repo URL, issues URL, evidence and contract links are derived from the curated key, so the page is complete with the network off.
- Volunteer CTA re-pointed at the real intake: `general-forum/issues/new?template=volunteer-introduction.yml`, prefilling that form's `interests`, `contribution` and `starting_point` fields (the dropdown option is chosen from the matched track). The old `drayker.org/volunteer.yml` form is no longer used by the site.
- Partnership CTA is wired to the real form that now exists: `general-forum/issues/new?template=partnership.yml`, prefilling `proposal` and `boundaries`. The remaining pendency from the previous sync is closed.
- Label map rewritten from `draykerdk/.github/labels.yml`: `open-function`, `motion`, `claimed`, `needs-review` (real name), `good first issue`, `help wanted`, `documentation`, `volunteer-introduction`, `partnership`, plus the `skill:` / `level:` / `effort:` families and what `effort:large` means.
- Contribution guide step 06 now states the founding-phase rule as written in `GOVERNANCE.md`: no approval count is required, and who may merge directly, with the limits, is in that file. New "The rules are files" block links CONTRIBUTING.md, GOVERNANCE.md and component.schema.json. No individual is named anywhere on the site.
- Organization page gained an `IN WRITING` card linking GOVERNANCE.md. Docs gained a `PER REPOSITORY` card explaining the component contract and pointing at the component list.

### Previously in this project
- Re-read the repository at tree `8a16ca9387f0`: `index.html` unchanged (blob `dcc154b79886`, the v3 base).
- Copy register raised across every page title. Cross-domain routing fixed so `project/<key>`, `contrib/<tab>`, `fn` and `join` survive the `.com` → `.org` handoff.
- `Drayker v3.dc.html` created from the deployed `index.html` (not from the local v2). v2 kept untouched as history. Handoff notes in `V3-HANDOFF.md`.
- Typography moved to Archivo (400/500/600/700). JetBrains Mono still only on technical labels. Mark, colours, grid, cards and animations untouched.
- New institutional route `#com/partnerships`. `.org` links cross to it instead of duplicating it.
- DFM page split into the five-move method and "Today, on GitHub" (issue → claim → branch → pull request to master → checks → merge). `community-review` removed site-wide.
- Claims contextualised across the site and the stage disclaimer added after the vision on both homes and on the partnerships page.
- Volunteer flow ends in a review card plus "Review my introduction on GitHub". No email asked.
- The ten fictional `FN-01xx` rows were deleted from markup and data model. The board shows loading / unreachable / nothing-published / no-match states.
- Project pages gained ROLE IN THE SYSTEM, RELATIONS and PUBLIC SOURCES for all 17 repositories and the 3 no-repository concepts.
- Organization rewritten around the founding phase. Docs rewritten around Dknowledge, split into current / historical / not written yet.
- Management status removed from the public layer (badges, status dots, NOW/NEXT/DONE/LATER rails) in markup *and* data model. Declared gaps kept as prose under `WHAT IS OPEN`.
- Guided volunteer journey, personalised org map over the 17 repos, curated GitHub fallback cached 30 min, hash routes for the README link contract, real board label `open-function`.

## Sync history
### 2026-08-10T02:26:12Z
- v3 created from production `index.html`. Archivo typography. `#com/partnerships`. DFM split. Volunteer flow rewritten. Fictional board rows removed. ROLE / RELATIONS / PUBLIC SOURCES added to project pages.

### 2026-08-05T09:46:26Z
- Copy pass across all pages: tightened hero, manifesto, DFM, Dk, ecosystem, organization descriptions against original READMEs.

### 2026-08-05T02:54:16Z
- Built the full Drayker site as a single Design Component (`Drayker.dc.html`), covering drayker.com and drayker.org from one visual system with a .com/.org switch.
- Content grounded in the drayker.org and dfmp READMEs plus the public docs subdomains (bsdk, dknetwork, lc, dfmp).

## Screen map
| Screen | Built from |
| --- | --- |
| Partnerships (.com) | curated. Funding and partnership brief, no repo source |
| Home (.com / .org) | drayker.org README.md, drayker.com hero copy |
| Manifesto | drayker.com "about" copy, dfmp README principles |
| DFM Protocol | draykerdk/dfmp README.md, dfmpp/README.md |
| Dk | drayker.com/dk, bsdk.drayker.org, lc.drayker.org, dknetwork.drayker.org |
| Ecosystem | draykerdk repo list (bsdk, daf, uid, metadfmp, emergence-initiative) |
| Organization | drayker.org README.md (DFMP + DAF), draykerdk/daf |
| Contribute · Overview | GitHub API: orgs/draykerdk repos, contributors |
| Contribute · Tracks | curated. Volunteer tracks, not repo-derived |
| Contribute · Projects | READMEs of all 17 draykerdk repos + live GitHub API repo data |
| Contribute · Open functions | GitHub API issue search (org:draykerdk is:issue is:open) |
| Contribute · Guide | draykerdk/.github CONTRIBUTING.md + GOVERNANCE.md + labels.yml |
| Contribute · Join (wizard + map) | curated. Questionnaire logic and track match, mapped onto the 17 draykerdk repos |
| Docs | doc subdomains + github.com/draykerdk + .drayker/component.yml |
| Dknowledge (knowledge layer) | draykerdk/dknowledge README.md · CURRENT.md · papers/ and roadmap/ trees read file-by-file · .drayker/component.yml |
| Component page · the case (.com) | curated. Practical case per part, derived from the same contracts and READMEs, no repo copy duplicated |
| Project page · contract block | `.drayker/component.yml` of each of the 17 repositories (schema in draykerdk/.github) |
| Volunteer intake CTA | general-forum/.github/ISSUE_TEMPLATE/volunteer-introduction.yml |
| Forum site (forum.drayker.org) | GitHub search API (`org:draykerdk is:issue`, `is:pr is:merged`), per-thread comments API, draykerdk/general-forum README.md routing table + .github/labels.yml |
| Partnership CTA | general-forum/.github/ISSUE_TEMPLATE/partnership.yml |
