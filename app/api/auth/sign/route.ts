import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE, SECRET } from "@/constants";
import {PrismaClient} from '@prisma/client';




/**
 * @swagger
 * /api/auth/sign:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, password, and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal Server Error
 */

const prisma = new PrismaClient();
export async function POST(request : Request) {
    const body = await request.json();
    const {username, password, email} = body;

    try {
        const user = await prisma.users.create({
            data: {
                username: username,
                password: password,
                email: email,
            }
        });

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
        console.error("Error registering user:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error, Couldn't register user in db" }), {
            status: 500,
        });
    }
    finally {
        await prisma.$disconnect();
    }
}