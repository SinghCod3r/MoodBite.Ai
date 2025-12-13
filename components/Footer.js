// components/Footer.js
export default function Footer() {
    return (
        <footer className="w-full py-6 text-center text-white/40 text-xs tracking-wider z-20 relative">
            <div className="flex justify-center flex-col md:flex-row items-center gap-2">
                <span>&copy; {new Date().getFullYear()} MoodBite.Ai Project.</span>
                <span className="hidden md:block">•</span>
                <a
                    href="https://github.com/singhcod3r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-0.5"
                >
                    github.com/singhcod3r
                </a>
            </div>
        </footer>
    );
}
