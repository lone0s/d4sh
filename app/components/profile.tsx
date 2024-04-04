"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const Profile = ({
	user,
}: {
	user: { user_id: number; username: string; password: string; email: string } | null
}) => {
	const router = useRouter()
	if (!user) {
		router.push("/login")
	}

	const [profileData, setProfileData] = useState<{
		user_id: number
		username: string
		password: string
		email: string
	}>(() => user!)

	const [editableData, setEditableData] = useState<{
		username: string
		email: string
		password: string
	}>(() => {
		return {
			username: user!.username,
			email: user!.email,
			password: user!.password,
		}
	})
	const [isEditing, setIsEditing] = useState(false)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.target
		setEditableData((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	const handleSave = async () => {
		const saveResponse = await fetch("/api/userinfo", {
			method: "POST",
			body: JSON.stringify({
				user_id: profileData.user_id,
				...editableData,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (!saveResponse.ok) {
			alert("Failed to save changes")
			return
		}
		setProfileData((prev) => {
			return {
				...prev,
				...editableData,
			}
		})
		setIsEditing(false)
	}

	return (
		<div className="p-4 text-center">
			<h1 className="mb-4 text-xl font-bold">Profile</h1>
			{isEditing ? (
				<div className="flex flex-col items-center">
					{Object.keys(editableData).map((key) => (
						<input
							type="text"
							name={key}
							value={editableData[key as keyof typeof editableData]}
							onChange={handleInputChange}
							className="mb-2 rounded-md border border-gray-300 px-3 py-2"
							key={key}
						/>
					))}
					<button
						onClick={handleSave}
						className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					>
						Save
					</button>
				</div>
			) : (
				<div>
					{Object.keys(profileData).map(
						(key) =>
							key !== "user_id" && (
								<p
									className="mb-2"
									key={key}
								>
									{key}: {profileData[key as keyof typeof profileData]}
								</p>
							)
					)}
					<div className="flex justify-center">
						<button
							onClick={() => setIsEditing(true)}
							className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
						>
							Edit
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Profile
