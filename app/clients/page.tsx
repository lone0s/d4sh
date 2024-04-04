import Sidebar from "@/app/components/sidebar"
import { VictimsBar } from "@/app/dashboard/victimsbar"
import { PrismaClient } from "@prisma/client"
import { decode, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import Profile from "../components/profile"
import {COOKIE_NAME} from "@/constants";

const prisma = new PrismaClient()

const Clients = async () => {
    const jwt = cookies().get(COOKIE_NAME)
    if (!jwt || !verify(jwt.value, process.env.JWT_SECRET as string)) {
        return <div>Unauthorized</div>
    }
    const decodedUserId = decode(jwt.value, {
        json: true,
    })

    if (!decodedUserId || !("userId" in decodedUserId)) {
        return <div>Unauthorized</div>
    }

    const userId = decodedUserId.userId
    const user = await prisma.users.findUnique({
        where: {
            user_id: userId,
        },
    })
    const victims = await prisma.clients.findMany({
        where: {
            user_id: userId,
        },
    })
    return (
        <div className="flex h-screen">
            <Sidebar>
                <Profile user={user} />
            </Sidebar>
            <div className="ml-8 flex flex-1 flex-col">
                <h1 className="mb-4 text-3xl font-bold">Clients</h1>
                <div className="flex-grow overflow-y-auto">
                    <VictimsBar />
                </div>
            </div>
        </div>
    )
}
export default Clients