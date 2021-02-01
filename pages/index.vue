<template>
  <div class="container">
    <user-banner />
    <Player />
    <Chat />
    <div>
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
</template>

<script lang="ts">
import Vue from "vue"
// @ts-ignore
import type { Task } from "$prisma/client"

export default Vue.extend({
  data () {
    return {
      tasks: [] as Task[],
      newLabel: ""
    }
  },
  methods: {
    async fetchTasks () {
      this.tasks = await this.$api.tasks.$get()
    },
    async createTask () {
      if (!this.newLabel) {
        return
      }
      await this.$api.tasks.post({ body: { label: this.newLabel } })
      this.newLabel = ""
      await this.fetchTasks()
    },
    async toggleDone (task: Task) {
      await this.$api.tasks
        ._taskId(task.id)
        .patch({ body: { done: !task.done } })
      await this.fetchTasks()
    },
    async deleteTask (task: Task) {
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
