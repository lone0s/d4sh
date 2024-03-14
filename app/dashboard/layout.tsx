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
        const {data} = await axios.get('/api/auth/me');
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
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const router = useRouter();

    useEffect(()=>{
        (async()=>{
            const {user, error} = await getUser();
            if (error){
                router.push("/login")
                return;
            }
        setIsAuth(true);
    })();},[router]);

    if(!isAuth){
        return <p>Loading ...</p>;
    }   
    return <main><header></header>{children}</main>



};


export default DashLayout;