import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader, User } from 'lucide-react';
import { endpoints } from '../api/client';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    text: string;
    isUser: boolean;
}

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { text: "Greetings. I am Creovate. How may I assist you today?", isUser: false }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setLoading(true);

        try {
            const response = await endpoints.chat({ message: userMessage });
            setMessages(prev => [...prev, { text: response.data.reply || response.data, isUser: false }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { text: "I apologize, but I am currently unable to process your request.", isUser: false }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-black)] flex flex-col pt-20">
            <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32">
                <div className="text-center mb-8">
                    <span className="px-3 py-1 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-xs font-semibold tracking-widest uppercase bg-[var(--color-gold)]/10">
                        AI Concierge
                    </span>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border ${msg.isUser
                                            ? 'bg-[var(--color-charcoal-light)] border-[var(--color-charcoal-light)] ml-3'
                                            : 'bg-[var(--color-gold)] border-[var(--color-gold)] mr-3'
                                        }`}>
                                        {msg.isUser ? (
                                            <User className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <MessageSquare className="h-4 w-4 text-[var(--color-black)]" />
                                        )}
                                    </div>

                                    <div className={`px-6 py-4 rounded-2xl text-sm font-light leading-relaxed shadow-sm ${msg.isUser
                                            ? 'bg-[var(--color-charcoal)] border border-[var(--color-charcoal-light)] text-white rounded-tr-none'
                                            : 'bg-[var(--color-black)] border border-[var(--color-charcoal-light)] text-gray-300 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center mr-3">
                                        <Loader className="h-4 w-4 text-[var(--color-black)] animate-spin" />
                                    </div>
                                    <div className="bg-[var(--color-black)] border border-[var(--color-charcoal-light)] px-6 py-4 rounded-2xl rounded-tl-none">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-black)]/80 backdrop-blur-xl border-t border-[var(--color-charcoal-light)] p-4">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            className="w-full pl-6 pr-14 py-4 bg-[var(--color-charcoal)] border border-[var(--color-charcoal-light)] rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all shadow-lg"
                            placeholder="Type your inquiry..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-2 p-2 bg-[var(--color-gold)] text-[var(--color-black)] rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
