import { COOKIE_NAME } from "@/constants"
import { PrismaClient } from "@prisma/client"
import { decode, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import Profile from "../components/profile"
import Sidebar from "../components/sidebar"
import { GridLayout } from "./gridlayout"

const prisma = new PrismaClient()

const Dashboard = async () => {
    const jwt = cookies().get(COOKIE_NAME)
    if (!jwt || !verify(jwt.value, process.env.JWT_SECRET as string)) {
        return <div>Unauthorized</div>
    }

    console.log("here 1")
    const decodedToken = decode(jwt.value, {
        json: true,
    })

    console.log(decodedToken)

    console.log("here 2")
    if (!decodedToken /*|| !("userId" in decodedToken)*/) {
        return <div>Unauthorized</div>
    }


    let user: {     user_id: number;     username: string;     password: string;     email: string; } | null = null;

    //HOTFIX : JWT cookie value is sometimes username, sometimes userId, couldn't identify why, so dealt with both
    if ("userId" in decodedToken){
        console.log("case userId")
        const userId = decodedToken.userId
        user = await prisma.users.findUnique({
            where: {
                user_id: userId,
            },
        })
    }
    if ("username"in decodedToken) {
        console.log("case username")
        const username = decodedToken.username
        user = await prisma.users.findUnique({
            where: {
                username: username
            }
        })
    }

    return (
        <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
            <Sidebar>
                <Profile user={user} />
            </Sidebar>
            <div style={{ flex: 1, marginLeft: "20px" }}>
                <h1>Dashboard</h1>
                <GridLayout  userId={user!.user_id}/>
            </div>
        </div>
    )
}

export default Dashboard