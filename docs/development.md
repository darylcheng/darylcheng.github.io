# Development notes

Technical reference for building on, or redeploying, this site. (See
the root [README](../README.md) for what the site actually is.)

## Design

Typographic system follows Robert Bringhurst's *Elements of
Typographic Style*: a single harmonised baseline grid (`--baseline`
in `assets/css/style.css` drives every vertical measurement), a
restrained type scale, and emphasis handled with italics and true
small capitals rather than extra font weights. Flush left, ragged
right throughout. Set in **Alegreya Sans** (Regular, Italic)
and **Alegreya Sans SC** for the navigation and pronoun tag. Fonts are
subsetted to Latin + common punctuation and self-hosted as woff2
under `assets/fonts/` — no external font requests.

## Structure

```
index.html
CNAME                darylcheng.net
assets/
  css/style.css
  fonts/              AlegreyaSans-*.woff2, AlegreyaSansSC-Regular.woff2
                       OFL-AlegreyaSans.txt, OFL-AlegreyaSansSC.txt (licence)
  img/avatar.jpg       GitHub avatar, resized small
  img/favicon.svg
```

## Local preview

Open `index.html` directly in a browser, or serve it:

```sh
python3 -m http.server 8000
```

## Regenerating the font subsets

Source TTFs live in `~/Documents/Overleaf/PhD-thesis/fonts/`. Subsets
were produced with `fonttools`:

```sh
pyftsubset <source>.ttf --output-file=<dest>.woff2 --flavor=woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201A,U+201C-201E,U+2026" \
  --layout-features='*' --no-hinting
```

## Deployment

Live at **[darylcheng.net](https://darylcheng.net)**, served from this
repo's `main` branch, root folder — GitHub Pages serves a repo named
`<username>.github.io` automatically, no Pages config needed beyond
enabling it once in Settings (already done).

To redeploy after edits:

```sh
git add -A
git commit -m "Update splash page"
git push
```

Git identity for this repo is set to the GitHub-provided noreply
address (`<id>+darylcheng@users.noreply.github.com`) — GitHub rejects
pushes containing a private real address when email privacy
protection is on.

### Custom domain

`CNAME` in the repo root contains `darylcheng.net`, which tells
GitHub Pages which domain to serve. At the registrar, DNS points at
GitHub Pages:

- **Apex domain** (`darylcheng.net`): four `A` records to
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
  `185.199.111.153` (and `AAAA` records for IPv6 if supported).
- **`www` subdomain** (optional): a `CNAME` record pointing to
  `darylcheng.github.io`.

Once DNS has propagated, **Settings → Pages** on GitHub will show the
domain verified — enable "Enforce HTTPS" there once available.

## Updating content

Edit `index.html` directly — name, pronouns, subtitle, bio, and the
three profile links (UCL, GitHub, ORCID) are all near the top of
`<body>`. The navigation labels and pronoun tag are typed in lower
case on purpose: the small caps font renders them as small capitals
automatically.
