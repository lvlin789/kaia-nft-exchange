"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle } from "lucide-react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  // Set the airdrop end date (30 days from now for demo purposes)
  const airdropEndDate = new Date()
  airdropEndDate.setDate(airdropEndDate.getDate() + 30)
  airdropEndDate.setHours(23, 59, 59, 999) // End at 11:59:59 PM

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const endTime = airdropEndDate.getTime()
      const difference = endTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isExpired) {
    return (
      <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-2 md:mb-3">
          <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
          <h3 className="text-lg md:text-xl font-bold text-red-300">Airdrop Event Ended</h3>
        </div>
        <p className="text-red-300 text-center text-sm md:text-base">
          The Kaia Anniversary Airdrop event has concluded. Thank you for participating!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-[#bff009]/20 rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
        <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#bff009]" />
        <h3 className="text-lg md:text-xl font-bold text-white">Airdrop Ends In</h3>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-4 mb-3 md:mb-4">
        <div className="text-center">
          <div className="bg-[#bff009]/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#bff009]/30">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#bff009] tabular-nums">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-300 font-medium uppercase tracking-wide">Days</div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-[#bff009]/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#bff009]/30">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#bff009] tabular-nums">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-300 font-medium uppercase tracking-wide">Hours</div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-[#bff009]/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#bff009]/30">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#bff009] tabular-nums">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-300 font-medium uppercase tracking-wide">Minutes</div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-[#bff009]/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#bff009]/30">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#bff009] tabular-nums">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-300 font-medium uppercase tracking-wide">Seconds</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-300 text-xs md:text-sm mb-2">Don't miss out on your commemorative Kaia tokens!</p>
        <div className="inline-flex items-center space-x-1 bg-[#bff009]/20 text-[#bff009] px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-[#bff009]/30">
          <AlertTriangle className="w-3 h-3" />
          <span>Limited Time Event</span>
        </div>
      </div>
    </div>
  )
}
