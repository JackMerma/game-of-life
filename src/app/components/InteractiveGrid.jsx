"use client"
import React, { Component } from 'react';
import ButtonComponent from './ButtonComponent';

class InteractiveGrid extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.state = {
			isMouseDown: false,
			grid: Array(this.props.rows)
			.fill()
			.map(() => Array(this.props.columns).fill('white')),
		};
	}

	componentDidMount() {
		this.initializeCanvas();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.grid !== this.state.grid) {
			this.drawGrid(this.state.grid);
		}
	}

	initializeCanvas() {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext('2d'); // Obtenemos el contexto 2D
		canvas.width = this.props.columns * 10; // Ancho del lienzo
		canvas.height = this.props.rows * 10; // Alto del lienzo

		// Almacenamos el contexto en el estado
		this.setState({ context });
	}

	drawGrid(grid) {
		const context = this.state.context;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		grid.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				context.fillStyle = cell;
				context.fillRect(cellIndex * 10, rowIndex * 10, 10, 10);
			});
		});
	}

	handleMouseDown(event) {
		this.setState({ isMouseDown: true });
		this.paintCell(event);
	}

	handleMouseUp() {
		this.setState({ isMouseDown: false });
	}

	handleMouseMove(event) {
		if (this.state.isMouseDown) {
			this.paintCell(event);
		}
	}

	paintCell(event) {
		const canvas = this.canvasRef.current;
		const context = this.state.context; // Obtenemos el contexto del estado
		const cellSize = 10;
		const x = Math.floor(event.nativeEvent.offsetX / cellSize);
		const y = Math.floor(event.nativeEvent.offsetY / cellSize);

		context.fillStyle = this.props.color; // Establecemos el color de relleno
		context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); // Dibujamos

		let newGrid = [...this.state.grid];
		newGrid[y][x] = this.props.color;
		this.setState({ grid: newGrid });
	}

	handleCleanClick() {
		const newGrid = Array(100)
			.fill()
			.map(() => Array(100).fill('white'));
		this.setState({ grid: newGrid });

		const context = this.state.context;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}

	render() {
		return (
			<div>
			<canvas
			ref={this.canvasRef}
			onMouseDown={(e) => this.handleMouseDown(e)}
			onMouseUp={() => this.handleMouseUp()}
			onMouseMove={(e) => this.handleMouseMove(e)}
			style={{
				border: '2px solid #121212',
			}}
			></canvas>
			<div>
			<ButtonComponent name={"Clean"} onClick={() => this.handleCleanClick()}/>
			</div>
			</div>
		);
	}
}

InteractiveGrid.defaultProps = {
	rows: 70,
	columns: 70,
	velocity: 100,
	color: "black",
};

export default InteractiveGrid;
