<script setup lang="ts">
import { ref } from 'vue'
const boardSize = [10, 10]

const availableShips = [
  { 
    type: 'shipType1',
    count: 5,
    fieldLength: 1
  },
  {
    type: 'shipType2',
    count: 4,
    fieldLength: 2
  },
  {
    type: 'shipType3',
    count: 3,
    fieldLength: 3
  },
  { type: 'shipType4',
    count: 2,
    fieldLength: 4
  },
  {
    type: 'shipType5',
    count: 1,
    fieldLength: 5
  },
]
const handleMouseOverBoardField = (x: number, y: number) => {
  if (!activeShip.value) return
  showShadowShip.value = true
  mouseOverField.value[0] = x
  mouseOverField.value[1] = y
  canPlaceShip.value = 10 - (isVertical.value ? y : x ) > activeShip.value.fieldLength
}
const handleMouseLeave = () => {
  showShadowShip.value = false
  canPlaceShip.value = false
}
const mouseOverField = ref([0,0])
const activeShip = ref()
const showShadowShip = ref(false)
const canPlaceShip = ref(false)
const isVertical = ref(true)
</script>

<template>
  <div class="page">
    <div class="board">
      <div
      v-for="row in boardSize[0]"
      :key="row"
      class="board__row"
      >
        <div
        v-for="field in boardSize[1]"
        :key="field"
        class="field"
        @mouseover="handleMouseOverBoardField(field, row)"
        >
        </div>
      </div>
      <button @click="isVertical = !isVertical">{{ isVertical ? '|' : '-' }}</button>
    </div>
    <div class="availableShips">
      <div v-for="ship in availableShips" :key="ship.type">
        <p>{{ ship.count }}</p>
        <div
          @click="activeShip = ship"
          class="availableShip"
          :class="{ active: activeShip?.type === ship.type }"
          >
          <div class="field" v-for="field in ship.fieldLength" :key="field">
          </div>
        </div>
      </div>
    </div>
    <div>
      {{mouseOverField}}
      {{activeShip}}
      {{showShadowShip}}
      {{canPlaceShip}}
      {{isVertical}}
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}
.board {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.board__row {
  display: flex;
  flex-direction: row;
  gap: 3px;
}
.field {
  width: 40px;
  height: 40px;
  background-color: rgb(147, 164, 176);
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
.active > .field {
  background-color:  rgb(11, 62, 97);;
}
</style>