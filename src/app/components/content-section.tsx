import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YouTubeVideoCard from "./youtube-video-card"
import PodcastEpisodeCard from "./podcast-episode-card"
import type { YouTubeVideo } from "@/lib/youtube"
import type { PodcastEpisode } from "@/lib/spotify"

interface ContentSectionProps {
  youtubeVideos: YouTubeVideo[]
  podcastEpisodes: PodcastEpisode[]
}

export default function ContentSection({ youtubeVideos, podcastEpisodes }: ContentSectionProps) {
  return (
    <Tabs defaultValue="youtube" className="w-full">
      <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
        <TabsTrigger value="youtube">YouTube</TabsTrigger>
        <TabsTrigger value="podcast">Podcast</TabsTrigger>
      </TabsList>

      <TabsContent value="youtube" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {youtubeVideos.map((video) => (
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
      </TabsContent>

      <TabsContent value="podcast" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {podcastEpisodes.map((episode) => (
            <PodcastEpisodeCard
              key={episode.id}
              title={episode.title}
              description={episode.description}
              thumbnailUrl={episode.thumbnailUrl}
              episodeUrl={episode.episodeUrl}
              date={episode.date}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

