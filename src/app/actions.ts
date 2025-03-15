"use server"

import { getYouTubePlaylistVideos, type YouTubeVideo } from "@/lib/youtube"
import { getSpotifyShowEpisodes, type PodcastEpisode } from "@/lib/spotify"

export async function submitContactForm(formData: FormData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Here you would typically send an email or save to a database
  console.log("Form submission:", { name, email, message })

  return {
    message: "Thanks for your message! I'll get back to you soon.",
  }
}

export async function fetchYouTubeContent() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID

  if (!YOUTUBE_API_KEY || !PLAYLIST_ID) {
    console.warn("YouTube API key or Playlist ID not found")
    return []
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`YouTube API error: ${data.error?.message || response.status}`)
    }

    // Filter out private videos and map the rest
    return data.items
      .filter((item: any) => item.snippet.title !== "Private video")
      .map((item: any) => {
        // Get the best available thumbnail
        const thumbnails = item.snippet.thumbnails || {}
        const thumbnail = thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default || {
          url: "/placeholder.svg"
        }

        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: thumbnail.url,
          videoUrl: `https://youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          channelName: "Marginfi Founders Series",
          date: new Date(item.snippet.publishedAt).toLocaleDateString()
        }
      })
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error)
    return []
  }
}

export async function fetchSpotifyContent() {
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
  const SHOW_ID = process.env.SPOTIFY_SHOW_ID // Your Vlyss podcast show ID

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SHOW_ID) {
    console.warn("Spotify credentials or Show ID not found")
    return []
  }

  try {
    // Get access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
      },
      body: "grant_type=client_credentials"
    })
    const tokenData = await tokenResponse.json()

    // Log token response (excluding sensitive data)
    console.log('Spotify Token Response:', { 
      access_token: '***hidden***',
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in 
    })

    // Fetch episodes
    const response = await fetch(`https://api.spotify.com/v1/shows/${SHOW_ID}/episodes?limit=50`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Spotify API error: ${data.error?.message || response.status}`)
    }

    // Log the full response data
    console.log('Spotify API Response:', JSON.stringify(data, null, 2))
    
    // Log the first item as an example
    if (data.items?.[0]) {
      console.log('Sample Spotify Episode:', JSON.stringify(data.items[0], null, 2))
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      description: item.description,
      thumbnailUrl: item.images[0].url,
      videoUrl: item.external_urls.spotify,
      channelName: "Vlyss",
      date: new Date(item.release_date).toLocaleDateString()
    }))
  } catch (error) {
    console.error("Error fetching Spotify episodes:", error)
    return []
  }
}

// Fallback data in case API calls fail
function getFallbackYouTubeVideos(): YouTubeVideo[] {
  return [
    {
      id: "video-1",
      title: "Marginfi Co-Founders Series: Solana Founder Interview",
      description:
        "In-depth conversation with a leading Solana founder about building on the blockchain and the future of DeFi.",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://www.youtube.com/playlist?list=PLYZNmKNwFgfwEtJBL9hfeF0GuRBlzRueK",
      channelName: "Marginfi",
      date: "Mar 15, 2024",
    },
    {
      id: "video-2",
      title: "Building DeFi Solutions on Marginfi",
      description: "Technical deep dive into building decentralized finance applications on the Marginfi platform.",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://www.youtube.com/playlist?list=PLYZNmKNwFgfwEtJBL9hfeF0GuRBlzRueK",
      channelName: "Marginfi",
      date: "Feb 28, 2024",
    },
    {
      id: "video-3",
      title: "The Future of Solana Ecosystem",
      description: "Panel discussion with Solana founders about the ecosystem's growth and future opportunities.",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://www.youtube.com/playlist?list=PLYZNmKNwFgfwEtJBL9hfeF0GuRBlzRueK",
      channelName: "Marginfi",
      date: "Jan 12, 2024",
    },
  ]
}

function getFallbackPodcastEpisodes(): PodcastEpisode[] {
  return [
    {
      id: "episode-1",
      title: "Personal Growth in Tech Careers",
      description: "Luke and Nathan discuss strategies for personal development and growth in technology careers.",
      thumbnailUrl: "/placeholder.svg?height=400&width=400",
      episodeUrl: "https://open.spotify.com/show/7HpUglZhk3AlgBeWTOZCND",
      date: "Apr 5, 2024",
    },
    {
      id: "episode-2",
      title: "Overcoming Challenges in Blockchain Development",
      description: "A deep dive into common challenges faced by blockchain developers and strategies to overcome them.",
      thumbnailUrl: "/placeholder.svg?height=400&width=400",
      episodeUrl: "https://open.spotify.com/show/7HpUglZhk3AlgBeWTOZCND",
      date: "Mar 22, 2024",
    },
    {
      id: "episode-3",
      title: "Career Growth in Web3",
      description: "Exploring career paths and growth opportunities in the Web3 and blockchain space.",
      thumbnailUrl: "/placeholder.svg?height=400&width=400",
      episodeUrl: "https://open.spotify.com/show/7HpUglZhk3AlgBeWTOZCND",
      date: "Feb 10, 2024",
    },
  ]
}

