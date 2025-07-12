'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Spinner } from "@/components/ui/spinner";
import { Send, Bot, User } from 'lucide-react';

export default function SchemeDetail({ params }) {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: session } = useSession();
    const [schemeName, setSchemeName] = useState('');
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const scrollAreaRef = useRef(null);
    const [isChatLoading, setIsChatLoading] = useState(true);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: question,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    // Add user message to conversation
    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = question;
    setQuestion('');
    setIsChatLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/scheme/${params}`,
        {
            user_query:`${currentQuestion}`,
        },
        {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        }
     );

      if (!response) {
        throw new Error('Network response was not ok');
      }
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.data || 'Sorry, I could not process your question.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, there was an error processing your question. Please try again.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

    useEffect(() => {
        if (!session) return;

        const get = async () => {
            try {
                setIsLoading(true);
                const [{ data: summ }, { data: sch }] = await Promise.all([
                    axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/scheme/${params}`,
                        {
                            user_query:
                                "In short, give me the summary of details about this scheme, including eligibility and uses",
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${session.access_token}`,
                            },
                        }
                    ),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scheme/show_all`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`,
                        },
                    }),
                ]);
                setSummary(summ);
                const filteredSch = sch.filter((s) => s.scheme_id === parseInt(params));
                setSchemeName(filteredSch[0].scheme_name);  
            } catch (err) {
                setError("Failed to load scheme details");
            } finally {
                setIsLoading(false);
            }
        };
        

        get();
    }, [params, session]);

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Scheme Summary Section */}               
                        <div className="md:col-span-2">
                            <Card className="bg-white shadow-lg rounded-lg">
                                {isLoading ? (
                                    <Spinner />
                                    ) : (
                                        <>
                                            <CardHeader>
                                            <CardTitle className="text-2xl font-bold text-gray-800">
                                                    {schemeName || 'Scheme Summary'}
                                            </CardTitle>
                                            {/* <CardDescription className="text-gray-600">
                                                Comprehensive healthcare coverage for all citizens
                                            </CardDescription> */}
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                            <section className="prose prose-sm max-w-none text-gray-700">
                                                <h3 className="text-lg font-semibold mb-5">Overview</h3>
                                                    <ReactMarkdown>{summary}</ReactMarkdown>
                                            </section>
                                            </CardContent>
                                        </>
                                    )}
                            </Card>
                        </div>              

                    {/* QnA Bot Section */}
                        <div className="md:col-span-1">
                            <Card className="bg-white shadow-lg rounded-lg">
                                <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                    <CardTitle className="text-xl font-bold text-gray-800">QnA Bot</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Ask questions about the scheme
                                    </CardDescription>
                                    </div>
                                    {messages.length > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearHistory}
                                        className="text-sm"
                                    >
                                        Clear History
                                    </Button>
                                    )}
                                </div>
                                </CardHeader>
                                <CardContent>
                                <ScrollArea 
                                    ref={scrollAreaRef}
                                    className="h-64 mb-4 p-4 border rounded-lg bg-gray-50"
                                >
                                    {messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <div className="text-center">
                                        <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p>Start a conversation by asking a question!</p>
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="space-y-3">
                                        {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                            className={`max-w-[80%] p-3 rounded-lg ${
                                                msg.isUser
                                                ? 'bg-blue-500 text-white rounded-br-sm'
                                                : 'bg-white text-gray-800 shadow-sm border rounded-bl-sm'
                                            }`}
                                            >
                                            <div className="flex items-start gap-2">
                                                {!msg.isUser && (
                                                <Bot className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                                )}
                                                <div className="flex-1">
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <p className={`text-xs mt-1 ${
                                                    msg.isUser ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                    {msg.timestamp}
                                                </p>
                                                </div>
                                                {msg.isUser && (
                                                <User className="w-4 h-4 mt-0.5 text-blue-100 flex-shrink-0" />
                                                )}
                                            </div>
                                            </div>
                                        </div>
                                        ))}
                                        {isChatLoading && (
                                        <div className="flex justify-start">
                                            <div className="max-w-[80%] p-3 rounded-lg bg-white text-gray-800 shadow-sm border rounded-bl-sm">
                                            <div className="flex items-start gap-2">
                                                <Bot className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                                <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                    )}
                                </ScrollArea>
                                
                                <div className="flex gap-2">
                                    <Input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    />
                                    <Button
                                    onClick={handleSubmit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    disabled={isLoading || !question.trim()}
                                    >
                                    <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                </CardContent>
                            </Card>
                        </div>
                </div>
            </div>
        </>
    );
}