"use client"
import React, { Component, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import ButtonComponent from './ButtonComponent';
import {
	RotateCcw,
	Play,
	Pause,
} from "lucide-react";

const Cube = ({ position, color }) => {
	<Box args={[1, 1, 1]} position={position}>
		<meshStandardMaterial color={color} />
	</Box>
}

const generateInicialState = (size) => {
	let state = [];
	for(let x = 0; x < size; x++) {
		state[x] = [];
		for(let y = 0; y < size; y++) {
			state[x][y] = [];
			for(let z = 0; z < size; z++) {
				state[x][y][z] = Math.random() > 0.5 ? 'green' : 'red';
			}
		}
	}
	return state;
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
