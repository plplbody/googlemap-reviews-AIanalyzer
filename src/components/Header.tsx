"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Check, Heart, LogOut, User as UserIcon } from "lucide-react";

interface HeaderProps {
    viewState: "HOME" | "LIST" | "DETAIL";
    onResetHome: () => void;
}

export default function Header({ viewState, onResetHome }: HeaderProps) {
    const { user, profile, signInWithGoogle, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <nav className={`absolute top-0 w-full z-50 p-6 flex justify-between items-center transition-colors duration-300 ${viewState === 'HOME' ? 'text-white' : 'text-slate-900'}`}>
            <div
                className="text-2xl font-bold tracking-widest cursor-pointer"
                onClick={onResetHome}
            >
                AI Concierge <span className="text-xs font-normal opacity-80 ml-1">for グルメ</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide items-center">
                <Link href="/about" className="cursor-pointer hover:text-[#E65100] transition-colors">
                    ABOUT
                </Link>
                {/* Gourmet Notebook (Favorites) Main Link */}
                {user && (
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E65100] to-orange-500 text-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                    >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>グルメノート</span>
                    </Link>
                )}

                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-2"
                        >
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || "User"} className="w-9 h-9 rounded-full border border-white/20 shadow-sm" />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileMenuOpen && (
                            <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200 border border-slate-100 overflow-hidden z-20">
                                <div className="px-4 py-3 border-b border-slate-50">
                                    <p className="text-xs text-slate-400 mb-1">Signed in as</p>
                                    <p className="text-sm font-bold text-slate-800 truncate">{user.displayName}</p>
                                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => { signOut(); setIsProfileMenuOpen(false); }}
                                    className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    ログアウト
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => signInWithGoogle()}
                        className="cursor-pointer hover:text-[#E65100] transition-colors font-bold flex items-center gap-2 ml-4"
                    >
                        LOGIN
                    </button>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-2 duration-200 border-t border-slate-100">
                    <Link href="/about" className="text-slate-900 font-bold tracking-wider cursor-pointer hover:text-[#E65100]" onClick={() => setIsMobileMenuOpen(false)}>
                        ABOUT
                    </Link>
                    {user ? (
                        <div className="flex flex-col gap-4 border-t pt-4 border-slate-200">
                            <div className="flex items-center gap-3 mb-2">
                                {user.photoURL && <img src={user.photoURL} className="w-10 h-10 rounded-full" />}
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{user.displayName}</p>
                                    <p className="text-xs text-slate-400">{user.email}</p>
                                </div>
                            </div>

                            {/* Gourmet Notebook Mobile */}
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#E65100] to-orange-500 text-white rounded-xl shadow-md font-bold justify-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Heart className="w-4 h-4 fill-white" />
                                グルメノート（お気に入り・評価）
                            </Link>

                            <button
                                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                className="text-left text-slate-500 font-medium cursor-pointer flex items-center gap-2 pl-2 mt-2"
                            >
                                <LogOut className="w-4 h-4" /> ログアウト
                            </button>
                        </div>
                    ) : (
                        <span
                            className="text-slate-900 font-bold tracking-wider cursor-pointer hover:text-[#E65100]"
                            onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                        >
                            LOGIN
                        </span>
                    )}
                </div>
            )}
        </nav>
    );
}
