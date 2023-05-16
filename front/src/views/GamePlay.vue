<script setup lang="ts">
import PlayerBoard from '@/components/PlayerBoard.vue';
import { useBoard } from '@/composables/useBoard';
import { ref } from 'vue';

const { takenFields } = useBoard()
const mouseOverField = ref<[number, number]>()
</script>
<template>
  <div class="gameView">
    <div class="playerScreen">
      <PlayerBoard :disabledFields="takenFields" />
      You
    </div>
    <div class="playerScreen">
      <PlayerBoard class="canPlace" @mouseOverBoardField="e => mouseOverField = e" />
      Player 2
    </div>
  </div>
</template>
<style scoped>
.gameView {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.playerScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>