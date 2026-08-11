# Deployment

The production site is intended to run at `https://propagation.drayker.org` from the repository `draykerdk/drayker-propagation`.

The repository contains `.github/workflows/deploy-pages.yml`. It validates the static site and then deploys the repository root through GitHub Pages whenever `master` changes. It does not need a build tool or a `CNAME` file.

## Required administrator actions

These actions require a repository administrator, maintainer, or a token with both **Administration: write** and **Pages: write** for the repository.

1. Rename `draykerdk/drayker-theme` to `draykerdk/drayker-propagation`.
2. Push or merge the Pages workflow into `master`.
3. In **Settings → Pages**, set the publishing source to **GitHub Actions**.
4. In the same Pages settings, save `propagation.drayker.org` as the custom domain.
5. Only after GitHub accepts that domain, create this DNS-only record in the `drayker.org` zone:

   | Type | Name | Target | Proxy |
   | --- | --- | --- | --- |
   | CNAME | `propagation` | `draykerdk.github.io` | DNS only |

6. Wait for GitHub Pages to approve the certificate, then enable **Enforce HTTPS**.

Creating the DNS record before GitHub Pages accepts the custom domain is intentionally avoided: it can expose an unclaimed subdomain to takeover.

## API equivalent

With an authenticated GitHub CLI session that has the required organization permissions, the Pages setup can be completed after the rename with:

```sh
gh api --method POST repos/draykerdk/drayker-propagation/pages \
  -f build_type=workflow \
  -f 'source[branch]=master' \
  -f 'source[path]=/'

gh api --method PUT repos/draykerdk/drayker-propagation/pages \
  -f cname=propagation.drayker.org \
  -f build_type=workflow
```

After the DNS record resolves, verify the Pages site and its DNS health, then enforce HTTPS:

```sh
gh api repos/draykerdk/drayker-propagation/pages
gh api repos/draykerdk/drayker-propagation/pages/health
gh api --method PUT repos/draykerdk/drayker-propagation/pages -F https_enforced=true
```
