import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, MessageSquare, PenTool, Search, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Brand Names', path: '/brand', icon: Sparkles },
        { name: 'Content', path: '/content', icon: PenTool },
        { name: 'Sentiment', path: '/sentiment', icon: Search },
        { name: 'Chat', path: '/chat', icon: MessageSquare },
        { name: 'Logo Design', path: '/logo', icon: Image },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[var(--color-black)] flex flex-col font-sans text-white">
            {/* Navbar */}
            <nav className="bg-[var(--color-black)] border-b border-[var(--color-charcoal-light)] sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-3 group">
                                <img src="/logo.png" alt="Creovate Logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] tracking-wide">
                                    CREOVATE
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 border border-transparent ${isActive(item.path)
                                            ? 'text-[var(--color-black)] bg-[var(--color-gold)] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                            : 'text-gray-400 hover:text-[var(--color-gold)] hover:border-[var(--color-charcoal-light)] hover:bg-[var(--color-charcoal)]'
                                        }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-400 hover:text-[var(--color-gold)] focus:outline-none"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[var(--color-charcoal)] border-b border-[var(--color-charcoal-light)] overflow-hidden"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3 ${isActive(item.path)
                                                ? 'text-[var(--color-gold)] bg-[var(--color-charcoal-light)] border-l-2 border-[var(--color-gold)]'
                                                : 'text-gray-400 hover:text-[var(--color-gold)] hover:bg-[var(--color-charcoal-light)]'
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="flex-grow relative">
                {/* Background Ambient Glow */}
                <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-gold)] rounded-full mix-blend-screen filter blur-[150px] opacity-5"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
                </div>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[var(--color-charcoal)] border-t border-[var(--color-charcoal-light)] mt-auto">
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <img src="/logo.png" alt="Logo" className="h-8 w-auto opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
                            <span className="font-semibold text-gray-400 tracking-wider">CREOVATE AI</span>
                        </div>
                        <p className="font-light tracking-wide">&copy; {new Date().getFullYear()} Creovate. Redefining Excellence.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
