import React from 'react'

const ButtonComponent = ({ name, onClick }) => {
	return (
		<div>
		<button
		className="bg-[#2E86C1] hover:bg-[#2874A6] text-white mt-3"
		onClick={onClick}
		>
		<span className="block px-5 py-2">
		{name}
		</span>
		</button>

		</div>
	)
}

export default ButtonComponent
