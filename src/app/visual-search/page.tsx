"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Search, X } from 'lucide-react';
import Image from 'next/image';

export default function VisualSearchPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            // Here you would trigger the search
        }
    };

    const handleSearch = async () => {
        if (!selectedImage || !fileInputRef.current?.files?.[0]) return;

        setIsSearching(true);

        try {
            const formData = new FormData();
            formData.append('image', fileInputRef.current.files[0]);

            const response = await fetch('/api/visual-search', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Search Results:', data);

            // Here you would navigate to a results page or show them below
            // For now, let's just alert the user or show a simple list
            if (data.results && data.results.length > 0) {
                alert(`Found ${data.results.length} matching items! Top match: ${data.results[0].name}`);
            } else {
                alert('No matching jewelry found.');
            }

        } catch (error) {
            console.error('Search failed:', error);
            alert('Something went wrong with the search.');
        } finally {
            setIsSearching(false);
        }
    };

    const clearImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Visual Search</h1>
                <p className="text-lg text-gray-600">
                    Upload a photo or use your camera to find similar jewelry in our collection.
                </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-dashed border-gold-200 p-8 md:p-12 shadow-sm transition-all hover:border-gold-400">
                {!selectedImage ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center text-gold-600">
                            <Camera className="w-10 h-10" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Drag and drop an image</h3>
                            <p className="text-gray-500 mb-6">or click to upload from your device</p>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />

                            <div className="flex gap-4">
                                <Button onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="w-4 h-4 mr-2" /> Upload Photo
                                </Button>
                                <Button variant="outline">
                                    <Camera className="w-4 h-4 mr-2" /> Use Camera
                                </Button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">Supports JPG, PNG, WEBP up to 5MB</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="relative w-64 h-64 rounded-lg overflow-hidden border border-gold-200 shadow-md mb-8">
                            <Image
                                src={selectedImage}
                                alt="Selected search image"
                                layout="fill"
                                objectFit="cover"
                            />
                            <button
                                onClick={clearImage}
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <Button
                            size="lg"
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="w-full md:w-auto min-w-[200px]"
                        >
                            {isSearching ? (
                                <span className="flex items-center">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                    Searching Inventory...
                                </span>
                            ) : (
                                <>
                                    <Search className="w-5 h-5 mr-2" /> Find Matching Jewelry
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Popular Visual Searches</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                    {['Gold Bangle', 'Temple Necklace', 'Diamond Ring', 'Antique Earrings'].map((term) => (
                        <span key={term} className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 border border-gray-100 cursor-pointer hover:border-gold-300 hover:text-gold-700 transition-colors">
                            {term}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
