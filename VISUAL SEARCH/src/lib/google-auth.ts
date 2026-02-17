import { google } from 'googleapis';

// Initialize Google Auth using Service Account
// You need to set these environment variables in .env.local
const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/cloud-platform'
];

export const getGoogleAuth = () => {
    const credentials = {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID,
    };

    return new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });
};
