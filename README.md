# JewelInventory AI

A premium Jewelry Inventory & Visual Search App.

## Prerequisites

- **Node.js**: You must have Node.js installed to run this application.
  - Download and install from: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended).

## Setup Instructions

1.  **Install Node.js** if you haven't already.
2.  Open a terminal in this directory.
3.  Run `npm install` to download all dependencies.
4.  Run `npm run dev` to start the development server.
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Initialize (One-Time)
Run the `SAFE_START.bat` file to install dependencies.

## Customization Guide
Use VS Code or Notepad to edit these files:

### 1. Change Colors (Gold Theme)
*   **File**: `tailwind.config.ts`
*   **Action**: Edit the `gold` object under `theme.extend.colors`. You can change the hex codes to any color you like.

### 2. Change App Name & Text
*   **File**: `src/app/layout.tsx` (Header/Title)
*   **File**: `src/app/page.tsx` (Dashboard Stats)
*   **Action**: Search for "LuxeInventory" or "Total Value" and replace with your own text.

### 3. Add New Categories
*   **File**: `src/app/page.tsx`
*   **Action**: Look for the list `['Rings', 'Bangles', ...]` and add new items like `'Anklets'`.

### 4. Configure Google Keys
*   **File**: `.env.local` (create based on `.env.local.example`)
*   **Action**: Paste your API keys here to make the Visual Search work with real data.
