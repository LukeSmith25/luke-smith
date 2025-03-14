import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProfileImageProps {
  src: string
  alt: string
  size?: "sm" | "lg"
  className?: string
}

export default function ProfileImage({ src, alt, size = "lg", className }: ProfileImageProps) {
  const dimensions = size === "lg" ? 128 : 80 // 32px * 4 for lg, 20px * 4 for sm
  
  return (
    <div className={cn("relative overflow-hidden rounded-full", size === "lg" ? "h-32 w-32" : "h-20 w-20", className)}>
      <Image 
        src={src || "/placeholder.svg"} 
        alt={alt} 
        width={dimensions}
        height={dimensions}
        className="object-cover" 
        priority 
      />
    </div>
  )
}

