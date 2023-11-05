"use client"
import React, { Component, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
	OrbitControls,
	Box,
	Select,
	useSelect,
	Sky,
	ContactShadows,
	Edges,
	Environment,
	MeshTransmissionMaterial,
	useCursor
} from '@react-three/drei'
import ButtonComponent from './ButtonComponent';
import {
	RotateCcw,
	Play,
	Pause,
} from "lucide-react";
import { Panel, useControls } from './MultiLeva'

const colors = ["green", "white"];
const velocity = 1000;
const n = 10;
const random = 0.6;

const Cube = ({ position, color = 'white', thickness = 1, roughness = 0.5, envMapIntensity = 1, transmission = 1, metalness, ...props }) => {
	const mesh = useRef();
	const isAlive = color === 'green';

	useEffect(() => {
		if (mesh.current) {
			mesh.current.material.transparent = !isAlive;
			mesh.current.material.opacity = isAlive ? 1 : 0;
			mesh.current.material.needsUpdate = true;
		}
	}, [color]);

	const [hovered, setHover] = useState(false)
	const selected = useSelect().map((sel) => sel.userData.store)
	const [store, materialProps] = useControls(selected, {
		color: { value: color },
		roughness: { value: roughness, min: 0, max: 1 },
		thickness: { value: thickness, min: -10, max: 10 },
		envMapIntensity: { value: envMapIntensity, min: 0, max: 10 },
		transmission: { value: transmission, min: 0, max: 1 },
		...(metalness !== undefined && { metalness: { value: metalness, min: 0, max: 1 } })
	})
	const isSelected = !!selected.find((sel) => sel === store)
	useCursor(hovered)
	return (
		<Box ref={mesh} args={[0.7, 0.7, 0.7]} position={position}>
		<meshStandardMaterial attach='material' color={color} samples={1} resolution={1}/>
		</Box>
	)
}
/**

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
		<Box
		position={position}>
		<boxGeometry />
		<MeshTransmissionMaterial resolution={1} samples={1} {...materialProps} />
		<meshBasicMaterial transparent depthTest={false} />
		</Box>
	)
}
*/

const generateInitialState = (size) => {
	let state = [];
	for(let x = 0; x < size; x++) {
		state[x] = [];
		for(let y = 0; y < size; y++) {
			state[x][y] = [];
			for(let z = 0; z < size; z++) {
				state[x][y][z] = Math.random() > random ? colors[0] : colors[1];
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
	const [selected, setSelected] = useState([])
	const [cubeStates, setCubeStates] = useState(generateInitialState(n));
	const [intervalId, setIntervalId] = useState(null);

	useEffect(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		const id = setInterval(() => {
			setCubeStates(prevState => generateAlgorithm(prevState, n));
		}, velocity);
		setIntervalId(id);
		return () => clearInterval(id);
	}, [velocity]);

	const handleGenerateRandomClick = () => {
		setCubeStates(generateInitialState(n));
	}

	const handleRunClick = () => {
		const id = setInterval(() => {
			setCubeStates(prevState => generateAlgorithm(prevState, n));
		}, velocity);
		setIntervalId(id);
	}

	const handleStopClick = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	}

	return (
		<div className='pb-10' style={{ width: '100vh', height: '700px'}}>
		<Canvas dpr={[1, 2]} orthographic camera={{ position: [-10, 10, 10], zoom: 100 }}>
		<pointLight position={[10, 10, 10]} />
		{cubeStates.map((xs, x) =>
			xs.map((ys, y) =>
				ys.map((color, z) =>
					<Cube key={`${x-n/2}-${y-n/2}-${z-n/2}`} position={[x-n/2, y-n/2, z-n/2]} color={color} thickness={2} envMapIntensity={5} />
				)
			)
		)}
		<Environment preset="city" />
		<OrbitControls makeDefault rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
		<Sky />
		</Canvas>
		<div className='button-container'>
		<ButtonComponent style={"bg-[#CB4335] hover:bg-[#B03A2E]"} icon={<RotateCcw size={20} />} onClick={handleGenerateRandomClick} />
		<ButtonComponent style={"bg-[#28B463] hover:bg-[#239B56]"} icon={<Play size={20} />} onClick={handleRunClick}/>
		<ButtonComponent style={"bg-[#2E86C1] hover:bg-[#2874A6]"} icon={<Pause size={20} />} onClick={handleStopClick}/>
		</div>
		</div>
	);
}

export default InteractiveGrid3D
