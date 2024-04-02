import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE, SECRET } from "@/constants";
import { PrismaClient } from '@prisma/client';
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: Request, context:  any) {
    console.log(context," ",context.params," ", context.params.id)
    const {params} = context
    const userId  = +params.id
    console.log("userId : ",userId," params : ",params)
    try {
        const user = await prisma.users.findUnique({
            where: { user_id: userId } // Utiliser userId pour rechercher l'utilisateur
        });
        if (!user) {
            return NextResponse.json({
                message: "Unauthorized",
            }, {
                status: 401,
            });
        }

        // Authentification réussie, maintenant récupérez les données de géolocalisation de l'utilisateur
        const userLocations = await prisma.data.findMany({
            where: { client_id: userId },
            select: { geolocation: true }
        });

        // Générez un jeton d'authentification
        const token = sign(
            {
                userId,
            },
            SECRET, {
            expiresIn: MAX_AGE,
        });

        // Serialisez le jeton et définissez le cookie
        const serialized = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/"
        });

        // Réponse réussie avec les données de géolocalisation
        return new Response(JSON.stringify({
            message: 'Authenticated !',
            userLocations
        }), {
            status: 200,
            headers: { 'Set-Cookie': serialized },
        });
    } catch (error) {
        console.error("Error authenticating user:", error);
        return NextResponse.json(
            {
                message: "An error occurred while authenticating user.",
            },
            {
                status: 500,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
