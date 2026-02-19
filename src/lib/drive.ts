import { google } from 'googleapis';
import { getGoogleAuth } from './google-auth';
import { Readable } from 'stream';

const drive = google.drive({ version: 'v3', auth: getGoogleAuth() });

// ID of the folder where we store jewelry images
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

export async function uploadImageToDrive(fileBuffer: Buffer, fileName: string, mimeType: string) {
    try {
        const fileMetadata = {
            name: fileName,
            parents: FOLDER_ID ? [FOLDER_ID] : [],
        };

        const media = {
            mimeType: mimeType,
            body: Readable.from(fileBuffer),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webContentLink, webViewLink, thumbnailLink',
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading to Drive:', error);
        throw error;
    }
}

export async function listImages() {
    try {
        const response = await drive.files.list({
            q: `'${FOLDER_ID}' in parents and trash = false`,
            fields: 'files(id, name, webViewLink, thumbnailLink)',
        });
        return response.data.files;
    } catch (error) {
        console.error('Error listing Drive files:', error);
        throw error;
    }
}
