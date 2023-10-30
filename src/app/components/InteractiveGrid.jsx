"use client"
import React, { Component } from 'react';
import ButtonComponent from './ButtonComponent';

class InteractiveGrid extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.state = {
			isMouseDown: false,
			grid: Array(this.props.rows) .fill()
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

		context.fillStyle = this.props.colors[0]; // Establecemos el color de relleno
		context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); // Dibujamos

		let newGrid = [...this.state.grid];
		let index = Math.floor(Math.random() * this.props.colors.length);
		newGrid[y][x] = this.props.colors[index];
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

	handleAlgorithm(grid){ // solo una generación
		const newGrid = Array(grid.length)
			.fill()
			.map(() => Array(grid[0].length).fill('white'));

		grid.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				// contar vecinos
				let neighbors = 0;
				if(rowIndex > 0 && cellIndex > 0 && grid[rowIndex - 1][cellIndex - 1] !== 'white') neighbors++;
				if(rowIndex > 0 && grid[rowIndex - 1][cellIndex] !== 'white') neighbors++;
				if(rowIndex > 0 && cellIndex < grid[0].length - 1 && grid[rowIndex - 1][cellIndex + 1] !== 'white') neighbors++;
				if(cellIndex > 0 && grid[rowIndex][cellIndex - 1] !== 'white') neighbors++;
				if(cellIndex < grid[0].length - 1 && grid[rowIndex][cellIndex + 1] !== 'white') neighbors++;
				if(rowIndex < grid.length - 1 && cellIndex > 0 && grid[rowIndex + 1][cellIndex - 1] !== 'white') neighbors++;
				if(rowIndex < grid.length - 1 && grid[rowIndex + 1][cellIndex] !== 'white') neighbors++;
				if(rowIndex < grid.length - 1 && cellIndex < grid[0].length - 1 && grid[rowIndex + 1][cellIndex + 1] !== 'white') neighbors++;

				// aplicar regla
				let index = Math.floor(Math.random() * this.props.colors.length);
				let color = this.props.colors[index];
				if(cell === 'white' && neighbors == 3) newGrid[rowIndex][cellIndex] = color;
				else if(cell !== 'white'  && (neighbors < 2 || neighbors > 3)) newGrid[rowIndex][cellIndex] = 'white';
				else newGrid[rowIndex][cellIndex] = cell;
			});
		})

		return newGrid;
	}

	handleRunClick() {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(() => {
			this.setState(prevState => ({ grid: this.handleAlgorithm(prevState.grid) }));
		}, this.props.velocity);
	}

	handleStopClick() {
		clearInterval(this.intervalId);
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
			<ButtonComponent name={"Run"} onClick={() => this.handleRunClick()}/>
			<ButtonComponent name={"Stop"} onClick={() => this.handleStopClick()}/>
			</div>
			</div>
		);
	}
}

InteractiveGrid.defaultProps = {
	rows: 70,
	columns: 70,
	velocity: 100,
	colors: ['#273746', '#28B463', '#2E86C1', '#884EA0', '#CB4335', '#D4AC0D', '#CA6F1E', '#707B7C']
};

export default InteractiveGrid;
