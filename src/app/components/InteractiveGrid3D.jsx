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
	return (
		<Box args={[1, 1, 1]} position={position}>
		<meshStandardMaterial color={color} />
		</Box>
	)
}

const generateInitialState = (size) => {
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

	let n = 10
	const [cubeStates, setCubeStates] = useState(generateInitialState(n));


	useEffect(() => {
		const interval = setInterval(() => {
			setCubeStates(prevState => generateInitialState(n));
			//logica
			//
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='pb-10' style={{ width: '100vh', height: '700px'}}>
		<Canvas className='game-box-canvas'
		>
			<OrbitControls />
			<ambientLight intensity={2} />
			<directionalLight position={[2, 1, 1]} />
			{cubeStates.map((xs, x) =>
				xs.map((ys, y) =>
					ys.map((color, z) =>
						<Cube key={`${x}-${y}-${z}`} position={[x, y, z]} color={color} />
					)
				)
			)}
		</Canvas>
		</div>
	);
}

export default InteractiveGrid3D
