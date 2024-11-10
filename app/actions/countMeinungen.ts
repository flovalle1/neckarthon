'use server'

import { PrismaClient } from "@prisma/client";

export type Meinung = {
    browser: string;
    visitors: number;
    fill: string;
}

export interface MeinungsAPI {
    meinungen: Meinung[];
}

export async function countMeinungen(): Promise<MeinungsAPI> {
    const prisma = new PrismaClient();
    const meinung_one = await prisma.meinungsbild.count({
        where: {
            meinung: "trifft voll zu"
        }
    })
    const meinung_two = await prisma.meinungsbild.count({
        where: {
            meinung: "trifft ziemlich zu"
        }
    })
    const meinung_three = await prisma.meinungsbild.count({
        where: {
            meinung: "trifft etwas zu"
        }
    })
    const meinung_four = await prisma.meinungsbild.count({
        where: {
            meinung: "trifft wenig zu"
        }
    })
    const meinung_five = await prisma.meinungsbild.count({
        where: {
            meinung: "trifft gar nicht zu"
        }
    })

    const chartData = [
        { browser: "Trifft voll zu", visitors: meinung_one, fill: "var(--color-chrome)" },
        { browser: "Trifft ziemlich zu", visitors: meinung_two, fill: "var(--color-safari)" },
        { browser: "Trifft etwas zu", visitors: meinung_three, fill: "var(--color-firefox)" },
        { browser: "Trifft wenig zu", visitors: meinung_four, fill: "var(--color-edge)" },
        { browser: "Trifft garnicht zu", visitors: meinung_five, fill: "var(--color-other)" },
    ];

    return { meinungen: chartData };
}