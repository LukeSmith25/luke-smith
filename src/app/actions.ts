"use server"

import type { YouTubeVideo } from "@/lib/youtube"
import type { PodcastEpisode } from "@/lib/spotify"

interface YouTubeSnippet {
  title: string;
  description: string;
  thumbnails: {
    maxres?: { url: string };
    standard?: { url: string };
    high?: { url: string };
    medium?: { url: string };
    default?: { url: string };
  };
  resourceId: {
    videoId: string;
  };
  publishedAt: string;
}

interface YouTubeItem {
  id: string;
  snippet: YouTubeSnippet;
}

interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  external_urls: {
    spotify: string;
  };
  release_date: string;
}

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
      .filter((item: YouTubeItem) => item.snippet.title !== "Private video")
      .map((item: YouTubeItem) => {
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

    return data.items.map((item: SpotifyEpisode) => ({
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

