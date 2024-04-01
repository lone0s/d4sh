import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE, SECRET } from "@/constants";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request : Request){
    const body = await request.json();
    const { username , password} = body;

    try {
        const user = await prisma.users.findUnique({
            where: {username: username, password: password}
        });
        if (!user) {
            return NextResponse.json({
                message: "Unauthorized",
            }, {
                status: 401,
            });
        }

        const token = sign(
            {
                username,
            },
            SECRET, {
                expiresIn: MAX_AGE,
            }
        );

        const seralized = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/"
        });

        const response = {
            message: 'Authenticated !'
        }

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {'Set-Cookie': seralized},
        })
    }

    catch (error) {
        console.error("Error authenticating user:", error);
        return NextResponse.json(
            {
                message: "An error occurred while authenticating user.",
            },
            {
                status: 500,
            }
        );
    }
    finally {
        await prisma.$disconnect();
    }
}