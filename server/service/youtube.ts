import YouTubePlayer from "yt-player"
import type { youtubeInfo } from "$/types"
import socketioServer from "fastify-socket.io"

require("jsdom-global")()
const element = document.createElement("video-player")
const player = new YouTubePlayer(element)

export const getTime = () => player.getCurrentTime()

export const getYoutubeInfo = () => ({ ...songList[0] })

export const nextSong = (hoge: youtubeInfo) => {
  songList.splice(0)
  songList.push(hoge)
}

const songList: youtubeInfo[] = [
  {
    videoId: "Wch3gJG2GJ4",
    songTitle: "97.9Hz",
    songArtist: "Suspended 4th",
    currentTime: player.getCurrentTime() ?? 0
  }
]

const currentTime: number = 0
player.load(songList[0].videoId, true, currentTime)
player.mute()
player.isMuted() ? console.log("Mute!!!!") : console.log("Not Mute!!!!")
player.play()
player.unMute()
player.isMuted() ? console.log("Mute!!!!") : console.log("Not Mute!!!!")
console.log(player.getState())

player.on("unstarted", () => {
  console.log("unstarted!")
  player.mute()
  player.load(songList[0].videoId, true, currentTime)
  player.play()
  player.unMute()
  console.log("Paused!")
})

player.on("playing", () => {
  console.log("Playing!")
})
player.on("paused", () => {
  player.mute()
  player.load(songList[0].videoId, true, currentTime)
  player.play()
  player.unMute()
  console.log("Paused!")
})
player.on("ended", () => {
  console.log("ENDED!")
  songList.push({
    videoId: "Wch3gJG2GJ4",
    songTitle: "97.9Hz",
    songArtist: "Suspended 4th",
    currentTime: player.getCurrentTime() ?? 0
  })
  songList.shift()
  player.load(songList[0].videoId, true, currentTime)
  player.play()
  console.log("startVideo")
})
