# singlecell-si

A single-page static website about hosting complex biological models and reproducible AI-driven research.

Edit `index.html` to update the copy, styles, and inline vector background. No build tools or external dependencies are needed. `.nojekyll` lets GitHub Pages serve the HTML directly.

## GitHub Pages

In repository **Settings → Pages**, select **Deploy from a branch**, then **main** and **/(root)**. GitHub Free requires a public repository for Pages; private repository hosting requires a supported paid plan.

## Connect an INWX domain

Replace `example.com` below with your domain. These steps assume INWX hosts its authoritative DNS; otherwise add the records at your current DNS provider.

1. In your personal GitHub **Settings → Pages → Add a domain**, enter `example.com`. Copy the TXT record GitHub supplies.
2. Log in to INWX, open **Nameserver**, find your domain, and open its DNS records using the eye/edit control. Choose **Add DNS Record**, add GitHub’s TXT name and value, and save. Return to GitHub and click **Verify**. Retain the TXT record after verification.
3. In this repository’s **Settings → Pages → Custom domain**, enter `example.com` and save. Do this before pointing the website DNS records at GitHub. Branch publishing creates a `CNAME` file in the repository; pull that change before your next local edit.
4. In the same INWX DNS zone, add these records. Use the empty/root Name field for the bare domain (`@` if accepted), and a TTL of 3600 seconds.

| Name | Type | Value |
| --- | --- | --- |
| root / empty | A | 185.199.108.153 |
| root / empty | A | 185.199.109.153 |
| root / empty | A | 185.199.110.153 |
| root / empty | A | 185.199.111.153 |
| www | CNAME | tobiaspk.github.io. |

Replace conflicting website A/AAAA records or a conflicting `www` record. Keep unrelated records, including email MX and TXT records. Do not include `https://` or `/singlecell-si` in the CNAME value.

5. Allow DNS to propagate, then return to the repository’s **Settings → Pages**. Once GitHub’s DNS check and certificate provisioning finish, enable **Enforce HTTPS**. This can take up to 24 hours. Test both `https://example.com` and `https://www.example.com`; GitHub redirects the latter to the chosen bare domain.

Sources: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [INWX DNS editor instructions](https://www.inwx.com/en/blog/domain-as-a-bluesky-handle).
