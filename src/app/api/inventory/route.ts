import { NextResponse } from 'next/server';
import { JewelryItem } from '@/lib/types';

// Mock database for now
const MOCK_DB: JewelryItem[] = [
    {
        id: '1',
        sku: 'RG-001',
        name: 'Antique Gold Ruby Ring',
        category: 'Ring',
        weight: 12.5,
        purity: '22k',
        price: 1200,
        imageUrl: '/placeholder.jpg',
        tags: ['antique', 'ruby', 'waiting'],
        createdAt: Date.now(),
    },
    // Add more mock items here if needed
];

export async function GET(request: Request) {
    // In a real app, we would fetch from Firebase Firestore here
    // const { searchParams } = new URL(request.url);
    // const query = searchParams.get('q');

    return NextResponse.json({
        items: MOCK_DB,
        total: MOCK_DB.length,
        page: 1,
        totalPages: 1
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validate body here
        const newItem: JewelryItem = {
            id: Math.random().toString(36).substring(7),
            createdAt: Date.now(),
            ...body
        };

        // In real app: await addDoc(collection(db, "inventory"), newItem);
        MOCK_DB.push(newItem);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
}
