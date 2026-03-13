import 'reflect-metadata';
import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/db';
import { Calculation } from '@/lib/entities/Calculation';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);
    const records = await repo.find({
      order: { createdAt: 'DESC' },
      take: 20,
    });
    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error('GET /api/history error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { expression, result } = body as { expression: string; result: string };

    if (!expression || result === undefined) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);

    const calc = repo.create({ expression, result });
    await repo.save(calc);

    return NextResponse.json({ success: true, data: calc }, { status: 201 });
  } catch (error) {
    console.error('POST /api/history error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save calculation' }, { status: 500 });
  }
}
