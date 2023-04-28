<script setup lang="ts">
  import { ref } from 'vue';
  import BoardView from '@/views/BoardView.vue';
  import GameView from '@/views/GameView.vue';
  import ConnectView from '@/views/ConnectView.vue';
  enum EState {
    CONNECT = 'ConnectionView',
    BOARD = 'BoardView',
    GAME = 'GameView',
  }
  const viewState = ref(EState.BOARD)
  const playerBoard = ref<number[][]>([])
  const handleSubmitBoard = (takenFields: number[][]) => {
    playerBoard.value = takenFields
    viewState.value = EState.GAME
  }
</script>

<template>
 <div>
  <ConnectView v-if="viewState === EState.CONNECT" />
  <BoardView
    v-if="viewState === EState.BOARD"
    @submitBoard="handleSubmitBoard"
  />
  <GameView
    v-if="viewState === EState.GAME"
    :playerBoard="playerBoard"
  />
 </div>
</template>
