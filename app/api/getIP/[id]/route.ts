import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
    const { params } = context;
    const clientId = +params.id;

    try {
        const clientData = await prisma.clients.findUnique({
            where: { client_id: clientId },
            select: { ip_address: true }
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
