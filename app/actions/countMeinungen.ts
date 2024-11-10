'use server'

import { PrismaClient } from "@prisma/client";
export interface MeinungsAPI {
    meinungen: {
        meinung_one: number;
        meinung_two: number;
        meinung_three: number;
        meinung_four: number;
        meinung_five: number;
    }
}

export async function countMeinungen(): Promise<MeinungsAPI> {
    const prisma = new PrismaClient();
    const meinung_one = await prisma.meinungsbild.count({
        where: {
            meinung: "string_one"
        }
    })
    const meinung_two = await prisma.meinungsbild.count({
        where: {
            meinung: "string_one"
        }
    })
    const meinung_three = await prisma.meinungsbild.count({
        where: {
            meinung: "string_one"
        }
    })
    const meinung_four = await prisma.meinungsbild.count({
        where: {
            meinung: "string_one"
        }
    })
    const meinung_five = await prisma.meinungsbild.count({
        where: {
            meinung: "string_one"
        }
    })

    return { meinungen: { meinung_one, meinung_two, meinung_three, meinung_four, meinung_five } }
}