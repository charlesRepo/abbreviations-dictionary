# Abbreviations Dictionary Chrome Extension

A handy Chrome extension for looking up abbreviations and their meanings.

## Setup Instructions

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd abbreviations-dictionary
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To run the app in development mode:

```bash
npm start
```

This will start the development server and open [http://localhost:3000](http://localhost:3000) in your default browser. The page will automatically reload when you make changes.

## Testing

To run tests in interactive watch mode:

```bash
npm test
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `build` folder with minified files and hashed filenames.

## Deployment

To deploy the extension to your Chrome extensions directory:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Copy the build to your Chrome extensions directory:
   ```bash
   cp -R ./build/ ~/chrome-extensions/abbreviations-dictionary
   ```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `build` directory
4. The extension should now be available in your Chrome toolbar
