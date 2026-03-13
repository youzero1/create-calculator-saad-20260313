'use client';

import { useState, useCallback } from 'react';
import type { HistoryEntry } from '@/app/page';

interface CalculatorProps {
  onCalculation: (entry: HistoryEntry) => void;
}

type ButtonConfig = {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'action' | 'equals';
  wide?: boolean;
};

const BUTTONS: ButtonConfig[][] = [
  [
    { label: 'C', value: 'C', type: 'action' },
    { label: '(', value: '(', type: 'operator' },
    { label: ')', value: ')', type: 'operator' },
    { label: '÷', value: '/', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '×', value: '*', type: 'operator' },
  ],
  [
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '-', value: '-', type: 'operator' },
  ],
  [
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '+', value: '+', type: 'operator' },
  ],
  [
    { label: '0', value: '0', type: 'number', wide: true },
    { label: '.', value: '.', type: 'number' },
    { label: '=', value: '=', type: 'equals' },
  ],
];

export default function Calculator({ onCalculation }: CalculatorProps) {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [error, setError] = useState('');
  const [justCalculated, setJustCalculated] = useState(false);

  const handleButton = useCallback(
    async (btn: ButtonConfig) => {
      setError('');

      if (btn.value === 'C') {
        setExpression('');
        setDisplay('0');
        setJustCalculated(false);
        return;
      }

      if (btn.value === '=') {
        if (!expression) return;
        try {
          const res = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || 'Error');
            setDisplay('Error');
          } else {
            setDisplay(data.result);
            setExpression(data.result);
            setJustCalculated(true);
            onCalculation({
              id: Date.now(),
              expression,
              result: data.result,
              createdAt: new Date().toISOString(),
            });
          }
        } catch {
          setError('Network error');
          setDisplay('Error');
        }
        return;
      }

      // If just calculated and user presses a number, start fresh
      if (justCalculated && btn.type === 'number') {
        setExpression(btn.value);
        setDisplay(btn.value);
        setJustCalculated(false);
        return;
      }

      // If just calculated and user presses an operator, continue from result
      if (justCalculated && btn.type === 'operator') {
        setJustCalculated(false);
      }

      const newExpression = expression + btn.value;
      setExpression(newExpression);
      setDisplay(newExpression);
    },
    [expression, justCalculated, onCalculation]
  );

  const getButtonClass = (btn: ButtonConfig): string => {
    const base =
      'flex items-center justify-center rounded-xl text-xl font-semibold transition-all duration-150 active:scale-95 cursor-pointer select-none h-14';

    if (btn.type === 'action') {
      return `${base} bg-red-500 hover:bg-red-400 text-white`;
    }
    if (btn.type === 'operator') {
      return `${base} bg-indigo-600 hover:bg-indigo-500 text-white`;
    }
    if (btn.type === 'equals') {
      return `${base} bg-emerald-500 hover:bg-emerald-400 text-white`;
    }
    return `${base} bg-slate-700 hover:bg-slate-600 text-white`;
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl w-72">
      {/* Display */}
      <div className="bg-slate-900 rounded-xl p-4 mb-4 min-h-[80px] flex flex-col justify-end items-end overflow-hidden">
        {error ? (
          <span className="text-red-400 text-sm mb-1">{error}</span>
        ) : null}
        <div
          className="text-white text-2xl font-mono w-full text-right overflow-hidden text-ellipsis whitespace-nowrap"
          title={display}
        >
          {display || '0'}
        </div>
        <div className="text-slate-400 text-sm font-mono w-full text-right overflow-hidden text-ellipsis whitespace-nowrap mt-1">
          {expression && !justCalculated ? expression : ''}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {BUTTONS.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleButton(btn)}
                className={`${getButtonClass(btn)} ${btn.wide ? 'col-span-2' : 'col-span-1'}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
