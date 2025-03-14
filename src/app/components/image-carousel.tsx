"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
    id: string // Add unique ID for each image
  }[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const showPrevious = () => {
    setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const showNext = () => {
    setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex gap-4 overflow-hidden p-4">
        {images.map((image, index) => {
          const isVisible = Math.abs(currentIndex - index) <= 1
          return (
            <div
              key={image.id} // Use the unique ID as the key, not image.src
              className={cn(
                "relative aspect-[4/3] min-w-[300px] flex-1 overflow-hidden rounded-2xl transition-all duration-500",
                isVisible ? "opacity-100" : "opacity-0",
                index === currentIndex ? "scale-100" : "scale-95",
              )}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === currentIndex}
              />
            </div>
          )
        })}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={showPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous image</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={showNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next image</span>
      </Button>
    </div>
  )
}

