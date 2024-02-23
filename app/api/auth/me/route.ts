import { COOKIE_NAME, SECRET } from "@/constants";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore = cookies();

    const token = cookieStore.get(COOKIE_NAME);
    
    if (!token){
        return NextResponse.json({
            message : "Unauthorized",
        },{
            status : 401,
        });
    }
    try{
        verify(token.value,SECRET);

        const response = {
            user : 'Ok User ! '
        }

        return new Response(JSON.stringify(response),{
            status : 200,
        })
    }catch(e){
        const seralized = serialize(COOKIE_NAME, "", {
            httpOnly: true,
            secure:process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge : -1,
            path: "/"
        });
        return NextResponse.json({
            message : "Something went wrong",
        },{
            status : 400,
            headers : {'Set-Cookie' : seralized},
        });
    }
}