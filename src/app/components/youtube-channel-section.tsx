"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YouTubeVideoCard from "@/app/components/youtube-video-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  channelName: string
  date: string
}

interface Channel {
  id: string
  name: string
  videos: Video[]
}

interface YouTubeChannelSectionProps {
  channels: Channel[]
}

export default function YouTubeChannelSection({ channels }: YouTubeChannelSectionProps) {
  // Keep track of current page for each channel
  const [currentPages, setCurrentPages] = useState<Record<string, number>>(
    Object.fromEntries(channels.map(channel => [channel.id, 1]))
  )
  const videosPerPage = 3

  const getFilteredVideos = (videos: Video[]) => {
    return videos.filter(video => video.title !== "Private video")
  }

  const getMaxPages = (videos: Video[]) => {
    const filteredCount = getFilteredVideos(videos).length
    return Math.max(1, Math.ceil(filteredCount / videosPerPage))
  }

  const getPaginatedVideos = (channelId: string, videos: Video[]) => {
    const filteredVideos = getFilteredVideos(videos)
    const currentPage = currentPages[channelId] || 1
    const startIndex = (currentPage - 1) * videosPerPage
    return filteredVideos.slice(startIndex, startIndex + videosPerPage)
  }

  const handlePageChange = (channelId: string, newPage: number) => {
    setCurrentPages(prev => ({
      ...prev,
      [channelId]: newPage
    }))
  }

  return (
    <div className="space-y-8">
      <Tabs 
        defaultValue={channels[0]?.id} 
        className="w-full"
        onValueChange={(value) => {
          // Reset to page 1 when changing tabs
          setCurrentPages(prev => ({
            ...prev,
            [value]: 1
          }))
        }}
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          {channels.map((channel) => (
            <TabsTrigger key={channel.id} value={channel.id}>
              {channel.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {channels.map((channel) => {
          const currentPage = currentPages[channel.id]
          const maxPages = getMaxPages(channel.videos)
          
          return (
            <TabsContent key={channel.id} value={channel.id} className="mt-0">
              <div className="grid gap-6 md:grid-cols-3">
                {getPaginatedVideos(channel.id, channel.videos).map((video) => (
                  <YouTubeVideoCard
                    key={video.id}
                    title={video.title}
                    description={video.description}
                    thumbnailUrl={video.thumbnailUrl}
                    videoUrl={video.videoUrl}
                    channelName={video.channelName}
                    date={video.date}
                  />
                ))}
              </div>
              
              {maxPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(channel.id, Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {maxPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(channel.id, Math.min(maxPages, currentPage + 1))}
                    disabled={currentPage === maxPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

