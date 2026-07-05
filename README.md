# People of the Kingdom Sidebar

This is a React-based web application built with Vite and Tailwind CSS. 

## Deployment

This repository includes a GitHub Actions workflow that automatically deploys the `main` branch to GitHub Pages.

### How to view the app after a successful deployment:

1. Go to your repository on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar, click on **Pages**.
4. At the top, you should see a message saying "Your site is live at `https://<your-username>.github.io/<your-repo-name>/`".
5. Click that link to load your application!

> **Note:** If your app loads as a blank page or is missing assets, you may need to update the `base` path in `vite.config.ts` to match your repository name. E.g., `base: '/your-repo-name/'`.

## Local Development

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Build for production: `npm run build`
