<script setup lang="ts">
  import { ref } from 'vue';
  import BoardView from './views/BoardView.vue';
  import GameView from './views/GameView.vue';
  import ConnectView from './views/ConnectView.vue';
  enum EViewState {
    CONNECT = 'ConnectionView',
    BOARD = 'BoardView',
    GAME = 'GameView',
  }
  const viewState = ref(EViewState.BOARD)
</script>

<template>
 <div>
  <ConnectView v-if="viewState === EViewState.CONNECT"/>
  <BoardView v-if="viewState === EViewState.BOARD"/>
  <GameView v-if="viewState === EViewState.GAME"/>
 </div>
</template>
