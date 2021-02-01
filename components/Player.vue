<template>
  <div>
    <youtube
      ref="youtube"
      :video-id="videos[0].videoId"
      :player-vars="playerVars"
      width="800"
      height="500"
      @paused="reloadVideo()"
      @ended="playNextSong"
    >
    </youtube>
    <h1 class="title">
      {{ videos[0].songTitle }} - {{ videos[0].songArtist }}
    </h1>
    <!--    <button @click="reloadVideo">Reload</button>-->
    <!--  v-forで次の曲ループを作る  -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
// @ts-ignore
import VueYoutube from "vue-youtube"
import type { Task } from "$prisma/client"
import type { youtubeInfo } from "$/types"

Vue.use(VueYoutube)

export default Vue.extend({
  data () {
    return {
      tasks: [] as Task[],
      newLabel: "",
      playerVars: {
        enablejsapi: 1,
        control: 0,
        autoplay: 1,
        muted: 0,
        start: 0
      },
      videos: [
        {
          videoId: "Wch3gJG2GJ4",
          songTitle: "Honnoji",
          songArtist: "Zazen Boys",
          currentTime: 0
        }
      ] as youtubeInfo[]
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  created () {
    this.fetchPlaying()
  },
  methods: {
    async playNextSong () {
      this.videos.push(await this.$api.youtube.$get())
      this.videos.shift()
      console.log(this.videos)
      this.player.playVideo()
      console.log("next song is " + this.videos[0].songTitle)
    },
    async fetchPlaying () {
      await this.videos.push(await this.$api.youtube.$get())
      await this.videos.shift()
    },
    async fetchCurrentTime () {
      const req = await this.$api.youtube.$get()
      this.playerVars.start = req.currentTime
    },
    reloadVideo () {
      // 非同期取得にする
      console.log("Start Reload")
      this.player.seekTo(0) // 引数をcurrentTimeに
      this.player.playVideo()
    }
  }
})
</script>
