import { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { endpoints } from '../api/client';
import { motion } from 'framer-motion';

const SentimentAnalysis = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<{ sentiment: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await endpoints.analyzeSentiment({ text });
            setResult(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-black)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                        Sentiment <span className="text-[var(--color-gold)]">Decoder</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">
                        Unveil the emotional undertones of your communication.
                    </p>
                </div>

                <div className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] shadow-2xl relative">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <textarea
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all resize-none"
                                placeholder="Paste your text here for analysis..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg text-sm font-bold text-[var(--color-black)] bg-[var(--color-gold)] hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-gold)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider"
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Search className="-ml-1 mr-2 h-5 w-5" />
                                    Analyze Sentiment
                                </>
                            )}
                        </button>
                    </form>

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 pt-8 border-t border-[var(--color-charcoal-light)]"
                        >
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg font-medium text-gray-400 mb-4">Analysis Result</h3>

                                <div className={`px-8 py-3 rounded-full border-2 text-xl font-bold tracking-wide uppercase ${result.sentiment.toLowerCase().includes('positive')
                                        ? 'border-green-500 text-green-400 bg-green-500/10'
                                        : result.sentiment.toLowerCase().includes('negative')
                                            ? 'border-red-500 text-red-400 bg-red-500/10'
                                            : 'border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold)]/10'
                                    }`}>
                                    {result.sentiment}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SentimentAnalysis;
