export interface JewelryItem {
    id: string;
    sku: string;
    name: string;
    category: 'Ring' | 'Bangle' | 'Necklace' | 'Earrings' | 'Pendant' | 'Set' | 'Other';
    weight: number; // in grams
    purity: '24k' | '22k' | '18k' | '14k';
    price: number;
    imageUrl: string;
    tags: string[];
    createdAt: number; // timestamp
}

export interface InventoryResponse {
    items: JewelryItem[];
    total: number;
    page: number;
    totalPages: number;
}
