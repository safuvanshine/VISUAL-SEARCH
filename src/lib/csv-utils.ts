import Papa from 'papaparse';
import { JewelryItem } from './types';

export interface CSVRow {
    sku: string;
    name: string;
    category: string;
    weight: string;
    purity: string;
    price: string;
    tags: string; // comma separated
    imageUrl: string;
}

export async function parseCSV(file: File): Promise<Partial<JewelryItem>[]> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const rows = results.data as CSVRow[];
                const items: Partial<JewelryItem>[] = rows.map((row) => ({
                    sku: row.sku,
                    name: row.name,
                    category: row.category as any,
                    weight: parseFloat(row.weight),
                    purity: row.purity as any,
                    price: parseFloat(row.price),
                    tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
                    imageUrl: row.imageUrl,
                    createdAt: Date.now(),
                }));
                resolve(items);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}
