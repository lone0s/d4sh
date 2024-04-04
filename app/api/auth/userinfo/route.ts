// Route to edit users

import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {COOKIE_NAME} from "@/constants";

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

export async function GET(req: NextApiRequest) {
    const cookieStore = cookies();
    const user_id = cookieStore.get(COOKIE_NAME)?.value;

    if (!user_id) {
        return NextResponse.json({
            message: "No cookies found, what are you trying to do ?",
        }, {
            status: 404,
        });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { user_id: parseInt(user_id)},
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, {
                status: 404,
            });
        }

        return NextResponse.json({ message: 'Found user', user: user });
    } catch (error) {
        console.error("Error finding user:", error);
        return NextResponse.json(
            {
                message: "An error occurred while fetching for user data.",
            },
            {
                status: 500,
            }
        );
    }
}