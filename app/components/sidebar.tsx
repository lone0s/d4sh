"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { BsArrowsCollapse } from "react-icons/bs"

const menuItems = [
    { id: 1, label: "Home", icon: BsArrowsCollapse, link: "/" },
    {
        id: 2,
        label: "Manage clients",
        icon: BsArrowsCollapse,
        link: "/clients",
    },
    { id: 3, label: "Profile", icon: BsArrowsCollapse, link: "/profile" },
]

export default function Sidebar() {
    const [toggle, setToggle] = useState(true)
    const router = useRouter()

    const handleSidebarToggle = () => {
        setToggle(!toggle)
    }

    const handleLogout = () => {
        //todo delete cookie
        console.log("ici : ", document.cookie)
        router.push("../logout")
    }

    return toggle ? (
        <div className="h-screen overflow-hidden py-4 px-4 sm:px-6 lg:px-8 bg-amber-50 justify-between flex-col w-80 flex text-black transition-all duration-300">
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <span className="text-lg font-medium">Not a RaaS ://</span>
                    <button
                        className="rounded rotate-90"
                        onClick={handleSidebarToggle}
                    >
                        <BsArrowsCollapse />
                    </button>
                </div>
                <div className="flex flex-col items-start mt-24">
                    {menuItems.map(({ icon: Icon, ...menu }) => {
                        return (
                            <div
                                className="flex items-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap"
                                key={menu.id}
                            >
                                <Link legacyBehavior={true} href={menu.link}>
                                    <a className="flex py-4 px-3 items-center w-full h-full">
                                        <div style={{ width: "2.5rem" }}>
                                            <Icon />
                                        </div>
                                        <span className="text-md font-medium text-text-light">
											{menu.label}
										</span>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="px-3 py-4">
                <div style={{ width: "2.5rem" }}>
                    {/* Placeholder for logout icon */}
                </div>
                <button
                    className="text-md font-medium text-text-light"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    ) : (
        <div className="h-screen overflow-hidden py-4 bg-amber-50 justify-between flex-col w-10 flex text-black transition-all duration-300 relative">
            <div className="flex items-center justify-center relative">
                <button
                    className="rounded rotate-90"
                    onClick={handleSidebarToggle}
                >
                    <BsArrowsCollapse />
                </button>
            </div>
        </div>
    )
}