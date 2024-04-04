import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE, SECRET } from "@/constants";
import { PrismaClient } from '@prisma/client';
import { sign } from "jsonwebtoken";


/**
 * @swagger
 * /api/getGeolocation/{id}:
 *   get:
 *     summary: Fetch user location data
 *     description: Retrieve user location data based on user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An error occurred while authenticating user or fetching user location data.
 */


const prisma = new PrismaClient();

export async function GET(request: Request, context:  any) {
    console.log(context," ",context.params," ", context.params.id)
    const {params} = context
    const userId  = +params.id
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

        // authentification réussie, maintenant on récupère les données de géolocalisation de l'utilisateur
        const clientID = await prisma.clients.findMany({
            where : {user_id : userId},
            select : {client_id : true}
        })
        
        const clientIDs = clientID.map(client => client.client_id);
        const userLocations = await prisma.data.findMany({
            where: { client_id: { in: clientIDs } },
            select: { geolocation: true }
        });
        // génère un jeton d'authentification
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
