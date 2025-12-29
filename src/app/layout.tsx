import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AI Concierge for グルメ",
    description: "あなたに最適なお店をAIが探します。",
};

import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";

// アプリケーション全体のルートレイアウト
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <body className={`${shipporiMincho.className} antialiased`}>
                <AuthProvider>
                    <SearchProvider>
                        {children}
                    </SearchProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
