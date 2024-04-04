import { PrismaClient } from "@prisma/client"
import { decode, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import ActionBar from "./actionbar"
import {COOKIE_NAME} from "@/constants";

const prisma = new PrismaClient()

export async function VictimsBar() {
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

	const victims = await prisma.clients.findMany({
		where: {
			user_id: userId,
		},
	})

	return (
		<div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white p-6 text-black shadow-lg">
			{Object.entries(victims).map(([user, victim], index) => (
				<div
					key={user}
					className={`flex items-center justify-between p-4 ${
						index % 2 === 0 ? "" : "bg-gray-100"
					}`}
				>
					<h2 className="w-1/3 text-lg font-bold">{victim.ip_address}</h2>
					<div className="flex w-1/3 items-center">
						<div className="mr-4 h-full border-l border-gray-300"></div>
						<ActionBar victimId={victim.client_id} />
					</div>
				</div>
			))}
		</div>
	)
}