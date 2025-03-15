import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PodcastEpisodeCardProps {
  title: string
  description: string
  thumbnailUrl: string
  episodeUrl: string
  date: string
}

export default function PodcastEpisodeCard({
  title,
  description,
  thumbnailUrl,
  episodeUrl,
  date,
}: PodcastEpisodeCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square group">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full" asChild>
            <Link href={episodeUrl} target="_blank" rel="noopener noreferrer">
              <Play className="h-6 w-6" />
              <span className="sr-only">Play episode</span>
            </Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
        <div className="text-xs text-muted-foreground mb-2">
          <span>{date}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="mt-auto">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={episodeUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Listen on Spotify
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

