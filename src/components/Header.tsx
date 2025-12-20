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
            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide items-center">
                <Link href="/about" className="cursor-pointer hover:text-[#E65100] transition-colors">
                    ABOUT
                </Link>
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full border border-white/20" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-[#E65100] flex items-center justify-center text-white">
                                    <UserIcon className="w-4 h-4" />
                                </div>
                            )}
                            <span className="text-xs opacity-90">{user.displayName}</span>
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200 border border-slate-100 overflow-hidden">
                                <div className="px-4 py-2 border-b border-slate-50">
                                    <p className="text-xs text-slate-400">Signed in as</p>
                                    <p className="text-sm font-bold text-slate-700 truncate">{user.email}</p>
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#E65100] transition-colors"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                    <Heart className="w-4 h-4" />
                                    お気に入り
                                </Link>
                                <Link
                                    href="/history"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#E65100] transition-colors"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                    <Check className="w-4 h-4" />
                                    行ったお店
                                </Link>
                                <button
                                    onClick={() => { signOut(); setIsProfileMenuOpen(false); }}
                                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors border-t border-slate-50 mt-1"
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
                        className="cursor-pointer hover:text-[#E65100] transition-colors font-bold flex items-center gap-2"
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
                            <div className="flex items-center gap-3">
                                {user.photoURL && <img src={user.photoURL} className="w-8 h-8 rounded-full" />}
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{user.displayName}</p>
                                    <p className="text-xs text-slate-400">{user.email}</p>
                                </div>
                            </div>
                            <Link href="/profile" className="flex items-center gap-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
                                <Heart className="w-4 h-4" />Favorites
                            </Link>
                            <Link href="/history" className="flex items-center gap-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
                                <Check className="w-4 h-4" />Visited
                            </Link>
                            <button
                                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                className="text-left text-[#E65100] font-bold tracking-wider cursor-pointer flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> LOGOUT
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
