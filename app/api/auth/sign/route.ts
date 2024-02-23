import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE, SECRET } from "@/constants";

export async function POST(request : Request){
    const body = await request.json();
    const { username , password,email} = body;



    const token = sign(
        {
            username,
        },
        SECRET,{
            expiresIn : MAX_AGE,
        }
    );

    const seralized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure:process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge : MAX_AGE,
        path: "/"
    });
    const response = {
        message : 'Authenticated !'
    }
    return new Response(JSON.stringify(response),{
        status : 200,
        headers : {'Set-Cookie' : seralized},
    })
}