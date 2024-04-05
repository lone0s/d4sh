import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";



/**
 * @swagger
 * /api/getVictims/{id}:
 *   get:
 *     summary: Get victims linked to a user
 *     tags : 
 *       - Victims
 *     description : Retrieve "victims" linked to a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description : Victims not found
 *       500: 
 *         description: An error occurred while deleting victim
 */

const prisma = new PrismaClient();
export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const uid :number = parseInt(params.id);

    try {
        const user = await prisma.users.findUnique({
            where: {user_id: uid}
        })

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, {
                status: 404,
            });
        }

        const victims = await prisma.clients.findMany({
            where: {user_id: uid}
        })


        return NextResponse.json({message: 'Found victims', victims: victims})
    }
    catch (e) {
        return NextResponse.json(
            {
                message: "An error occurred while getting user's linked data.",
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