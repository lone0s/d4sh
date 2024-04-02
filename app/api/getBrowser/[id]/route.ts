import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
    const { params } = context;
    const clientId = +params.id;

    try {
        const browserData = await prisma.data.findMany({
            where: { client_id: clientId },
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
