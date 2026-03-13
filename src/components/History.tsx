'use client';

import type { HistoryEntry } from '@/app/page';

interface HistoryProps {
  history: HistoryEntry[];
  loading: boolean;
}

export default function History({ history, loading }: HistoryProps) {
  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl w-full">
      <h2 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
        <span>History</span>
        {history.length > 0 && (
          <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
            {history.length}
          </span>
        )}
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="text-slate-400 text-sm text-center py-8">
          No calculations yet.
          <br />
          Start calculating!
        </div>
      ) : (
        <ul className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {history.map((entry) => (
            <li
              key={entry.id}
              className="bg-slate-700 rounded-xl px-3 py-2 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-300 text-sm font-mono truncate flex-1">
                  {entry.expression}
                </span>
                <span className="text-xs text-slate-500 shrink-0">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-slate-400 text-xs">=</span>
                <span className="text-emerald-400 font-mono font-semibold text-sm">
                  {entry.result}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
