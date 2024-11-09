'use server'

import { PrismaClient } from "@prisma/client";
import { User } from "../page";
export interface UsersAPI {
    users: User[];
    userCount: number;
}

export async function fetchUsers(): Promise<UsersAPI> {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany()
    const userCount = await prisma.user.count()
    return { users, userCount }
}