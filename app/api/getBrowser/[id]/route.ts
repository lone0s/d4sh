import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

/**
 * @swagger
 * /api/getBrowser/{id}:
 *   get:
 *     summary: Get browser data by client ID
 *     description: Retrieve browser data associated with a specific client ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Client ID
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: An error occurred while fetching browser data.
 */

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
    const { params } = context;
    const clientId = +params.id;

    try {
        const clientID = await prisma.clients.findMany({
            where : {user_id : clientId},
            select : {client_id : true}
        })
        const clientIDs = clientID.map(client => client.client_id);

        const browserData = await prisma.data.findMany({
            where: { client_id: {in : clientIDs} },
            select: { browser_info: true }
        });

        return NextResponse.json({
            browserData
        }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching browser data:", error);
        return NextResponse.json(
            {
                message: "An error occurred while fetching browser data.",
            },
            {
                status: 500,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
