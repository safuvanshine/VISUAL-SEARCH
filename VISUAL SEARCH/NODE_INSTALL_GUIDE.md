# How to Install Node.js on Windows

Node.js is required to run the development server for your Jewelry App.

## Step 1: Download the Installer
1.  Go to the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
2.  You will see two big green buttons. Click the one that says **"LTS" (Long Term Support)**. This is the most stable version.
    *   *Example: "20.11.0 LTS"*

## Step 2: Run the Installer
1.  Once the `.msi` file finishes downloading, double-click it to run.
2.  Follow the setup wizard:
    *   Click **Next**.
    *   Accept the license agreement and click **Next**.
    *   Keep the default installation path (usually `C:\Program Files\nodejs\`) and click **Next**.
    *   On the "Custom Setup" screen, leave everything as default and click **Next**.
    *   **IMPORTANT**: You might see a checkbox for "Automatically install the necessary tools...". You generally **do not** need to check this for a standard web app. You can leave it unchecked to save time.
    *   Click **Install**.
    *   If Windows asks for permission, click **Yes**.

## Step 3: Verify Installation
1.  Once installed, open a **new** Command Prompt or PowerShell window.
    *   *Note: You must close any existing terminal windows for the changes to take effect.*
2.  Type the following command and press Enter:
    ```bash
    node -v
    ```
3.  You should see a version number, like `v20.11.0`.
4.  Then check `npm` (Node Package Manager) by typing:
    ```bash
    npm -v
    ```
5.  You should see a version number like `10.2.4`.

## Step 4: Run Your Project
1.  Navigate back to your project folder in the terminal.
2.  Run the setup command:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npm run dev
    ```
