"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import {BsArrowsCollapse, BsDoorOpenFill, BsEmojiSmileUpsideDownFill, BsHouseFill, BsPersonCircle} from "react-icons/bs"
import { StandaloneModal } from "./standaloneModal"
import {useModal} from "./standaloneModal";
import Profile from "@/app/components/profile";

const menuItems = [
	{ id: 1, label: "Home", icon: BsHouseFill, link: "/dashboard" },
	{
		id: 2,
		label: "Manage clients",
		icon: BsEmojiSmileUpsideDownFill,
		link: "/clients",
	},
]

export default function Sidebar() {
	const [toggle, setToggle] = useState(true)
	const router = useRouter()
	const { ref, onOpen, onClose } = useModal()

	function handleSidebarToggle() {
		setToggle(!toggle)
	}

	function handleLogout() {
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
										<div className="w-[2.5rem]">
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
					<div className="flex py-4 px-3 items-center rounded w-full overflow-hidden whitespace-nowrap">
						<div className="w-[2.5rem]">
							<BsPersonCircle />
						</div>
						<button
							className="text-md font-medium cursor-pointer"
							onClick={onOpen}
						>
							Profile
						</button>
						<StandaloneModal ref={ref} onClose={onClose}>
							<Profile/>
						</StandaloneModal>
					</div>
				</div>
			</div>

			<div className="px-3 py-4">
				<div style={{ width: "2.5rem" }}>
					Logout
				</div>
				<button
					className="text-md font-medium text-text-light"
					onClick={handleLogout}
				>
					<BsDoorOpenFill />
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
