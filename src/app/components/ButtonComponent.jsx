import React from 'react'

const ButtonComponent = ({ style, icon, onClick }) => {
	return (
		<button
		className={`${style} text-white mt-4 ml-4 rounded-full`}
		onClick={onClick}
		>
		<span className="block px-4 py-4">
		{icon}
		</span>
		</button>

	)
}

export default ButtonComponent
