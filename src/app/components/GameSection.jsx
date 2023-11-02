"use client"
import React, { useState } from 'react'
import InteractiveGrid from './InteractiveGrid'
import InteractiveGrid3D from './InteractiveGrid3D'
import ButtonComponent from './ButtonComponent'

import {
	Box,
	Grid2X2,
} from "lucide-react"

const GameSection = () => {
	const [is3D, setIs3D] = useState(false);

	const toggle3D = () => {
		setIs3D(!is3D)
	};

	return (
		<div style={{width: '100%', height: '100vh', display: 'flex', flexDirextion: 'column', justifyContent: 'center', alignItems: 'center'}} className='game-box'>
		<div style={{height: '100%', display: 'block'}} className='pt-10 mb-10'>
		<button 
		className='mr-3 bg-[#424242] hover:bg-[#212121] text-white mt-10 ml-4 rounded-full'
		onClick={toggle3D}>
		<span className="mt-auto block px-4 py-4">
		{is3D ? <Grid2X2 size={25} /> : <Box size={25} />}
		</span>
		</button>
		</div>

		<div>
		{is3D ? <InteractiveGrid3D /> : <InteractiveGrid />}
		</div>
		</div>
	)
}

export default GameSection
