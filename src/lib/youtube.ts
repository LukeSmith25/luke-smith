import { cache } from "react"

// YouTube API types
interface YouTubeVideoSnippet {
  title: string
  description: string
  thumbnails: {
    medium: { url: string }
    high: { url: string }
    maxres?: { url: string }
  }
  publishedAt: string
  resourceId: {
    videoId: string
  }
}

interface YouTubePlaylistItemResponse {
  items: Array<{
    id: string
    snippet: YouTubeVideoSnippet
  }>
}

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  channelName: string
  date: string
}

// Cache the fetch for 1 hour (3600 seconds)
export const getYouTubePlaylistVideos = cache(async (playlistId: string, apiKey: string): Promise<YouTubeVideo[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`,
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = (await response.json()) as YouTubePlaylistItemResponse

    return data.items.map((item) => {
      const snippet = item.snippet
      const thumbnailUrl =
        snippet.thumbnails.maxres?.url || snippet.thumbnails.high.url || snippet.thumbnails.medium.url

      // Format the date
      const publishDate = new Date(snippet.publishedAt)
      const formattedDate = publishDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

      return {
        id: item.id,
        title: snippet.title,
        description: snippet.description,
        thumbnailUrl,
        videoUrl: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
        channelName: "Marginfi", // You can hardcode this or fetch channel details in a separate call
        date: formattedDate,
      }
    })
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error)
    return []
  }
})

