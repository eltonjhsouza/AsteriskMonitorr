<template>
  <q-page class="q-ma-sm">
    <div class="flex justify-start q-gutter-md">
    <q-card class="my-card bg-green text-grey-1" flat bordered v-for="item in exten" :key="item.id">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs col-8">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ item.event }}</div>
          <div class="text-h2 q-mt-sm q-mb-xs">{{ item.peer }}</div>
          <div class="text q-mt-sm q-mb-xs"> <q-icon name="phone_callback" class="q-mr-sm"/> {{ item.extention }}</div>
        </q-card-section>

        <q-card-section class="col-4 flex flex-center">
        <q-btn flat round icon="phone_callback">
          <q-tooltip>
            Em chamada
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="important_devices" >
          <q-tooltip>
            Em Acesso Remoto
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="sms" >
          <q-tooltip>
            Lançando nota
          </q-tooltip>
        </q-btn>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <!-- <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          7:30PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions> -->
    </q-card>
    </div>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>{{ socketMessage }}</p>
    <button @click="pingServer()">Ping Server</button>
  </div>
  </q-page>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("ws://localhost:3000");

export default {
  name: 'PageIndex',
  data() {
    return {
      exten: [
        {id: 1, objectname: 25, status: 'Elton Souza'}
      ],
      isConnected: false,
      socketMessage: ''
    }
  },

  methods: {
    pingServer() {
      // socket.emit('chat message', 'input.value');

    }
  },
  mounted() {
    let self = this
    socket.on('ouvi ai', function(msg) {
      console.log(msg)
      self.exten.push(msg)
    })
    console.log(this.exten)
  }
}
</script>
<style>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>