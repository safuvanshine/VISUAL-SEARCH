import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "LuxeInventory - Premium Jewelry Management",
    description: "AI-Powered Jewelry Inventory and Visual Search",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(inter.variable, playfair.variable, "font-sans bg-gold-50")}>
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white border-b border-gold-200 sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white font-serif font-bold">
                                    L
                                </div>
                                <h1 className="text-xl font-serif font-bold text-gold-800">LuxeInventory</h1>
                            </div>
                            <nav className="flex gap-6 text-sm font-medium text-gray-600">
                                <a href="/" className="hover:text-gold-600 transition-colors">Dashboard</a>
                                <a href="/inventory" className="hover:text-gold-600 transition-colors">Inventory</a>
                                <a href="/visual-search" className="hover:text-gold-600 transition-colors">Visual Search</a>
                            </nav>
                        </div>
                    </header>
                    <main className="flex-grow">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
