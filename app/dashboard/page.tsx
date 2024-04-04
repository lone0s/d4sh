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
    const decodedToken = decode(jwt.value, {
        json: true,
    })

    if (!decodedToken || !("userId" in decodedToken)) {
        return <div>Unauthorized</div>
    }

    const userId = decodedToken.userId
    const user = await prisma.users.findUnique({
        where: {
            user_id: userId,
        },
    })

    return (
        <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
            <Sidebar>
                <Profile user={user} />
            </Sidebar>
            <div style={{ flex: 1, marginLeft: "20px" }}>
                <h1>Dashboard</h1>
                <GridLayout />
            </div>
        </div>
    )
}

export default Dashboard