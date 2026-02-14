import { useState } from 'react';
import { PenTool, Copy, Loader, FileText } from 'lucide-react';
import { endpoints } from '../api/client';
import { motion } from 'framer-motion';

const ContentGenerator = () => {
    const [formData, setFormData] = useState({ description: '', tone: 'Sophisticated', content_type: 'Blog Post' });
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await endpoints.generateContent(formData);
            setResult(response.data.content || response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
    };

    return (
        <div className="min-h-screen bg-[var(--color-black)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                        Content <span className="text-[var(--color-gold)]">Atelier</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">
                        Craft bespoke narratives that captivate and convert.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Topic / Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all resize-none"
                                    placeholder="Describe the content you wish to create..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Type</label>
                                    <select
                                        className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                        value={formData.content_type}
                                        onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                                    >
                                        <option>Blog Post</option>
                                        <option>Social Media Caption</option>
                                        <option>Email Newsletter</option>
                                        <option>Product Description</option>
                                        <option>Press Release</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Tone</label>
                                    <select
                                        className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                        value={formData.tone}
                                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                    >
                                        <option>Sophisticated</option>
                                        <option>Persuasive</option>
                                        <option>Inspirational</option>
                                        <option>Technical</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg text-sm font-bold text-[var(--color-black)] bg-[var(--color-gold)] hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-gold)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                        Crafting...
                                    </>
                                ) : (
                                    <>
                                        <PenTool className="-ml-1 mr-2 h-5 w-5" />
                                        Generate Content
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] h-full min-h-[500px] flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-charcoal-light)]">
                            <div className="flex items-center text-white">
                                <FileText className="h-5 w-5 text-[var(--color-gold)] mr-2" />
                                <h3 className="text-lg font-medium">Draft</h3>
                            </div>
                            {result && (
                                <button
                                    onClick={copyToClipboard}
                                    className="text-gray-400 hover:text-[var(--color-gold)] transition-colors"
                                >
                                    <Copy className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        <div className="flex-grow bg-[var(--color-black)] rounded-lg p-6 border border-[var(--color-charcoal-light)] text-gray-300 leading-relaxed overflow-y-auto whitespace-pre-wrap font-light">
                            {result || (
                                <span className="text-gray-600 italic">Your masterpiece will appear here...</span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContentGenerator;
