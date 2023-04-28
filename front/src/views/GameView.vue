<script setup lang="ts">
import PlayerBoard from '@/components/PlayerBoard.vue';
const props = withDefaults(
  defineProps<{
    playerBoard?: number[][]
  }>(),
  {
    playerBoard: () => []
  })
</script>
<template>
  <div class="gameView">
    <div class="playerScreen">
      <PlayerBoard :disabledFields="props.playerBoard"/>
      Player 1
    </div>
    <div class="playerScreen">
      <PlayerBoard class="canPlace" />
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