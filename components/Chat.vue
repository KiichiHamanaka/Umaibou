<template>
  <div>
    <table class="text-left w-full">
      <thead class="bg-black flex text-white w-full">
      <th>ID</th>
      <th>User</th>
      <th>入力</th>
      </thead>
      <tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full">
      <tr v-for="(message,index) in messages" :key="index">
        <th>{{ message.id }}</th>
        <th>{{ message.name }}</th>
        <th>{{ message.message }}</th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { io } from "socket.io-client"

export default Vue.extend({
  data () {
    return {
      messages: [
        {
          id: "hoge",
          name: "fuga",
          message: "test"
        }
      ] as object[],
      socket: io("localhost:8080") // 最終的にvuexでグローバルステート化
    }
  },
  computed: {},
  mounted () {
    this.socket.on("MESSAGE", (msg: object) => {
      this.messages.push(msg)
    })
  },
  methods: {}
})
</script>
