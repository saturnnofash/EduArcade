import React from 'react'

const players = [
    {
      id: 1,
      name: "JEAN-LOUP AUTRET",
      team: "DSY LES MOULINEAUX",
      avatar: "/placeholder.svg?height=40&width=40",
      scores: { vit: 67, dri: 68, tir: 66, def: 55, pas: 62, phy: 62 },
      overallScore: 65,
      rank: 1,
      rankChange: 1,
    },
    {
      id: 2,
      name: "LILOUAN V",
      team: "CSC CHIROS",
      avatar: "/placeholder.svg?height=40&width=40",
      scores: { vit: 46, dri: 79, tir: 63, def: 60, pas: 83, phy: 48 },
      overallScore: 63,
      rank: 2,
      rankChange: -1,
    },
    // Add more players here...
  ]

const leaderboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <header className="flex justify-between items-center p-4 border-b border-gray-800">
      <Menu className="w-6 h-6" />
      <h1 className="text-2xl font-bold">FOOTBAR</h1>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
        </Avatar>
        <span>MARTIN LAFARGE</span>
      </div>
    </header>
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <div className="flex gap-4">
        <span className="font-bold">RANG</span>
        <span>EVOLUTION</span>
        <span>AVATAR</span>
        <span>JOUEUR</span>
      </div>
      <span>6 SCORES/100</span>
      <span>SCORE MOYEN</span>
    </nav>
    <div className="p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Rechercher un joueur, id"
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold w-8">{player.rank}</span>
              <div className="w-6">
                {player.rankChange > 0 && <span className="text-green-500">▲</span>}
                {player.rankChange < 0 && <span className="text-red-500">▼</span>}
                {player.rankChange === 0 && <span className="text-gray-500">=</span>}
              </div>
              <Avatar>
                <AvatarImage src={player.avatar} alt={`${player.name}'s avatar`} />
              </Avatar>
              <div>
                <div className="font-bold">{player.name}</div>
                <div className="text-sm text-gray-400">{player.team}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid grid-cols-6 gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">VIT</span>
                  <span>{player.scores.vit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">DRI</span>
                  <span>{player.scores.dri}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">TIR</span>
                  <span>{player.scores.tir}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">DEF</span>
                  <span>{player.scores.def}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">PAS</span>
                  <span>{player.scores.pas}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">PHY</span>
                  <span>{player.scores.phy}</span>
                </div>
              </div>
              <div className="bg-pink-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {player.overallScore}
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default leaderboard


import React from 'react'
import { Search, ChevronRight, Menu } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
