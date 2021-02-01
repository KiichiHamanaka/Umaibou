import type { youtubeInfo } from "$/types"

export type Methods = {
  get: {
    resBody: {
      videoId: string
      songTitle: string
      songArtist: string
      currentTime: number
    }
  }
}
