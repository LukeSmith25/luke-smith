import { cache } from "react"

// Spotify API types
interface SpotifyEpisode {
  id: string
  name: string
  description: string
  release_date: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  external_urls: {
    spotify: string
  }
}

interface SpotifyShowResponse {
  items: SpotifyEpisode[]
}

export interface PodcastEpisode {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  episodeUrl: string
  date: string
}

// Function to get Spotify access token
async function getSpotifyAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

// Cache the fetch for 1 hour (3600 seconds)
export const getSpotifyShowEpisodes = cache(
  async (showId: string, clientId: string, clientSecret: string): Promise<PodcastEpisode[]> => {
    try {
      // Get access token
      const accessToken = await getSpotifyAccessToken(clientId, clientSecret)

      // Fetch show episodes
      const response = await fetch(`https://api.spotify.com/v1/shows/${showId}/episodes?limit=10`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`)
      }

      const data = (await response.json()) as SpotifyShowResponse

      return data.items.map((episode) => {
        // Format the date
        const releaseDate = new Date(episode.release_date)
        const formattedDate = releaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })

        return {
          id: episode.id,
          title: episode.name,
          description: episode.description,
          thumbnailUrl: episode.images[0]?.url || "/placeholder.svg?height=400&width=400",
          episodeUrl: episode.external_urls.spotify,
          date: formattedDate,
        }
      })
    } catch (error) {
      console.error("Error fetching Spotify show episodes:", error)
      return []
    }
  },
)

