# Currency Converter Frontend

This project is a modern, responsive frontend for a Currency Converter application, focusing on converting between Dominican Pesos (DOP) and US Dollars (USD).

## Table of Contents

- [Currency Converter Frontend](#currency-converter-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Development](#development)
  - [Building for Production](#building-for-production)
  - [Contributing](#contributing)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)

## Features

- Real-time currency conversion between DOP and USD
- Historical conversion records
- Exchange rate management (admin functionality)
- Responsive design using Material-UI
- TypeScript for enhanced type safety

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1- Clone the repository:

```shellscript
git clone https://github.com/your-username/currency-converter-frontend.git
cd currency-converter-frontend
```

2- Install the dependencies:

```shellscript
npm install
```

[!NOTE]
The `node_modules` directory will be created after running `npm install`. This directory is gitignored and won't be tracked by version control.

## Project Structure

```plaintext
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── theme/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

[!TIP]
The `src` directory contains all the source code for the application. Familiarize yourself with this structure to easily navigate and maintain the project.

## Configuration

1. Create a `.env` file in the root directory:

```plaintext
VITE_API_URL=http://localhost:3000
```

[!IMPORTANT]
The `.env` file contains sensitive information and is not tracked by Git. Make sure to keep it secure and never commit it to version control.

Update the `VITE_API_URL` to match your backend server address if it's different from the default.

## Running the Application

To start the development server:

```shellscript
npm run dev
```

The application will be available at `http://localhost:5173`.

## Development

Here are some key points to keep in mind during development:

1. Components are located in `src/components/`.
2. Pages (route components) are in `src/pages/`.
3. Custom hooks, including API calls, are in `src/hooks/`.
4. The Material-UI theme is configured in `src/theme/theme.ts`.

[!NOTE]
We use the native `fetch` API for making HTTP requests to the backend. Ensure your backend CORS settings allow requests from the frontend's origin.

## Building for Production

To create a production build:

```shellscript
npm run build
```

This will generate optimized files in the `dist/` directory.

[!TIP]
Always test your production build locally before deploying:

```shellscript
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

[!IMPORTANT]
Before submitting a pull request, ensure your code follows the project's coding standards and all tests pass.

---

This README provides a comprehensive guide to setting up, developing, and contributing to the Currency Converter Frontend project. For any additional questions or issues, please open an issue in the GitHub repository.

[!TAKE-NOTE] React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
