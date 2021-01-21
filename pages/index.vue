<template>
  <div class="container">
    <user-banner />
    <div>
      <logo />
      <h1 class="title">frourio-todo-app</h1>
      <youtube
        ref="youtube"
        :video-id="youtube.videoId"
        :player-vars="playerVars"
        width="800"
        height="500"
      >
      </youtube>
      <div v-if="!$fetchState.pending">
        <form @submit.prevent="createTask">
          <input v-model="newLabel" type="text" />
          <input type="submit" value="ADD" />
        </form>
        <ul class="tasks">
          <li v-for="task in tasks" :key="task.id">
            <label>
              <input
                type="checkbox"
                :checked="task.done"
                @change="toggleDone(task)"
              />
              <span>{{ task.label }}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              style="float: right"
              @click="deleteTask(task)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import type { Task } from '$prisma/client'
Vue.use(VueYoutube)

export default Vue.extend({
  computed: {
    getYoutubeId() {
      return 'oTAKR3THsgw'
    }
  },
  created() {
    console.log(this.getYoutubeId)
    this.videoId = this.getYoutubeId
  },
  data() {
    return {
      tasks: [] as Task[],
      newLabel: '',
      youtube: {
        videoId: null,
        songTitle: null,
        songArtist: null
      },
      playerVars: {
        enablejsapi: 1,
        control: 0,
        autoplay: 1,
        muted: 0,
        start: 100
      }
    }
  },
  methods: {
    async fetchPlaying() {
      this.youtube = await this.fetchTasks()
    },
    async fetchTasks() {
      this.tasks = await this.$api.tasks.$get()
    },
    async createTask() {
      if (!this.newLabel) return
      await this.$api.tasks.post({ body: { label: this.newLabel } })
      this.newLabel = ''
      await this.fetchTasks()
    },
    async toggleDone(task: Task) {
      await this.$api.tasks
        ._taskId(task.id)
        .patch({ body: { done: !task.done } })
      await this.fetchTasks()
    },
    async deleteTask(task: Task) {
      await this.$api.tasks._taskId(task.id).delete()
      await this.fetchTasks()
    }
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.tasks {
  width: 300px;
  padding: 0;
  margin: 20px auto 0;
  list-style-type: none;
  text-align: left;
}

.tasks > li {
  margin-top: 10px;
  border-bottom: 1px solid #eee;
}
</style>
