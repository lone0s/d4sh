import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @Swagger
 * /api/getData/{victimId}:
 *      get:
 *          summary: Get victim data
 *          tags:
 *              - Victim Data
 *          description: Retrieve data associated with a specific victim ID
 *          parameters:
 *          -   in: path
 *              name: victimId
 *              description: Victim ID
 *              required: true
 *          responses:
 *              200:
 *                  description: Ok
 *              404:
 *                  description: Data not found
 *              500:
 *                  description: An error occurred while getting user's linked data.
 */
export async function GET(req: NextRequest, {params}: {params: {victimId: string}}) {
    const uid: number = parseInt(params.victimId);

    try{
        let datas = await prisma.data.findMany({
            where: {client_id: uid}
        })

        if (!datas) {
            return NextResponse.json({
                message: "Data not found",
            }, {
                status: 404,
            });
        }

        return NextResponse.json({message: 'Found victim data', data: datas})
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
