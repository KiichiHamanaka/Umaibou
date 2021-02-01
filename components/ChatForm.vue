<template>
  <div>
    <form @submit.prevent="sendMessage()">
      Name:<input v-model="message.name">
      Body:<input v-model="message.body">
      <input type="submit" value="ADD" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { io } from "socket.io-client"

export default Vue.extend({
  data () {
    return {
      socket: io("localhost:8080"),
      message: [
        {
          id: "",
          name: "",
          body: ""
        }
      ] as object[]
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    sendMessage () {
      this.socket.emit("SEND_MESSAGE", this.message)
      this.message.name = ""
      this.message.body = ""
    }
  }
})
</script>
