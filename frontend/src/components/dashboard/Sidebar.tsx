import React from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
    const router = useRouter();

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col">
            <div className="space-y-2 flex-grow">
                <button 
                    className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
                    onClick={() => router.push('/dashboard')}
                >
                    See All Books
                </button>
                <button
                    className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
                    onClick={() => router.push('/dashboard/add-book')}
                >
                    Add Book
                </button>
            </div>
            <div className="mt-auto">
                <button
                    onClick={onLogout}
                    className="w-full p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}