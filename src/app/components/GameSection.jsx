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
		<div style={{width: '100%', height: '100vh', display: 'flex',  justifyContent: 'center', alignItems: 'center'}} className='gameBox'>
		<button
		className={`mr-3 bg-[#424242] hover:bg-[#212121] text-white ${is3D ? 'mt-10 mr-10' : 'mt-0'} rounded-full`}
		style={{position: is3D ? 'absolute' : 'static', top: is3D ? '10px' : 'auto', right: is3D ? '10px' : 'auto', zIndex: 1}}
		onClick={toggle3D}>
		<span className="mt-auto block px-4 py-4">
		{is3D ? <Grid2X2 size={25} /> : <Box size={25} />}
		</span>
		</button>
		{is3D ? <InteractiveGrid3D style={{width: '100vw', height: '100vh'}} /> : <InteractiveGrid />}
		</div>
	)
}

export default GameSection
