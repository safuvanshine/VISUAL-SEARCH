"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { parseCSV } from '@/lib/csv-utils';

export default function BulkUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus('idle');

        try {
            // Client-side parsing to preview or validate could happen here
            // For now, we send to API
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/inventory/bulk-upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(`Successfully imported ${data.count} items!`);
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setMessage(error.message || 'Something went wrong');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Bulk Inventory Upload</h1>
                <p className="text-gray-500">Import your 3000+ items using a CSV file.</p>
            </div>

            <div className="bg-white rounded-xl border border-gold-200 shadow-sm p-8">
                <div className="border-2 border-dashed border-gold-200 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gold-50 transition-colors">
                    <FileSpreadsheet className="w-12 h-12 text-gold-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select CSV File</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Columns required: sku, name, category, weight, purity, price, tags, imageUrl
                    </p>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".csv"
                        className="hidden"
                    />

                    <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                        Browse Files
                    </Button>

                    {file && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-gold-700 font-medium bg-gold-50 px-3 py-1 rounded-full">
                            {file.name}
                        </div>
                    )}
                </div>

                {file && (
                    <div className="mt-6">
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? 'Processing...' : 'Upload and Import'}
                        </Button>
                    </div>
                )}

                {status === 'success' && (
                    <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {message}
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {message}
                    </div>
                )}
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
                <p>Need a template? <a href="#" className="text-gold-600 hover:underline">Download CSV Template</a></p>
            </div>
        </div>
    );
}
