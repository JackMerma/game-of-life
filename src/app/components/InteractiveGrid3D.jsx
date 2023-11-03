import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
	const meshRef = useRef()
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={'green'} />
		</mesh>
	);
}

const InteractiveGrid3D = () => {
	return (
		<div className='pb-10' style={{ width: '100vh', height: '100vh'}}>
			<Canvas className='game-box-canvas'>
				<OrbitControls />
				<ambientLight />
				<pointLight position={[1, 1, 1]} intensity={5} />
				<Box position={[0, 0, 0]} />
			</Canvas>
		</div>
	)
}

export default InteractiveGrid3D
