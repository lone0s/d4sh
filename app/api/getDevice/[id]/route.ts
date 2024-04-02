import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context:  any) {
    const { params } = context;
    const clientId = +params.id;

    try {
        const deviceData = await prisma.data.findMany({
            where: { client_id: clientId },
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
