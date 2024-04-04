import {verify, decode} from "jsonwebtoken";
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import {COOKIE_NAME} from "@/constants";
import {cookies} from "next/headers";

export async function GET(req: NextApiRequest) {

    const cookieStore = cookies();

    const jwtCookie = cookieStore.get(COOKIE_NAME);

    if (!jwtCookie) {
        return NextResponse.json({
            message: "No cookies, Unauthorized",
        }, {
            status: 401,
        });
    }

    if (!verify(jwtCookie.value, process.env.JWT_SECRET as string)) {
        return NextResponse.json({
            message: "Not verified, Unauthorized",
        }, {
            status: 401,
        });
    }

    return NextResponse.json(
        {
            message: decode(jwtCookie.value, {json: true})!.userId,
        },
        {
            status: 200,
        }
    )
}