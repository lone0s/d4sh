import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';



/**
 * @swagger
 * /api/getIP/{id}:
 *   get:
 *     summary: Fetch client IP  by ID
 *     description: Fetch client IP based on client ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Client ID
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: An error occurred while fetching client data.
 */


const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
    const { params } = context;
    const clientId = +params.id;

    try {
        const clientData = await prisma.clients.findMany({
            where: { user_id: clientId },
            select: { client_id : true,ip_address: true }
        });

        return NextResponse.json({
            clientData
        }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching client data:", error);
        return NextResponse.json(
            {
                message: "An error occurred while fetching client data.",
            },
            {
                status: 500,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
