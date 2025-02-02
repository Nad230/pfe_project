"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { mockLeaderboard } from "../../../lib/mock-data/gamification"
import { Medal, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { motion } from "framer-motion"

export function LeaderboardSection() {
  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else if (trend === 'stable') {
      return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
    return null;  // Default case if trend is unexpected
  };
  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Medal className="h-5 w-5 text-primary" />
          <CardTitle>{mockLeaderboard.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLeaderboard.entries.map((entry, index) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className={`text-2xl font-bold ${getPositionStyle(entry.position)}`}>
                  #{entry.position}
                </div>
                <Avatar>
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>{entry.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">{entry.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{entry.score}</span>
                      {getTrendIcon(entry.trend)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}