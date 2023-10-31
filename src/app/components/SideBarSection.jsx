import React from 'react'
import Sidebar, { SidebarItem } from './Sidebar'

import {
	Info,
	User2,
	Box,
	Github,
} from "lucide-react"

const SideBarSection = () => {
	return (
		<Sidebar>
			<div id='popup-root'></div>
			<SidebarItem content={
				<div className='pl-3 pr-3 mt-5'>
					<p className='text-justify text-lg'>Conway&apos;s Game of Life is a cellular automaton simulation devised by British mathematician John Conway in 1970. The game is not a traditional game with winners and losers; instead, it&apos;s a zero-player game that operates based on a set of simple rules. It takes place on an infinite grid of cells, which can be either alive or dead. Each cell&apos;s state is determined by its neighboring cells. The game progresses in discrete steps, or generations, as cells evolve according to these rules. The rules dictate that a live cell with fewer than two live neighbors dies due to underpopulation, a live cell with two or three live neighbors continues to live, and a live cell with more than three live neighbors dies due to overpopulation. On the other hand, a dead cell with exactly three live neighbors becomes alive through reproduction. This simple set of rules gives rise to complex and often mesmerizing patterns and behaviors, making Conway&apos;s Game of Life a captivating example of emergent phenomena and a popular subject for computational experimentation.</p>
					<div className='border-4 mt-7 pl-5 pr-5 border-dotted'>
						<div className='mt-3 mb-3'>
							<p className='text-lg'>
								<strong>Rules</strong>
								<br /><br />

								In this Game each grid cell can have either one of two states: dead or alive. The Game of Life is controlled by four rules which are applied to each grid cell:
								<br /><br />
								1. Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.<br />
								2. Any live cell with two or three live neighbors lives on to the next generation.<br />
								3. Any live cell with more than three live neighbors dies, as if by overpopulation.<br />
								4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
							</p>
							<div className='ml-3 mt-10 mr-3 mb-3'>
								<img src="https://beltoforion.de/en/game_of_life/images/rules_en.svg" alt="" className='' />
							</div>
						</div>
					</div>
					<div className='mt-7'>
						<p className='text-lg'>
							<strong>Patterns</strong>
							<br /><br />
							There is some patters in Conway&apos;s Game of Life. The folowing patterns are some of the most common:
							<table className="mt-7 mx-auto border border-gray-300 rounded-lg p-4">
								<tbody>
									<tr>
										<td className="text-center">
											<p className="text-lg font-semibold">Block</p>
											<img
												src="https://beltoforion.de/en/game_of_life/images/block.webp"
												alt="Descripción de la imagen 1"
												className="mx-auto"
											/>
										</td>
										<td className="text-center">
											<p className="text-lg font-semibold">Beehive</p>
											<img
												src="https://beltoforion.de/en/game_of_life/images/beehive.webp"
												alt="Descripción de la imagen 2"
												className="mx-auto"
											/>
										</td>
										<td className="text-center">
											<p className="text-lg font-semibold">Loaf</p>
											<img
												src="https://beltoforion.de/en/game_of_life/images/loaf.webp"
												alt="Descripción de la imagen 3"
												className="mx-auto"
											/>
										</td>
									</tr>
								</tbody>
							</table>

						</p>
					</div>
				</div>
			} icon={<Info size={20} />} text='Information' active />
			<SidebarItem content={
				<div></div>
			} icon={<Github size={20} />} text='Source' active />
			<SidebarItem content={
				<div className='pl-3 pr-3 mt-5'>
					<p className='text-lg text-justify'>
						The possibility of creating a 3D version of Conway's Game of Life is a fascinating and exciting idea in the field of computer science and simulation. While the original version of the Game of Life was developed in a two-dimensional plane, transitioning it to a three-dimensional environment could open up new and thrilling possibilities. This move to a three-dimensional space would allow for the simulation of even more complex and realistic structures and patterns, which could have applications in various fields, from biology and chemistry to physics and computer graphics.
						<br /><br />
						The significance of this 3D version lies in its ability to model and simulate three-dimensional systems with emergent properties. This could be particularly relevant in scientific research, where simulating complex three-dimensional phenomena could help gain a better understanding of real-world system behaviors. However, it's important to note that the implementation of a 3D version of the Game of Life also comes with significant challenges, such as increased computational complexity and three-dimensional data visualization.
						<br /><br />
						The limitations of implementation would be related to computational power and visual representation. 3D simulation would require significantly more processing power than the 2D version, potentially limiting accessibility. Additionally, visualizing three-dimensional structures in a comprehensible and meaningful way would be a challenge in itself. Despite these challenges, a 3D version of Conway's Game of Life offers fertile ground for exploration and innovation in simulation and computation, potentially leading to exciting scientific and technological advances.
						<br /><br />
						<div className='flex justify-center items-center-h'>
							<iframe width="560" height="315" src="https://www.youtube.com/embed/dQJ5aEsP6Fs?si=hB4Cij5DbJisiRJw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
						</div>
					</p>
				</div>
			} icon={<Box size={20} />} text='3D version' active />
			<SidebarItem content={
				<div className='pl-3 pr-3 mt-5'>
				</div>
			} icon={<User2 size={20} />} text='Contact' active />
		</Sidebar>
	)
}

export default SideBarSection
