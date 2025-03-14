"use client"

import { cn } from "@/lib/utils"
import { useId } from "react"

interface PlaceholderImageProps {
  width?: number
  height?: number
  type?: "geometric" | "gradient" | "dots" | "lines"
  className?: string
  text?: string
}

export default function PlaceholderImage({
  width = 600,
  height = 400,
  type = "geometric",
  className,
  text,
}: PlaceholderImageProps) {
  const id = useId()
  const gradientId = `gradient-${id}`
  const patternId = `pattern-${id}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("bg-muted", className)}
      role="img"
      aria-label={text || "Placeholder image"}
    >
      {type === "gradient" && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.1)" />
            </linearGradient>
          </defs>
          <rect width={width} height={height} fill={`url(#${gradientId})`} />
        </>
      )}

      {type === "geometric" && (
        <>
          <rect width={width} height={height} fill="hsl(var(--muted))" />
          <path d="M0 0L600 400M600 0L0 400" stroke="hsl(var(--primary) / 0.2)" strokeWidth="2" />
          <rect
            x={width / 4}
            y={height / 4}
            width={width / 2}
            height={height / 2}
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={Math.min(width, height) / 4}
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth="4"
            fill="none"
          />
        </>
      )}

      {type === "dots" && (
        <>
          <defs>
            <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="hsl(var(--primary) / 0.3)" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill={`url(#${patternId})`} />
        </>
      )}

      {type === "lines" && (
        <>
          <defs>
            <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="hsl(var(--primary) / 0.2)" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill={`url(#${patternId})`} />
        </>
      )}

      {text && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="hsl(var(--primary))"
          fontSize="24"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          {text}
        </text>
      )}
    </svg>
  )
}

