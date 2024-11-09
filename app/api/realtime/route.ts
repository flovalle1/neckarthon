import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse/node';
import { NextRequest, NextResponse } from 'next/server';

const apiKey: string = process.env.PULSE_API_KEY ?? '';

const prisma = new PrismaClient().$extends(
    withPulse({ apiKey: apiKey })
);

let activeStream: ReadableStream | null = null;

export async function GET(req: NextRequest) {
    const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    if (activeStream) {
        activeStream.cancel();
        activeStream = null;
    }

    activeStream = new ReadableStream({
        async start(controller) {
            try {
                const stream = await prisma.user.stream({
                    create: {},               // Filter for create-events
                    name: 'user-create-events' // Ensure no events get lost
                });
                for await (const event of stream) {
                    controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
                }
            } catch (error) {
                console.error('Stream error:', error);
                controller.error(error);
            }
        },
        cancel() {
            console.log('Stream canceled');
        }
    });

    return new NextResponse(activeStream, { headers });
}