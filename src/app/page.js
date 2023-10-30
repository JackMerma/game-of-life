import Image from 'next/image'
import GameSection from './components/GameSection'
import SideBarSection from './components/SideBarSection'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <SideBarSection />
      <GameSection />
    </main>
  )
}
