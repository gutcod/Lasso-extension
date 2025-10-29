# Lasso

A simple Chrome extension that automatically detects and captures email addresses from ChatGPT conversations.

## Features

- **Automatic Detection**: Monitors ChatGPT pages in real-time for email addresses
- **Storage**: Saves all detected emails with timestamps to local storage
- **Simple UI**: Clean popup interface to view all captured emails
- **Clear History**: One-click button to clear all detected emails

## Tech Stack

- React 19
- TypeScript
- Context API for state management
- Vite for building
- Chrome Extension Manifest V3

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

## Usage

1. Visit ChatGPT (chat.openai.com or chatgpt.com)
2. Any email addresses that appear on the page will be automatically detected
3. Click the Lasso extension icon to view all detected emails
4. Use the "Clear All" button to reset the list


## How It Works

1. **Content Script** (`src/content.ts`): Runs on ChatGPT pages, uses MutationObserver to monitor DOM changes and detect email addresses using regex
2. **Background Script** (`src/background.ts`): Receives detected emails from content script and stores them in chrome.storage.local
3. **Popup** (`src/components/EmailForm.tsx`): Displays stored emails, listens for storage changes for real-time updates

## License

MIT
