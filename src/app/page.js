import Image from 'next/image'
import GameSection from './components/GameSection'
import SideBarSection from './components/SideBarSection'

export default function Home() {
  return (
    <main className="flex">
      <SideBarSection />
      <GameSection style={{height: '100vw'}} />
    </main>
  )
}
