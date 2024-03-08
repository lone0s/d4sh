"use client"
import classNames from "classnames";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import {BsArrowsCollapse} from "react-icons/bs"
import {router} from "next/client";


const menuItems = [
    { id: 1, label: "Home", icon: BsArrowsCollapse, link: "/" },
    { id: 2, label: "Manage clients", icon: BsArrowsCollapse, link: "/clients" },
    { id: 3, label: "Parameters", icon: BsArrowsCollapse, link: "/profile" },
];

export default function Sidebar() {
    const [toggle, setToggle] = useState(false);
    const [isCollapsible, setIsCollapsible] = useState(false);
    const handleSidebarToggle = () => setToggle(!toggle);

    // const activeMenu = useMemo(
    //     () => menuItems.find((menu) => menu.link === router.pathname),
    //     [router.pathname]
    // );


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
    const test = "test"

    const getNavItemClasses = (menu) => {
        return classNames(
            "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
            {
                ["bg-light-lighter"]: /*activeMenu.id === menu.id*/ true,
            }
        );
    };

    const onMouseOver = () => {
        setIsCollapsible(!isCollapsible);
    };

    return (
        <div
            className={classes}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOver}
            style={{transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s"}}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center pl-1 gap-4">
                        {/* Logo Icon */}
                        <span
                            className={classNames("mt-2 text-lg font-medium text-text", {
                                hidden: toggle,
                            })}
                        >
              Not a RaaS ://
            </span>
                    </div>
                    {isCollapsible && (
                        <button
                            className={collapseIcons}
                            onClick={handleSidebarToggle}
                        >
                            {/* Icone (collapse truc muche) */}
                        </button>
                    )}
                    <BsArrowsCollapse onClick={handleSidebarToggle} />

                </div>
                <div className="flex flex-col items-start mt-24">
                    {menuItems.map(({ icon: Icon, ...menu }) => {
                        const classes = getNavItemClasses(menu);
                        return (
                            <div className={classes}>
                                <Link legacyBehavior={true} href={menu.link}>
                                    <a className="flex py-4 px-3 items-center w-full h-full">
                                        <div style={{ width: "2.5rem" }}>
                                            <Icon />
                                        </div>
                                        {!toggle && (
                                            <span
                                                className={classNames(
                                                    "text-md font-medium text-text-light"
                                                )}
                                            >
                        {menu.label}
                      </span>
                                        )}
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/*<div className={`/!*${getNavItemClasses({})}*!/ px-3 py-4`}>*/}
            <div className={`${test} px-3 py-4`}>
                <div style={{ width: "2.5rem" }}>
                    {/* LogoutIcon */}
                </div>
                {!toggle && (
                    <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
                )}
            </div>
        </div>
    );
};