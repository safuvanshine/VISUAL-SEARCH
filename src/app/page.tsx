export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-xl border border-gold-100 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Inventory</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-serif font-bold text-gray-900">3,248</span>
                        <span className="text-sm text-green-600 font-medium">+12 this week</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gold-100 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Value</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-serif font-bold text-gray-900">$4.2M</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gold-100 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Gold Rate (24k)</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-serif font-bold text-gold-600">$72.50</span>
                        <span className="text-sm text-gray-500">per gram</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Quick Categories</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Rings', 'Bangles', 'Necklaces', 'Earrings'].map((cat) => (
                    <div key={cat} className="group relative aspect-square bg-gold-50 rounded-lg overflow-hidden cursor-pointer border border-gold-100 hover:border-gold-300 transition-all">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-serif font-medium text-gold-800">{cat}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
