import vision from '@google-cloud/vision';

// The client automatically uses the GOOGLE_APPLICATION_CREDENTIALS env var
// OR we can pass the credentials object explicitly if needed, but standard practice
// with the nodejs client is to rely on the environment or explicit config.
// Since we used GoogleAuth in another file, we might want to share, but the Vision client
// instantiates its own auth internally usually.
// For simplicity in Next.js, passing credentials directly is often safer to avoid
// file path issues in serverless environments.

const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
};

const visionClient = new vision.ImageAnnotatorClient({ credentials });
const productSearchClient = new vision.ProductSearchClient({ credentials });

const projectId = process.env.GOOGLE_PROJECT_ID || '';
const location = 'us-west1'; // Or your specific location
const productSetId = 'jewelry-product-set';
const productCategory = 'apparel-v2'; // 'apparel-v2', 'homegoods-v2', 'toys-v2'

export async function searchProducts(imageContent: Buffer) {
    try {
        const productSetPath = productSearchClient.productSetPath(projectId, location, productSetId);

        const request = {
            image: { content: imageContent },
            features: [{ type: 'PRODUCT_SEARCH', maxResults: 5 }],
            imageContext: {
                productSearchParams: {
                    productSet: productSetPath,
                    productCategories: [productCategory],
                    filter: '', // Optional: filter by labels/tags
                },
            },
        };

        // Use visionClient for the actual image annotation/search
        const [response] = await visionClient.batchAnnotateImages({
            requests: [request] as any,
        });

        const results = response.responses?.[0]?.productSearchResults?.results;
        return results || [];

    } catch (error) {
        console.error('Vision API Product Search Error:', error);
        throw error;
    }
}

export async function createProduct(productId: string, displayName: string, category: string) {
    // Logic to create a product in the Vision API catalog
    // This is needed when we add new items to the inventory
    // ...
}
