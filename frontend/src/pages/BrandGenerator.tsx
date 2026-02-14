import { useState } from 'react';
import { Sparkles, Copy, Loader, RefreshCw } from 'lucide-react';
import { endpoints } from '../api/client';
import { motion } from 'framer-motion';

const BrandGenerator = () => {
    const [formData, setFormData] = useState({ industry: '', keywords: '', tone: 'Sophisticated' });
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await endpoints.generateBrand(formData);
            // The backend returns { "brands": "string..." }
            const rawText = response.data.brands || response.data;
            const namesList = typeof rawText === 'string' ? rawText.split('\n').filter((n: string) => n.trim()) : rawText;
            setResults(namesList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-[var(--color-black)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                        Identity <span className="text-[var(--color-gold)]">Creation</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">
                        Forge a name that resonates with exclusivity and prestige.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Industry</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                    placeholder="e.g. Haute Couture"
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Keywords</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                    placeholder="e.g. Elegant, Timeless"
                                    value={formData.keywords}
                                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Tone</label>
                                <select
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                    value={formData.tone}
                                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                >
                                    <option>Sophisticated</option>
                                    <option>Modern</option>
                                    <option>Classic</option>
                                    <option>Avant-Garde</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg text-sm font-bold text-[var(--color-black)] bg-[var(--color-gold)] hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-gold)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                        Forging...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="-ml-1 mr-2 h-5 w-5" />
                                        Generate Names
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] min-h-[400px] flex flex-col"
                    >
                        <h3 className="text-lg font-medium text-white mb-6 border-b border-[var(--color-charcoal-light)] pb-4 flex items-center">
                            <RefreshCw className="h-5 w-5 mr-2 text-[var(--color-gold)]" />
                            Generated Results
                        </h3>

                        {results.length > 0 ? (
                            <div className="space-y-3 overflow-y-auto custom-scrollbar flex-grow pr-2">
                                {results.map((brand, index) => {
                                    const cleanName = brand.replace(/^\d+\.\s*/, '').replace(/["*]/g, '');
                                    return (
                                        <div key={index} className="group flex justify-between items-center p-4 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg hover:border-[var(--color-gold)] transition-all duration-300">
                                            <span className="text-lg font-light tracking-wide text-gray-200 group-hover:text-[var(--color-gold)]">{cleanName}</span>
                                            <button
                                                onClick={() => copyToClipboard(cleanName)}
                                                className="text-gray-600 hover:text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-gray-600 space-y-4">
                                <Sparkles className="h-12 w-12 opacity-20" />
                                <p className="font-light">Awaiting your parameters...</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BrandGenerator;
