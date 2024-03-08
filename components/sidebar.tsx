"use client"
import classNames from "classnames"
import {useState} from "react";
import {BsArrowsCollapse} from "react-icons/bs"
//Let's make a nextJs sidebar component
export default function Sidebar() {
    const [toggle, setToggle] = useState(false);
    const toggleHandler = () => setToggle(!toggle);

    const classes = classNames(
        "h-screen overflow-hidden px-4 sm:px-6 lg:px-8 bg-amber-50 justify-between flex-col w-80 flex text-black",
        {
            ["w-80"]: !toggle,
            ["w-20"]: toggle
        }
    )

    const collapseIcons = classNames(
        "p-4 rounded bg-light-lighter absolute right-0 w-80",
        {
            "rotate-180": toggle
        }
    )

    return (
        <div className={classes}>
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center pl-1 gap-4 font-bold"></div>
                    {/*<LogoIcon/>*/}
                    <span className={classNames('mt-2 text-lg font-semibold text-text', {hidden: toggle})}>
                    Logo
                    </span>
                </div>
                <button className="p-4 rounded bg-light-lighter absolute right-0 w-80">
                    <BsArrowsCollapse />
                </button>
            </div>

        </div>
    )
}