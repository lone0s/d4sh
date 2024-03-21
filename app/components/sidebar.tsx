"use client"
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsArrowsCollapse } from "react-icons/bs";


const menuItems = [
    { id: 1, label: "Home", icon: BsArrowsCollapse, link: "/" },
    { id: 2, label: "Manage clients", icon: BsArrowsCollapse, link: "/clients" },
    { id: 3, label: "Parameters", icon: BsArrowsCollapse, link: "/profile" },
];

export default function Sidebar() {
    const [toggle, setToggle] = useState(false);
    const router = useRouter();

    const handleSidebarToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
        //todo delete cookie
        console.log("ici : ",document.cookie)
        router.push("../logout");
    };

    const getNavItemClasses = () => {
        return classNames(
            "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
        );
    };

    return (
        <div
            className={classNames(
                "h-screen overflow-hidden px-4 sm:px-6 lg:px-8 bg-amber-50 justify-between flex-col w-80 flex text-black transition-all duration-300",
                {
                    "w-80": !toggle,
                    "w-0": toggle,
                }
            )}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center pl-1 gap-4">
                        <span className={classNames("mt-2 text-lg font-medium text-text", { hidden: toggle })}>
                            Not a RaaS ://
                        </span>
                    </div>
                    <button className="p-4 rounded bg-light-lighter absolute right-0" onClick={handleSidebarToggle}>
                        <BsArrowsCollapse />
                    </button>
                </div>
                <div className="flex flex-col items-start mt-24">
                    {menuItems.map(({ icon: Icon, ...menu }) => {
                        const classes = getNavItemClasses();
                        return (
                            <div className={classes} key={menu.id}>
                                <Link  legacyBehavior={true} href={menu.link}>
                                    <a className="flex py-4 px-3 items-center w-full h-full">
                                        <div style={{ width: "2.5rem" }}>
                                            <Icon />
                                        </div>
                                        {!toggle && (
                                            <span className="text-md font-medium text-text-light">{menu.label}</span>
                                        )}
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="px-3 py-4">
                <div style={{ width: "2.5rem" }}>
                    {/* Placeholder for logout icon */}
                </div>
                {!toggle && (
                    <button className="text-md font-medium text-text-light" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    );
}
