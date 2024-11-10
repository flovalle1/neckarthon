import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newUser = await prisma.meinungsbild.create({
            data: {
                name: data.name,
                number: data.number,
                meinung: data.tag
            }
        });
        return NextResponse.json(newUser);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}