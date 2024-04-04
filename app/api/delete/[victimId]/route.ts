import {NextRequest, NextResponse} from "next/server";

import {PrismaClient} from '@prisma/client';

//TODO: RAJOUTER FINALLY PRISMA DISCONNECT POUR LES AUTRES ROUTES
export async function DELETE(request: NextRequest, {params}: {params: {victimId: string}}) {
    const prisma = new PrismaClient();

    const victimId = params.victimId;
    console.log(victimId)
    try {
        const deleteData = await prisma.data.deleteMany({
            where: { client_id: parseInt(victimId) }
        });


        const deleteVictim = await prisma.clients.delete({
            where: { client_id: parseInt(victimId) }
        });

        return NextResponse.json({
            deleteVictim,
            message: "Successfully deletus victimus."
        }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting victim:", error);
        return NextResponse.json(
            {
                message: "An error occurred while deleting victim.",
            },
            {
                status: 500,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}