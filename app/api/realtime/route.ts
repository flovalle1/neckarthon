import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse/node';
import { NextRequest, NextResponse } from 'next/server';

const apiKey: string = process.env.PULSE_API_KEY ?? '';

const prisma = new PrismaClient().$extends(
    withPulse({ apiKey: apiKey })
);

export async function GET(req: NextRequest) {
    const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    const stream = new ReadableStream({
        async start(controller) {
            const stream = await prisma.user.stream();
            for await (const event of stream) {
                controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
            }
        },
    });

    return new NextResponse(stream, { headers });
}