import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

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

        const timeData = await prisma.data.findMany({
            where: { client_id: {in : clientIDs} },
            select: { up_time: true, off_time: true}
        });

        return NextResponse.json({
            timeData
        }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching time data:", error);
        return NextResponse.json(
            {
                message: "An error occurred while fetching time data.",
            },
            {
                status: 500,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
