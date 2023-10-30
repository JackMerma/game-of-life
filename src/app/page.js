import Image from 'next/image'
import Sidebar from './components/Sidebar'
import GameSection from './components/GameSection'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <GameSection />
    </main>
  )
}
