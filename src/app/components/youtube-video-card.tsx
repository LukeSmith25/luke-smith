"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface YouTubeVideoCardProps {
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  channelName: string
  date: string
}

export default function YouTubeVideoCard({
  title,
  description,
  thumbnailUrl,
  videoUrl,
  channelName,
  date,
}: YouTubeVideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
          />
          <Link href={videoUrl} target="_blank" className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70">
              <Play className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{channelName}</span>
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

