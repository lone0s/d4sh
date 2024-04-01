// Route to edit users

import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();


export async function POST(req: NextApiRequest) {
    const { user_id, username, email } = await req.body;

    try {
        // Find the current user
        const user = await prisma.users.findUnique({
            where: { user_id: user_id},
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, {
                status: 404,
            });
        }

        // Update user data
        const updatedUser = await prisma.users.update({
            where: { user_id: user.user_id},
            data: { username, email },
        });

        return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            {
                message: "An error occurred while authenticating user.",
            },
            {
                status: 500,
            }
        );
    }
}