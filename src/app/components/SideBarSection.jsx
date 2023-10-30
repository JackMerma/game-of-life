import React from 'react'
import Sidebar, {SidebarItem} from './Sidebar'

import {
    Info,
    User2,
    Box,
    Github,
} from "lucide-react"

const SideBarSection = () => {
  return (
    <Sidebar>
	 <div id='popup-root'></div>
        <SidebarItem content={<h1>Hola</h1>} icon={<Info size={20} />} text='Information' active />
        <SidebarItem content={"bla bla"} icon={<Github size={20} />} text='Source' active />
        <SidebarItem content={"bla bla"} icon={<Box size={20} />} text='3D version' active />
        <SidebarItem content={"bla bla"} icon={<User2 size={20} />} text='Contact' active />
    </Sidebar>
  )
}

export default SideBarSection
