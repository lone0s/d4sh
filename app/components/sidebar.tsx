"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import {
	BsArrowsCollapse,
	BsDoorOpenFill,
	BsEmojiSmileUpsideDownFill,
	BsHouseFill,
	BsPersonCircle,
} from "react-icons/bs"
import { StandaloneModal, useModal } from "./standaloneModal"

const menuItems = [
	{ id: 1, label: "Home", icon: BsHouseFill, link: "/dashboard" },
	{
		id: 2,
		label: "Manage clients",
		icon: BsEmojiSmileUpsideDownFill,
		link: "/clients",
	},
]

export default function Sidebar({ children }: { children: React.ReactNode }) {
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
		<div className="flex h-screen w-80 flex-col justify-between overflow-hidden bg-amber-50 px-4 py-4 text-black transition-all duration-300 sm:px-6 lg:px-8">
			<div className="flex flex-col">
				<div className="relative flex items-center justify-between">
					<span className="text-lg font-medium">Not a RaaS ://</span>
					<button
						className="rotate-90 rounded"
						onClick={handleSidebarToggle}
					>
						<BsArrowsCollapse />
					</button>
				</div>
				<div className="mt-24 flex flex-col items-start">
					{menuItems.map(({ icon: Icon, ...menu }) => {
						return (
							<div
								className="flex w-full cursor-pointer items-center overflow-hidden whitespace-nowrap rounded"
								key={menu.id}
							>
								<Link
									legacyBehavior={true}
									href={menu.link}
								>
									<a className="flex h-full w-full items-center px-3 py-4">
										<div className="w-[2.5rem]">
											<Icon />
										</div>
										<span className="text-md text-text-light font-medium">
											{menu.label}
										</span>
									</a>
								</Link>
							</div>
						)
					})}
					<div className="flex w-full items-center overflow-hidden whitespace-nowrap rounded px-3 py-4">
						<div className="w-[2.5rem]">
							<BsPersonCircle />
						</div>
						<button
							className="text-md cursor-pointer font-medium"
							onClick={onOpen}
						>
							Profile
						</button>
						<StandaloneModal
							ref={ref}
							onClose={onClose}
						>
							{children}
						</StandaloneModal>
					</div>
				</div>
			</div>

			<div className="px-3 py-4">
				<div style={{ width: "2.5rem" }}>Logout</div>
				<button
					className="text-md text-text-light font-medium"
					onClick={handleLogout}
				>
					<BsDoorOpenFill />
				</button>
			</div>
		</div>
	) : (
		<div className="relative flex h-screen w-10 flex-col justify-between overflow-hidden bg-amber-50 py-4 text-black transition-all duration-300">
			<div className="relative flex items-center justify-center">
				<button
					className="rotate-90 rounded"
					onClick={handleSidebarToggle}
				>
					<BsArrowsCollapse />
				</button>
			</div>
		</div>
	)
}
