import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE, SECRET } from "@/constants";
import {PrismaClient} from '@prisma/client';



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Check login credentials
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               format : string
 *               description: Username
 *             password:
 *               type: string
 *               format : string
 *               description: User password
 *     responses:
 *       200:
 *         description: Authenticated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An error occurred while authenticating user.

 */


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

        const userId = user.user_id
        

        const token = sign(
            {
                userId
            },
            SECRET, {
                expiresIn: MAX_AGE,
            }
        );

        console.log(token)

        const seralized = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/"
        });

        return NextResponse.json(
            { message: "Authenticated" },
            {
                status: 200,
                headers: { 'Set-Cookie': seralized },
            }
        );
        
        
        
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