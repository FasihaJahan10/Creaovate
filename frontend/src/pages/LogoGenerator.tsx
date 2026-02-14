import { useState } from 'react';
import { Image, Copy, Loader, Download } from 'lucide-react';
import { endpoints } from '../api/client';
import { motion } from 'framer-motion';

const LogoGenerator = () => {
    const [formData, setFormData] = useState({
        brand_name: '',
        industry: '',
        keywords: '',
        color: 'gold'
    });
    const [logoImage, setLogoImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setLogoImage('');

        try {
            const response = await endpoints.generateLogo(formData);
            if (response.data.image) {
                setLogoImage(`data:image/png;base64,${response.data.image}`);
            } else {
                throw new Error('No image returned from server');
            }
        } catch (err) {
            setError('Failed to generate logo. Please check your API key and try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (logoImage) {
            setError('Copying image data is not supported. Please use the Download button.');
        }
    };

    const downloadImage = () => {
        if (logoImage) {
            const link = document.createElement('a');
            link.href = logoImage;
            link.download = `${formData.brand_name.replace(/\s+/g, '_')}_logo.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <div className="min-h-screen bg-[var(--color-black)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                        Design Your <span className="text-[var(--color-gold)]">Logo</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">
                        Create high-quality, professional AI logos instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                    placeholder="e.g. Aurum"
                                    value={formData.brand_name}
                                    onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Industry</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                    placeholder="e.g. Luxury Real Estate"
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Keywords / Style</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                    placeholder="e.g. Minimalist, Geometric"
                                    value={formData.keywords}
                                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-gold)] mb-2">Primary Color</label>
                                <div className="flex space-x-4 items-center">
                                    <input
                                        type="color"
                                        className="h-12 w-12 bg-transparent border-none cursor-pointer"
                                        value={formData.color === 'gold' ? '#D4AF37' : formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="flex-1 px-4 py-3 bg-[var(--color-black)] border border-[var(--color-charcoal-light)] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all"
                                        placeholder="Color name or hex (e.g. Gold, #FF0000)"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    />
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
                                        Designing...
                                    </>
                                ) : (
                                    <>
                                        <Image className="-ml-1 mr-2 h-5 w-5" />
                                        Generate Logo
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Result Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[var(--color-charcoal)] p-8 rounded-2xl border border-[var(--color-charcoal-light)] flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
                    >
                        {error && (
                            <div className="bg-red-900/20 border border-red-900/50 text-red-200 px-4 py-3 rounded-lg mb-4 w-full text-center">
                                {error}
                            </div>
                        )}

                        {logoImage ? (
                            <div className="w-full flex flex-col items-center space-y-6">
                                <div className="bg-black p-2 rounded-xl border border-[var(--color-charcoal-light)] shadow-inner w-full flex items-center justify-center aspect-square overflow-hidden">
                                    <img
                                        src={logoImage}
                                        alt="Generated Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={downloadImage}
                                        className="flex items-center px-6 py-3 border border-[var(--color-gold)] rounded-lg text-sm font-bold text-[var(--color-black)] bg-[var(--color-gold)] hover:bg-white transition-all duration-300 uppercase tracking-wider"
                                    >
                                        <Download className="h-5 w-5 mr-2" />
                                        Download PNG
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">
                                <div className="border-2 border-dashed border-[var(--color-charcoal-light)] rounded-xl w-64 h-64 flex items-center justify-center mx-auto mb-4">
                                    <Image className="h-12 w-12 opacity-20" />
                                </div>
                                <p>Enter your brand details to generate a logo.</p>
                            </div>
                        )}

                        {/* Shimmer effect while loading */}
                        {loading && (
                            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LogoGenerator;
