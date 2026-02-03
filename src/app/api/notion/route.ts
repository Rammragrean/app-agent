import { NextRequest, NextResponse } from 'next/server';
import { getTasksFromNotion, getTeamPerformance } from '@/lib/notion';

// This is required for Next.js 15 dynamic routes
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (type === 'tasks') {
      const tasks = await getTasksFromNotion();
      return NextResponse.json({ tasks });
    } else if (type === 'performance') {
      const performance = await getTeamPerformance();
      return NextResponse.json({ performance });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
