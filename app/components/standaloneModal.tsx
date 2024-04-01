import NextImage from "next/image"
import {PropsWithChildren, useRef} from "react"
import { forwardRef } from "react"

type StandaloneModalProps = PropsWithChildren<{
    onClose: () => void
}>

export const StandaloneModal = forwardRef<
    HTMLDialogElement,
    StandaloneModalProps
>(function StandaloneModal(props: StandaloneModalProps, ref) {
    const { onClose, children } = props

    return (
        <dialog
            ref={ref}
            className="fixed m-auto min-h-fit w-80 min-w-fit rounded-lg p-2"
        >
            <div className="flex flex-col items-center">
                <button onClick={onClose} className="m-2 self-end">
                    <NextImage
                        width={18}
                        height={18}
                        src="/closeIcon.svg"
                        alt="Close icon"
                        title="Close modal"
                    />
                </button>
                {children}
            </div>
        </dialog>
    )
})

export function useModal() {
    const ref = useRef<HTMLDialogElement>(null)
    const onOpen = () => {
        if (ref.current) {
            ref.current.showModal()
        }
    }
    const onClose = () => {
        if (ref.current) {
            ref.current.close()
        }
    }
    return { ref, onOpen, onClose }
}