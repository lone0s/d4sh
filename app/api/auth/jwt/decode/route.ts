import {verify, decode} from "jsonwebtoken";
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import { cookies } from "next/headers";
import {COOKIE_NAME} from "@/constants";

export async function GET(req: NextApiRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    console.log(token)
    const jwtCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("d4ashJWT="))
        ?.split("=")[1]

    if (!jwtCookie) {
        return NextResponse.json({
            message: "No cookies, Unauthorized",
        }, {
            status: 401,
        });
    }

    if (!verify(jwtCookie, process.env.JWT_SECRET as string)) {
        return NextResponse.json({
            message: "Not verified, Unauthorized",
        }, {
            status: 401,
        });
    }

    return NextResponse.json(
        {
            message: decode(jwtCookie),
        },
        {
            status: 200,
        }
    )
}