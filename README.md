# HealthPulse Smart Tracker

## Project info

HealthPulse is a smart health tracking application that helps you monitor vital signs, visualize health trends, and receive intelligent alerts.

## Features

- Track vital health metrics like blood pressure, heart rate, blood sugar, and BMI
- Visualize health data with interactive charts
- Get intelligent alerts when readings are outside normal ranges
- Set and monitor health goals

## How to use this project

### Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:8080

### Building for production

To build the application for production:

```
npm run build
```

The built files will be in the `dist` directory.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project to various hosting platforms:

### Vercel

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect the build settings

### Netlify

1. Push your code to GitHub
2. Import your repository on Netlify
3. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages

1. Update the `vite.config.ts` file to include your base path
2. Run `npm run build`
3. Deploy the `dist` folder to GitHub Pages

## Custom Domain

To connect a custom domain, follow the instructions provided by your hosting platform of choice.

## License

MIT
