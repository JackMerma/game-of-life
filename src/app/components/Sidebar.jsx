"use client"
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
	const [expanded, setExpanded] = useState(true)

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col bg-white border-r shadow-sm">
				<div className="p-4 pb-2 flex justify-between items-center">
					<h1
						className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
							} text-xl font-bold text-gray-800`}

						alt=""
					>J⧊CK</h1>
					<button
						onClick={() => setExpanded((curr) => !curr)}
						className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
					>
						{expanded ? <ChevronFirst /> : <ChevronLast />}
					</button>
				</div>

				<SidebarContext.Provider value={{ expanded }}>
					<ul className="flex-1 px-3">{children}</ul>
				</SidebarContext.Provider>

				<div className="border-t flex p-3">
					<img
						src="https://ui-avatars.com/api/?background=AED6F1&color=2874A6&name=Jackson+Merma&bold=true"
						alt=""
						className="w-10 h-10 rounded-md"
					/>
					<div
						className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
					>
						<div className="leading-4">
							<h4 className="font-semibold">Jackson Merma</h4>
							<span className="text-xs text-gray-600">jinnbit@gmail.com</span>
						</div>
					</div>
				</div>
			</nav>
		</aside>
	)
}

export function SidebarItem({ content, icon, text, active, alert }) {
	const { expanded } = useContext(SidebarContext)

	return (
		<Popup
		trigger={

			<button
			className={`
		  relative flex items-center py-2 px-3 my-1
		  font-medium rounded-md cursor-pointer
		  transition-colors group
		  ${active
				  ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
				  : "hover:bg-blue-50 text-gray-600"
		  }
	  `}
			>
			{icon}
			<span
			className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
			}`}
			>
			{text}
			</span>
			{alert && (
				<div
				className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${expanded ? "" : "top-2"
				}`}
				/>
			)}

			{!expanded && (
				<div
				className={`
			absolute left-full rounded-md px-2 py-1 ml-6
			bg-blue-100 text-blue-800 text-sm
			invisible opacity-20 -translate-x-3 transition-all
			group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
		`}
				>
				{text}
				</div>
			)}
			</button>
		}
		
		modal
		nested
		>
		{close => (
			<div className="modal">
			<button className="close" onClick={close}>
			&times;
			</button>
			<div className="header"> {text} </div>
			<div className="content">
			{content}
			</div>
			<div className="actions">
			</div>
			</div>
		)}
		</Popup>
	)
}
