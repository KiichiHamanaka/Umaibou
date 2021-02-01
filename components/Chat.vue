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
import { Socket } from "socket.io"

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
      socket: null as any
    }
  },
  computed: {},
  mounted () {
    this.socket = io()
    this.socket.on("new-message", (msg: object) => {
      this.messages.push(msg)
    })
  },
  methods: {}
})
</script>
