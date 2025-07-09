'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SchemeDetail({ params }) {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) return;
        const get = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/scheme/${params}`,
                    {
                        user_query: "In short, give me the summary of details about this scheme, including eligibility and uses"
                    },
                    {
                        headers: {
                        Authorization: `Bearer ${session.access_token}`,
                        }
                    }
                );
                setSummary(data);
            } catch (err) {
                setError('Failed to load scheme details');
            } finally {
                setIsLoading(false);
            }
        };
        get();
    }, [params, session]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <p>{summary}</p>
        </>
    );
}