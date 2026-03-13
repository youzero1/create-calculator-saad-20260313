'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

interface HistoryEntry {
  id: number;
  expression: string;
  result: string;
  createdAt: string;
}

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/history');
      const json = await res.json();
      if (json.success) setHistory(json.data);
    } catch {
      // ignore
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showHistory) fetchHistory();
  }, [showHistory, fetchHistory]);

  const saveCalculation = async (expr: string, result: string) => {
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: expr, result }),
      });
    } catch {
      // ignore
    }
  };

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);

    if (prevValue !== null && !waitingForOperand) {
      const prev = parseFloat(prevValue);
      const result = calculate(prev, current, operator!);
      const newExpression = `${expression} ${display} ${op}`;
      setDisplay(String(result));
      setPrevValue(String(result));
      setExpression(newExpression);
    } else {
      setPrevValue(display);
      setExpression(`${display} ${op}`);
    }

    setOperator(op);
    setWaitingForOperand(true);
  };

  const calculate = (a: number, b: number, op: string): number | string => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        if (b === 0) return 'Error';
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = async () => {
    if (operator === null || prevValue === null) return;

    const current = parseFloat(display);
    const prev = parseFloat(prevValue);
    const result = calculate(prev, current, operator);
    const fullExpression = `${expression} ${display}`;
    const resultStr = String(result);

    setDisplay(resultStr);
    setExpression('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);

    await saveCalculation(fullExpression, resultStr);
    if (showHistory) fetchHistory();
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleToggleSign = () => {
    if (display !== '0' && display !== 'Error') {
      setDisplay(String(parseFloat(display) * -1));
    }
  };

  const handlePercent = () => {
    if (display !== 'Error') {
      setDisplay(String(parseFloat(display) / 100));
    }
  };

  const formatDisplay = (val: string) => {
    if (val === 'Error') return 'Error';
    if (val.length > 12) return parseFloat(val).toExponential(4);
    return val;
  };

  return (
    <main>
      <div className={styles.calculatorCard}>
        <div className={styles.display}>
          <div className={styles.expression}>{expression || '\u00A0'}</div>
          <div className={styles.result}>{formatDisplay(display)}</div>
        </div>
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btnFunction}`} onClick={handleClear}>
            C
          </button>
          <button className={`${styles.btn} ${styles.btnFunction}`} onClick={handleToggleSign}>
            +/-
          </button>
          <button className={`${styles.btn} ${styles.btnFunction}`} onClick={handlePercent}>
            %
          </button>
          <button
            className={`${styles.btn} ${styles.btnOperator} ${
              operator === '÷' && waitingForOperand ? styles.btnOperatorActive : ''
            }`}
            onClick={() => handleOperator('÷')}
          >
            ÷
          </button>

          {['7', '8', '9'].map((d) => (
            <button key={d} className={`${styles.btn} ${styles.btnNumber}`} onClick={() => handleDigit(d)}>
              {d}
            </button>
          ))}
          <button
            className={`${styles.btn} ${styles.btnOperator} ${
              operator === '×' && waitingForOperand ? styles.btnOperatorActive : ''
            }`}
            onClick={() => handleOperator('×')}
          >
            ×
          </button>

          {['4', '5', '6'].map((d) => (
            <button key={d} className={`${styles.btn} ${styles.btnNumber}`} onClick={() => handleDigit(d)}>
              {d}
            </button>
          ))}
          <button
            className={`${styles.btn} ${styles.btnOperator} ${
              operator === '-' && waitingForOperand ? styles.btnOperatorActive : ''
            }`}
            onClick={() => handleOperator('-')}
          >
            -
          </button>

          {['1', '2', '3'].map((d) => (
            <button key={d} className={`${styles.btn} ${styles.btnNumber}`} onClick={() => handleDigit(d)}>
              {d}
            </button>
          ))}
          <button
            className={`${styles.btn} ${styles.btnOperator} ${
              operator === '+' && waitingForOperand ? styles.btnOperatorActive : ''
            }`}
            onClick={() => handleOperator('+')}
          >
            +
          </button>

          <button
            className={`${styles.btn} ${styles.btnNumber} ${styles.btnZero}`}
            onClick={() => handleDigit('0')}
          >
            0
          </button>
          <button className={`${styles.btn} ${styles.btnNumber}`} onClick={handleDecimal}>
            .
          </button>
          <button className={`${styles.btn} ${styles.btnEquals}`} onClick={handleEquals}>
            =
          </button>
        </div>

        <button
          className={styles.historyToggle}
          onClick={() => setShowHistory((prev) => !prev)}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {showHistory && (
        <div className={styles.historyPanel}>
          <h2 className={styles.historyTitle}>Calculation History</h2>
          {historyLoading ? (
            <p className={styles.historyEmpty}>Loading...</p>
          ) : history.length === 0 ? (
            <p className={styles.historyEmpty}>No calculations yet.</p>
          ) : (
            <ul className={styles.historyList}>
              {history.map((entry) => (
                <li key={entry.id} className={styles.historyItem}>
                  <span className={styles.historyExpr}>{entry.expression}</span>
                  <span className={styles.historyResult}>= {entry.result}</span>
                  <span className={styles.historyDate}>
                    {new Date(entry.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
