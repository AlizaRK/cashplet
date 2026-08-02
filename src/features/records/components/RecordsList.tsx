// components/RecordsList.tsx
import React, { useState } from 'react';
import { useRecords } from './hooks/useRecords';
import { useGroupedRecords } from './hooks/useGroupedRecords';
import { User } from '@supabase/supabase-js';

interface RecordsListProps {
    user: User;
}

const RecordsList: React.FC<RecordsListProps> = ({ user }) => {
    const { records, loading } = useRecords(user);
    const [query, setQuery] = useState('');
    const groupedData = useGroupedRecords(records, query);

    if (loading) return <div>Loading ledger...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Transaction History</h1>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="p-2 border rounded-lg w-64 bg-white shadow-sm"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </header>

            {Object.keys(groupedData).length === 0 ? (
                <p className="text-gray-500">No transactions found.</p>
            ) : (
                Object.entries(groupedData).map(([date, items]) => (
                    <section key={date} className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            {date}
                        </h3>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <TransactionRow key={item.id} record={item} />
                            ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
};

const TransactionRow = ({ record }: { record: any }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${record.type === 'expense' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                {/* Replace with your icon logic */}
                {record.type === 'expense' ? '↓' : '↑'}
            </div>
            <div>
                <p className="font-semibold text-gray-800">{record.title}</p>
                <p className="text-xs text-gray-400">{record.bank_name} • {record.category_name}</p>
            </div>
        </div>
        <p className={`font-bold ${record.type === 'expense' ? 'text-gray-800' : 'text-green-600'}`}>
            {record.type === 'expense' ? '-' : '+'}${Math.abs(record.amount).toFixed(2)}
        </p>
    </div>
);

export default RecordsList;