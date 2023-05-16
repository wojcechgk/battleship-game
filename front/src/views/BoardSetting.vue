<script setup lang="ts">
import PlayerBoard from '@/components/PlayerBoard.vue';
import { useBoard } from '@/composables/useBoard';
import router from '@/router';

const {
  canPlaceShip,
  canSubmitBoard,
  handleAvailableShipClick,
  handleFieldClick,
  handleMouseLeave,
  handleMouseOverBoardField,
  takenFields,
  isVertical,
  activeShip,
  availableShips,
  shadowFields,
} = useBoard()

const submitBoard = () => {
  if (!canSubmitBoard) { return }
  router.push('/game')
}
</script>

<template>
  <div class="page">
    <PlayerBoard :class="{ canPlace: canPlaceShip }" @mouseleave="handleMouseLeave()"
      @mouseOverBoardField="handleMouseOverBoardField" @fieldClick="handleFieldClick()" :shadowFields="shadowFields"
      :disabledFields="takenFields" />
    <button @click="isVertical = !isVertical">{{ isVertical ? '|' : '-' }}</button>
    <button v-if="canSubmitBoard" @click="submitBoard()">Play</button>
    <div v-else class="availableShips">
      <div v-for="ship in availableShips" :key="ship.type">
        <div @click="handleAvailableShipClick(ship)" class="availableShip"
          :class="[{ active: activeShip?.type === ship.type }, { disable: !ship.count }]">
          <div v-for="field in ship.fieldLength" :key="field" class="shipField">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.availableShips {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.availableShip {
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
}

.availableShip.disable {
  opacity: 0.2;
  cursor: not-allowed;
}

.shipField {
  width: 40px;
  height: 40px;
  background-color: rgb(147, 164, 176);
}

.active>.shipField {
  background-color: rgb(0, 104, 183);
}
</style>