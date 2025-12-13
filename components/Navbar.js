// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    const isActive = (path) => router.pathname === path ? "text-white opacity-100 font-medium" : "text-white/60 hover:text-white transition-colors cursor-pointer";

    return (
        <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-transparent">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <Link href="/" className="cursor-pointer">
                    <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 hover:to-white transition-all cursor-pointer">
                        MoodBite.Ai
                    </h1>
                </Link>
                <div className="hidden sm:block text-xs text-white/50 border border-white/10 px-3 py-0.5 rounded-full backdrop-blur-md bg-white/5">
                    v3.0
                </div>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                <Link href="/" className={isActive('/')}>
                    Home
                </Link>
                <Link href="/about" className={isActive('/about')}>
                    About
                </Link>
            </div>
        </nav>
    );
}
