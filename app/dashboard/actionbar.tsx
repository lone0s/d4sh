"use client"
import { BsInfoCircleFill, BsTerminalFill, BsXCircleFill } from "react-icons/bs"
import { StandaloneModal } from "@/app/components/standaloneModal"
import {useModal} from "@/app/components/standaloneModal";
import React, { useState } from "react"

const data = [
  {
    id: 1,
    icon: BsInfoCircleFill,
    modalContent: <div> Hello world! <div> Miaou Chilling </div> </div>,
    alt: "info",
  },
  {
    id: 2,
    icon: BsTerminalFill,
    modalContent: "Hello terminal!",
    alt: "shell",
  },
  {
    id: 3,
    icon: BsXCircleFill,
    modalContent: "Goodbye world :((",
    alt: "exit",
  },
]

interface Users {
  [key: string]: string
}

export default function ActionBar() {
  const { ref, onOpen, onClose } = useModal()
  const [modalContent, setModalContent] =
      useState<(typeof data)[number]["modalContent"]>("")

  return (
      <div className="flex justify-between w-2/3">
        {data.map(({ icon: Icon, alt }) => (
            <button
                key={alt}
                onClick={() => {
                  onOpen()
                  setModalContent(
                      data.find((item) => item.alt === alt)
                          ?.modalContent || ""
                  )
                }}
                className="flex items-center justify-center p-2"
            >
              <Icon />
            </button>
        ))}
        <StandaloneModal ref={ref} onClose={onClose}>
          <div>{modalContent}</div>
        </StandaloneModal>
      </div>
  )
}

export function VictimsBar() {
  //Todo: Replace with real data
  const users: Users = {
    user1: "John Doe",
    user2: "Jane Doe",
    user3: "John Smith",
    user4: "Jane Smith",
  }

  return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
        {Object.entries(users).map(([user, name], index) => (
            <div
                key={user}
                className={`flex items-center justify-between p-4 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                }`}
            >
              <h2 className="text-lg font-bold w-1/3">{name}</h2>
              <div className="flex items-center w-1/3">
                <div className="h-full border-l border-gray-300 mr-4"></div>
                <ActionBar />
              </div>
            </div>
        ))}
      </div>
  )
}