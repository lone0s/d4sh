import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}: {params: {user_id: string}}) {

    const uid :number = parseInt(params.user_id);

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

        return NextResponse.json({ message: 'Found user', user: user })
    }
    catch (error) {
        console.error("Error finding user:", error);
        return NextResponse.json(
            {
                message: "An error occurred while authenticating user.",
            },
            {
                status: 500,
            }
        );
    }
}