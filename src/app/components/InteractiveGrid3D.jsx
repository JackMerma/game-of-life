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

const colors = ["green", "white"];
const velocity = 1000;
const n = 10;

const Cube = ({ position, color }) => {
	const mesh = useRef();
	const isAlive = color === 'green';

	useEffect(() => {
		if (mesh.current) {
			mesh.current.material.transparent = !isAlive;
			mesh.current.material.opacity = isAlive ? 1 : 0;
			mesh.current.material.needsUpdate = true;
		}
	}, [color]);

	return (
		<Box ref={mesh} args={[0.6, 0.6, 0.6]} position={position}>
		<meshStandardMaterial attach='material' color={color} />
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
				state[x][y][z] = Math.random() > 0.5 ? colors[0] : colors[1];
			}
		}
	}
	return state;
}

const generateAlgorithm = (cubes, size) => {
	let newState = JSON.parse(JSON.stringify(cubes)); // Crear una copia profunda del estado actual

	for(let x = 0; x < size; x++) {
		for(let y = 0; y < size; y++) {
			for(let z = 0; z < size; z++) {
				let neighbors = 0;

				// Contar los vecinos vivos
				for(let dx = -1; dx <= 1; dx++) {
					for(let dy = -1; dy <= 1; dy++) {
						for(let dz = -1; dz <= 1; dz++) {
							if(dx !== 0 || dy !== 0 || dz !== 0) {
								let nx = x + dx;
								let ny = y + dy;
								let nz = z + dz;

								if(nx >= 0 && nx < size && ny >= 0 && ny < size && nz >= 0 && nz < size && cubes[nx][ny][nz] === colors[0]) {
									neighbors++;
								}
							}
						}
					}
				}

				// Aplicar las reglas del Juego de la Vida
				if(cubes[x][y][z] === colors[0]) {
					if(neighbors < 2 || neighbors > 3) {
						newState[x][y][z] = colors[1]; // Muerte por soledad o superpoblación
					}
				} else {
					if(neighbors === 3) {
						newState[x][y][z] = colors[0]; // Nacimiento
					}
				}
			}
		}
	}

	return newState;
}

const InteractiveGrid3D = () => {

	const [cubeStates, setCubeStates] = useState(generateInitialState(n));


	useEffect(() => {
		const interval = setInterval(() => {
			setCubeStates(prevState => generateAlgorithm(prevState, n));
		}, velocity);
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
						<Cube key={`${x-n/2}-${y-n/2}-${z-n/2}`} position={[x-n/2, y-n/2, z-n/2]} color={color} />
					)
				)
			)}
		</Canvas>
		</div>
	);
}

export default InteractiveGrid3D
