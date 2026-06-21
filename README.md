# Mind & Body Activity Classifier

A drag-and-drop game for sorting daily activities into four quadrants:

- **Mind** vs **Body** (x-axis)
- **Helpful** vs **Harmful** (y-axis)

## Files

```
mind-body-classifier/
├── index.html      # Page structure
├── css/
│   └── style.css   # Styling
├── js/
│   └── script.js   # Drag-and-drop logic, activity list, add-activity form
└── README.md
```

## Run locally

Just open `index.html` in any browser — no build step or server required.

## Host on GitHub Pages

1. Create a new GitHub repository and push the contents of this folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick your default branch (e.g. `main`) and the `/ (root)` folder.
4. Save. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.

Example commands to push:

```bash
git init
git add .
git commit -m "Initial commit: Mind & Body Activity Classifier"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
