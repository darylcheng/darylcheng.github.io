# dc_splash

Personal splash page for Daryl Cheng — a single static `index.html`, no
build step, ready for GitHub Pages.

## Design

Typographic system follows Robert Bringhurst's *Elements of Typographic
Style*: a single harmonised baseline grid (`--baseline` in
`assets/css/style.css` drives every vertical measurement), a restrained
type scale, and emphasis handled with italics and true small capitals
rather than extra font weights. Set in **Alegreya Sans** (Regular,
Italic, Medium) and **Alegreya Sans SC** for the navigation. Fonts are
subsetted to Latin + common punctuation and self-hosted as woff2 under
`assets/fonts/` — no external font requests.

## Structure

```
index.html
assets/
  css/style.css
  fonts/            AlegreyaSans-*.woff2, AlegreyaSansSC-Regular.woff2
                     OFL-AlegreyaSans.txt, OFL-AlegreyaSansSC.txt (licence)
  img/avatar.jpg     GitHub avatar, resized small
  img/favicon.svg
```

## Local preview

Just open `index.html` in a browser, or serve it:

```sh
python3 -m http.server 8000
```

## Deploying to GitHub Pages

Live at **[darylcheng.net](https://darylcheng.net)**, served from
[`darylcheng/darylcheng.github.io`](https://github.com/darylcheng/darylcheng.github.io)
(`main` branch, root folder — GitHub Pages serves a repo with this
exact name automatically, no Pages config needed beyond enabling it
once in Settings).

To redeploy after edits:

```sh
git add -A
git commit -m "Update splash page"
git push
```

### Custom domain

`CNAME` in the repo root already contains `darylcheng.net`, which is
what tells GitHub Pages to serve this domain. At your registrar, DNS
should point at GitHub Pages:

- **Apex domain** (`darylcheng.net`): four `A` records to
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
  `185.199.111.153` (and `AAAA` records for IPv6 if supported).
- **`www` subdomain** (optional): a `CNAME` record pointing to
  `darylcheng.github.io`.

Once DNS has propagated, check **Settings → Pages** on GitHub shows
the domain verified, then enable "Enforce HTTPS" there.

## Updating content

Edit the text directly in `index.html` — name, subtitle, and the three
profile links (UCL, GitHub, ORCID) are all near the top of `<body>`.
The navigation labels are typed in lower case on purpose: the small
caps font renders them as small capitals automatically.
