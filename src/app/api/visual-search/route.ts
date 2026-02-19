import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/vision';
import { JewelryItem } from '@/lib/types';

// Mock DB import (replace with real DB call later)
// in a real app, importing this from a shared lib is better
const MOCK_DB: Record<string, JewelryItem> = {
    'RG-001': { id: '1', sku: 'RG-001', name: 'Antique Gold Ruby Ring', category: 'Ring', weight: 12.5, purity: '22k', price: 1200, imageUrl: '/placeholder.jpg', tags: ['antique', 'ruby'], createdAt: Date.now() },
    'NK-045': { id: '2', sku: 'NK-045', name: 'Temple Design Necklace', category: 'Necklace', weight: 45.2, purity: '22k', price: 4500, imageUrl: '/placeholder.jpg', tags: ['temple'], createdAt: Date.now() },
    // ... maps product ID (SKU) to item
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let productIds: string[] = [];

        // Check if we have credentials to run real search
        if (process.env.GOOGLE_PROJECT_ID && process.env.GOOGLE_CLIENT_EMAIL) {
            console.log('Credentials found. Connecting to Vision API...');
            try {
                const results = await searchProducts(buffer);
                // Extract Product IDs (SKUs) from results
                // results structure depends on the specific response, usually product.name contains the ID
                productIds = results.map((result: any) => {
                    // product.name format: projects/.../locations/.../products/PRODUCT_ID
                    const parts = result.product?.name?.split('/') || [];
                    return parts[parts.length - 1]; // Getting the last part as ID
                });
            } catch (visionError) {
                console.error('Vision API failed, falling back to mock:', visionError);
                // Fallback or rethrow depending on desired behavior
                // For this demo, we might want to simulate a match if API fails
                productIds = ['RG-001'];
            }
        } else {
            console.log('No credentials. Using Mock Search.');
            // Simulate finding a random item
            productIds = ['RG-001', 'NK-045'];
        }

        // Fetch full item details from DB based on Product IDs
        // In real app: await db.collection('inventory').where('sku', 'in', productIds).get();
        const matchedItems = productIds
            .map(id => MOCK_DB[id])
            .filter(item => item !== undefined);

        return NextResponse.json({
            results: matchedItems,
            debug_productIds: productIds
        });

    } catch (error) {
        console.error('Visual Search Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
