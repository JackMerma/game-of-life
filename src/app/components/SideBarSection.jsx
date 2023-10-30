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
        <SidebarItem icon={<Info size={20} />} text='Information' active />
        <SidebarItem icon={<Github size={20} />} text='Source' active />
        <SidebarItem icon={<Box size={20} />} text='3D version' active />
        <SidebarItem icon={<User2 size={20} />} text='Contact' active />
    </Sidebar>
  )
}

export default SideBarSection
