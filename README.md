# Portfolio_Soyamo_Vakala

Soyamo Vakala's personal portfolio, built with React, Three.js and Vite.

## Develop locally

Use a current Node.js LTS release.

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run lint
npm run build
npm run preview
```

The preview is served under `/Portfolio_Soyamo_Vakala/`.

## Publish on GitHub Pages

Create an empty public GitHub repository named `Portfolio_Soyamo_Vakala` in your account. From this directory, run:

```sh
git add .
git commit -m "Prepare portfolio for GitHub Pages"
git remote add origin https://github.com/Soyamo/Portfolio_Soyamo_Vakala.git
git push -u origin main
```

If your GitHub username differs from Soyamo, adjust the remote URL.
In the repository, open **Settings > Pages > Build and deployment > Source** and select **GitHub Actions**. The included workflow builds and publishes on pushes to `main`. If the first run failed before Pages was enabled, rerun it in the Actions tab.

Expected address for the Soyamo account: https://soyamo.github.io/Portfolio_Soyamo_Vakala/

## Content review

- Project case studies explain the problem, contribution and technical decisions well.
- Add benchmark methodology or evidence for 92% accuracy, 65% faster deployments and 40% faster queries.
- Replace profile links for the hardware platform and hotel database with specific repositories when available.
- Add live demos, screenshots or recorded walkthroughs so visitors can assess the work.
- All current project demo URLs are empty.

The published website includes the contact information, photo and resume stored in this project.
