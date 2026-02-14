
import { Link } from 'react-router-dom';
import { Sparkles, PenTool, Search, MessageSquare, Image, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        {
            name: 'Brand Identity',
            description: 'Curate unique, premium brand names that resonate with luxury.',
            icon: Sparkles,
            path: '/brand',
        },
        {
            name: 'Content Suite',
            description: 'Craft sophisticated marketing copy for your high-end clientele.',
            icon: PenTool,
            path: '/content',
        },
        {
            name: 'Sentiment Intelligence',
            description: 'Deeply understand the emotional spectrum of your audience.',
            icon: Search,
            path: '/sentiment',
        },
        {
            name: 'AI Concierge',
            description: 'A dedicated intelligent assistant for your creative needs.',
            icon: MessageSquare,
            path: '/chat',
        },
        {
            name: 'Logo Design',
            description: 'Generate stunning, minimalist vector logos instantly.',
            icon: Image,
            path: '/logo',
        },
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <div className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-charcoal)_0%,_var(--color-black)_70%)] z-[-1]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="px-4 py-1.5 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-xs font-semibold tracking-widest uppercase bg-[var(--color-gold)]/10">
                        The New Standard
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl text-white max-w-5xl"
                >
                    Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-yellow-200">Vision</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 text-xl max-w-2xl text-gray-400 font-light"
                >
                    Creovate combines state-of-the-art artificial intelligence with timeless design principles to build brands that leave a lasting legacy.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 flex gap-6"
                >
                    <Link
                        to="/brand"
                        className="group relative inline-flex items-center px-10 py-4 border border-[var(--color-gold)] text-sm font-semibold rounded-full text-[var(--color-black)] bg-[var(--color-gold)] hover:bg-white transition-all duration-300"
                    >
                        Start Creating <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        to="/logo"
                        className="inline-flex items-center px-10 py-4 border border-[var(--color-charcoal-light)] text-sm font-semibold rounded-full text-white bg-[var(--color-charcoal)] hover:border-[var(--color-gold)] transition-all duration-300"
                    >
                        Design Logo
                    </Link>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Curated Tools</h2>
                    <div className="w-16 h-1 bg-[var(--color-gold)] mx-auto mt-6 rounded-full" />
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={feature.path} className="group block h-full">
                                <div className="bg-[var(--color-charcoal)] rounded-xl border border-[var(--color-charcoal-light)] p-8 h-full hover:border-[var(--color-gold)] transition-all duration-500 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <feature.icon className="h-32 w-32 text-[var(--color-gold)]" />
                                    </div>

                                    <div className="w-12 h-12 rounded-full bg-[var(--color-charcoal-light)] flex items-center justify-center border border-[var(--color-charcoal-light)] group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 transition-colors mb-6">
                                        <feature.icon className="h-5 w-5 text-gray-300 group-hover:text-[var(--color-gold)]" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors">{feature.name}</h3>
                                    <p className="text-gray-400 font-light leading-relaxed">{feature.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
