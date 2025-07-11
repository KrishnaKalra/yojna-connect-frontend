'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Spinner } from "@/components/ui/spinner";

export default function SchemeDetail({ params }) {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: session } = useSession();
    const [schemeName, setSchemeName] = useState('');

    const handleSubmit = (e) => {

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
                    <CardTitle className="text-xl font-bold text-gray-800">QnA Bot</CardTitle>
                    <CardDescription className="text-gray-600">
                        Ask questions about the scheme
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ScrollArea className="h-64 mb-4 p-4 border rounded-lg bg-gray-50">
                        {/* {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 p-2 rounded-lg ${
                            msg.isUser
                                ? 'bg-blue-100 text-blue-800 ml-auto max-w-[80%]'
                                : 'bg-gray-200 text-gray-800 mr-auto max-w-[80%]'
                            }`}
                        >
                            {msg.text}
                        </div>
                        ))} */}
                        Messages...
                    </ScrollArea>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                        type="text"
                        // value={question}
                        // onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                        Send
                        </Button>
                    </form>
                    </CardContent>
                </Card>
                </div>
            </div>
            </div>
        </>
    );
}