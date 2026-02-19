"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';

// Mock Data for visualization
const MOCK_INVENTORY = [
    { id: '1', sku: 'RG-001', name: 'Antique Gold Ruby Ring', category: 'Ring', weight: '12.5g', purity: '22k', price: 1200, image: '/placeholder.jpg' },
    { id: '2', sku: 'NK-045', name: 'Temple Design Necklace', category: 'Necklace', weight: '45.2g', purity: '22k', price: 4500, image: '/placeholder.jpg' },
    { id: '3', sku: 'BG-102', name: 'Diamond Studded Bangle', category: 'Bangle', weight: '24.0g', purity: '18k', price: 2800, image: '/placeholder.jpg' },
    { id: '4', sku: 'ER-088', name: 'Jhumka Earrings', category: 'Earrings', weight: '18.5g', purity: '22k', price: 1750, image: '/placeholder.jpg' },
];

export default function InventoryPage() {
    const [search, setSearch] = useState('');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Inventory Management</h1>
                    <p className="text-gray-500 mt-1">Manage your collection of 3,000+ unique designs</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary">
                        Import CSV
                    </Button>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Add New Item
                    </Button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-gold-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search by SKU, Name, or Tags..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <select className="h-10 px-3 rounded-md border border-gold-200 bg-white text-sm focus:ring-2 focus:ring-gold-500 outline-none">
                        <option>All Categories</option>
                        <option>Rings</option>
                        <option>Necklaces</option>
                        <option>Bangles</option>
                    </select>
                    <select className="h-10 px-3 rounded-md border border-gold-200 bg-white text-sm focus:ring-2 focus:ring-gold-500 outline-none">
                        <option>All Purity</option>
                        <option>22k</option>
                        <option>18k</option>
                    </select>
                    <Button variant="outline" size="sm" className="h-10">
                        <Filter className="w-4 h-4 mr-2" /> More Filters
                    </Button>
                </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_INVENTORY.map((item) => (
                    <div key={item.id} className="group bg-white rounded-xl border border-gold-100 overflow-hidden hover:shadow-lg hover:border-gold-300 transition-all duration-300">
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                            {/* Placeholder for Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                Image
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-semibold text-gold-600 bg-gold-50 px-2 py-1 rounded-full">{item.category}</span>
                                <span className="text-xs text-gray-500">{item.purity}</span>
                            </div>
                            <h3 className="font-serif font-bold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">SKU: {item.sku}</p>

                            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                <span className="font-medium text-gray-900">{item.weight}</span>
                                <Button variant="ghost" size="sm" className="h-8 text-xs">Edit</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
