"use client"

import { useState, useEffect } from "react"
import { TrendingUp, BarChart3 } from "lucide-react"

export function MiniDashboardMockup() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: "Views", value: "2.4k", change: "+12%", color: "bg-emerald-500" },
    { label: "Users", value: "1.8k", change: "+8%", color: "bg-blue-500" },
    { label: "Sessions", value: "3.2k", change: "+15%", color: "bg-purple-500" },
  ]

  return (
    <div className="relative">
      <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-none shadow-xl border border-white/10 p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-zinc-300">Live Analytics</span>
          </div>
          <BarChart3 className="w-4 h-4 text-zinc-500" />
        </div>

        <div className="flex gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Main Metric */}
            <div className="text-left">
              <div className="text-4xl font-bold text-white mb-1">
                {isVisible && <span className="tabular-nums">{metrics[activeMetric].value}</span>}
              </div>
              <div className="text-sm text-zinc-400 mb-2">{metrics[activeMetric].label} today</div>
              <div className="flex items-center justify-start text-sm text-emerald-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                {metrics[activeMetric].change}
              </div>
            </div>

            {/* Bottom Metrics Row */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`text-center p-3 rounded-none transition-all duration-300 cursor-pointer ${
                    index === activeMetric ? "bg-zinc-800 ring-2 ring-blue-500/50" : "hover:bg-zinc-800/50"
                  }`}
                  onClick={() => setActiveMetric(index)}
                >
                  <div className="text-lg font-semibold text-white">{metric.value}</div>
                  <div className="text-xs text-zinc-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            {/* Mini Chart Visualization */}
            <div className="flex items-end justify-between h-40 px-2">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 rounded-t-none transition-all duration-1000 ease-out ${
                    i === activeMetric ? metrics[activeMetric].color : "bg-zinc-700"
                  }`}
                  style={{
                    height: isVisible ? `${Math.random() * 120 + 30}px` : "4px",
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

     
      </div>
    </div>
  )
} 