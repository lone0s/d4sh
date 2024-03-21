"use client"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
    const [counter, setCounter] = useState(0)
    const router = useRouter()
    if (counter > 4) {
        return router.push("/dashboard")
    }

    return (
        <main className="h-full flex flex-col justify-evenly items-align">
            <h1>Your website has been seized</h1>
            <div className="justify-evenly flex">
                <NextImage
                    src="/europol.png"
                    alt="EUROPOL"
                    width={500}
                    height={100}
                    onClick={() => setCounter((prev) => prev + 1)}
                />
                <NextImage
                    src="/homeland_security.png"
                    alt="HOMELAND SECURITY"
                    width={100}
                    height={100}
                    onClick={() => setCounter((prev) => prev + 1)}
                />
                <NextImage
                    src="/justice_department.png"
                    alt="DEPARTMENT OF JUSTICE"
                    width={100}
                    height={100}
                    onClick={() => setCounter((prev) => prev + 1)}
                />
            </div>
            <p>
                This domain name has been seized,
                pursuant to a seizure warrant issued by the United States District Court
                for the Southern District of New York
            </p>
        </main>
    )
}