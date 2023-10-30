import React from 'react'
import InteractiveGrid from './InteractiveGrid'

const GameSection = () => {
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='game-box'>
            <InteractiveGrid />
        </div>
    )
}

export default GameSection
