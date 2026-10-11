# Souvik Dhar — Developer Portfolio

A static React/Vite portfolio. The page has no backend: the contact form validates locally and never sends or stores messages.

## Update portfolio content

Edit `src/data/portfolio.ts` to change the profile name, headline, location, email, introduction, interests, social links, and resume URLs. The same module contains the project descriptions, dates, verified repository URL, technology stacks, skills, experience and activities, education, achievements, and coding profiles. Keep project links limited to repositories or demos that have been checked.

## Theme and presentation

The palette, typography, responsive layout, and motion live in `src/index.css`. Dark mode is the default unless the visitor's operating system prefers light mode; after the first visit, the visitor's choice is saved in local storage under `souvik-theme`. The toggle is in the top navigation.

Update the page title, description, Open Graph/Twitter metadata in `index.html`, and the monogram mark in `public/favicon.svg` when rebranding.

## Local commands

From the workspace root, run `pnpm --filter @workspace/souvik-portfolio run dev` for the development server or `pnpm --filter @workspace/souvik-portfolio run typecheck` for TypeScript checks. To create a production build outside the managed workflow, run `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/souvik-portfolio run build`.
