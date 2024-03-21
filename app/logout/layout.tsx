"use client"
import axios, { AxiosError } from "axios";
import  {useRouter } from "next/navigation";
import {useState, useEffect } from "react";


// Permet de protéger l'accès au dashboard (vérification de la présence d'un cookie et valide => /api/auth/me) 

interface UserResponse{
    user : string | null;
    error : AxiosError | null;
}
async function getUser() : Promise<UserResponse>{
    try {
        const {data} = await axios.get('/api/auth/logout');
        return {
            user : data,
            error : null,
            
        }
    }catch(e){
        const error = e as AxiosError;
        return {
            user : null,
            error : error,
        }
    }
}

const DashLayout = ({children,}:{children : React.ReactNode;}) => {
    const [isAuth, setIsAuth] = useState<boolean>(true);

    const router = useRouter();

    useEffect(()=>{
        (async()=>{
            const {user} =  await getUser();
            router.push("/login")
            setIsAuth(false)
            console.log(user)
            return;
    })();},[router]);

    if(isAuth){
        return <p>Disconnecting ...</p>;
    }   
    return <main><header></header>{children}</main>



};


export default DashLayout;