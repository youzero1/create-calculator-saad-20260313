'use client';

import { useState, useEffect, useCallback } from 'react';
import Calculator from '@/components/Calculator';
import History from '@/components/History';

export interface HistoryEntry {
  id: number;
  expression: string;
  result: string;
  createdAt: string;
}

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const onCalculation = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 20));
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Calculator
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          <div className="w-full md:w-auto flex justify-center">
            <Calculator onCalculation={onCalculation} />
          </div>
          <div className="w-full md:flex-1 md:max-w-sm">
            <History history={history} loading={loadingHistory} />
          </div>
        </div>
      </div>
    </main>
  );
}
