import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

/**
 * @swagger
 * /api/getDevice/{id}:
 *   get:
 *     summary: Get device data by client ID
 *     description: Retrieve device data associated with a specific client ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Client ID
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: An error occurred while fetching device data.
 */

const prisma = new PrismaClient();

export async function GET(request: Request, context:  any) {
    const { params } = context;
    const clientId = +params.id;

    try {
        const clientID = await prisma.clients.findMany({
            where : {user_id : clientId},
            select : {client_id : true}
        })
        const clientIDs = clientID.map(client => client.client_id);
        const deviceData = await prisma.data.findMany({
            where: { client_id:{ in: clientIDs } },
            select: { device_type: true }
        });

        return NextResponse.json({
            deviceData
        }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching device data:", error);
        return NextResponse.json(
            {
                message: "An error occurred while fetching device data.",
            },
            {
                status: 500,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
