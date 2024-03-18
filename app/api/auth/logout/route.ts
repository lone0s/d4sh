import { COOKIE_NAME, SECRET } from "@/constants";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore = cookies();

    const token = cookieStore.get(COOKIE_NAME);
    const seralized = serialize(COOKIE_NAME, "", {
        httpOnly: true,
        secure:process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge : -1,
        path: "/"
    });
    if(token){
        try{
            verify(token.value,SECRET);
            const response = {
                user : 'Disconnected !'
            }
           
            return new Response(JSON.stringify(response),{
                status : 200,
                headers : {'Set-Cookie' : seralized},
            })
        }catch(e){
            return NextResponse.json({
                message : "Something went wrong",
            },{
                status : 400,
                headers : {'Set-Cookie' : seralized},
            });
        }
    }
}