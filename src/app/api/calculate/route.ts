import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { parseExpression, formatResult } from '@/lib/parser';
import { Calculation } from '@/entities/Calculation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { expression } = body as { expression: string };

    if (!expression || typeof expression !== 'string') {
      return NextResponse.json(
        { error: 'Invalid expression' },
        { status: 400 }
      );
    }

    const trimmedExpression = expression.trim();
    if (trimmedExpression.length === 0) {
      return NextResponse.json(
        { error: 'Expression cannot be empty' },
        { status: 400 }
      );
    }

    let result: string;
    try {
      const numericResult = parseExpression(trimmedExpression);
      result = formatResult(numericResult);
    } catch (parseError) {
      const errorMessage =
        parseError instanceof Error ? parseError.message : 'Parse error';
      return NextResponse.json({ error: errorMessage }, { status: 422 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);

    const calculation = repo.create({
      expression: trimmedExpression,
      result,
    });
    await repo.save(calculation);

    return NextResponse.json({ expression: trimmedExpression, result });
  } catch (error) {
    console.error('Calculate error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
