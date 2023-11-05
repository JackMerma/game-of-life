"use client"
import React, { Component, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ButtonComponent from './ButtonComponent';
import {
	RotateCcw,
	Play,
	Pause,
} from "lucide-react";

function Cube({ color }){
	return (
		<mesh>
			<boxGeometry />
			<meshStandardMaterial color={color} />
		</mesh>
	)
}

const InteractiveGrid3D = () => {

	const [cubeColor, setCubeColor] = useState('green');

	const handleRunClick = () => {
		setCubeColor('red');
	};

	return (
		<div className='pb-10' style={{ width: '100vh', height: '700px'}}>
		<Canvas className='game-box-canvas'
		>
			<OrbitControls />
			<ambientLight intensity={2} />
			<directionalLight position={[2, 1, 1]} />
			<Cube color={cubeColor} />
		</Canvas>
		<div className='button-container'>
		<ButtonComponent style={"bg-[#CB4335] hover:bg-[#B03A2E]"} icon={<RotateCcw size={20} />} onClick={() => this.handleCleanClick()} />
		<ButtonComponent style={"bg-[#28B463] hover:bg-[#239B56]"} icon={<Play size={20} />} onClick={handleRunClick}/>
		<ButtonComponent style={"bg-[#2E86C1] hover:bg-[#2874A6]"} icon={<Pause size={20} />} onClick={() => this.handleStopClick()}/>
		</div>
		</div>
	);
}

export default InteractiveGrid3D
