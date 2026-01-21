import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm the Perfect FX AI Assistant. How can I help you today?", isBot: true }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputText, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Simulate Bot Response
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let botResponse = "I'm not sure about that. Try asking about our 'prices', 'courses', or 'mentorship'.";

            if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('plan')) {
                botResponse = "We offer three plans: Monthly ($49), Yearly ($497), and Lifetime Elite ($997). Check the Pricing section for more details!";
            } else if (lowerInput.includes('course') || lowerInput.includes('learn')) {
                botResponse = "Our curriculum covers everything from Basic Forex Foundation to Advanced Market Structure and my Personal Scalping Strategy.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botResponse = "Hello! Ready to master the markets?";
            } else if (lowerInput.includes('contact') || lowerInput.includes('support')) {
                botResponse = "You can reach our support team at support@perfectfx.com or via the WhatsApp link in the dashboard.";
            }

            const botMsg = { id: Date.now() + 1, text: botResponse, isBot: true };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <div className="chatbot-container">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="chat-window glass"
                        >
                            <div className="chat-header">
                                <div className="flex items-center gap-2">
                                    <Bot size={20} className="text-primary" />
                                    <span className="font-bold text-white">Perfect FX AI</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="close-btn">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="chat-messages">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                                        {msg.text}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    placeholder="Ask me anything..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button onClick={handleSend} className="send-btn">
                                    <Send size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                </button>
            </div>

            <style jsx="true">{`
        .chatbot-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 90;
        }

        .chat-toggle-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--primary);
            color: black;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chat-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
        }
        .chat-toggle-btn.open {
            transform: rotate(90deg);
            background: #333;
            color: white;
        }

        .chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            transform-origin: bottom right;
        }

        .chat-header {
            padding: 15px 20px;
            background: rgba(255,255,255,0.05);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .close-btn { background: none; border: none; color: #aaa; cursor: pointer; }
        .close-btn:hover { color: white; }

        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        .message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        .message.bot {
            align-self: flex-start;
            background: rgba(255,255,255,0.1);
            color: #eee;
            border-bottom-left-radius: 2px;
        }
        .message.user {
            align-self: flex-end;
            background: linear-gradient(135deg, var(--primary), #e6c95c);
            color: black;
            font-weight: 500;
            border-bottom-right-radius: 2px;
            box-shadow: 0 2px 8px rgba(212, 175, 55, 0.2);
        }

        .chat-input-area {
            padding: 15px;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            gap: 10px;
        }
        .chat-input-area input {
            flex: 1;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 10px 15px;
            color: white;
            outline: none;
            font-size: 0.9rem;
        }
        .chat-input-area input:focus { border-color: var(--primary); }
        .send-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary);
            border: none;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .send-btn:hover { transform: scale(1.1); }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .chatbot-container {
                bottom: 20px;
                right: 20px;
                z-index: 89;
            }
            .chat-toggle-btn {
                width: 56px;
                height: 56px;
            }
            .chat-window {
                width: 90vw;
                max-width: 350px;
                height: 70vh;
                max-height: 500px;
                right: -5vw;
            }
        }

        @media (max-width: 480px) {
            .chatbot-container {
                bottom: 16px;
                right: 16px;
            }
            .chat-toggle-btn {
                width: 52px;
                height: 52px;
            }
            .chat-window {
                width: calc(100vw - 32px);
                height: 60vh;
                right: -16px;
                bottom: 70px;
            }
            .chat-header {
                padding: 12px 16px;
            }
            .chat-messages {
                padding: 16px;
            }
        }
      `}</style>

        </>
    );
}
