<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const boardSize = [10, 10]
const takenFields = []
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

const mouseOverField = ref([0,0])
const activeShip = ref()
const showShadowShip = ref(false)
const canPlaceShip = ref(false)
const isVertical = ref(true)
const shadowFields = computed(() => {
  if(!showShadowShip.value || !activeShip.value?.fieldLength) return []
  const fields:number[][] = []
  const fieldIterableValue = mouseOverField.value[isVertical.value ? 1 : 0]
    for(let i = fieldIterableValue; i < fieldIterableValue + activeShip.value.fieldLength; i++) {
      fields.push(isVertical.value ? [mouseOverField.value[0], i] : [i, mouseOverField.value[1]])
    }
  return fields
})
const shadowFieldsX = computed(() => shadowFields.value?.map(sf => sf[0]))
const shadowFieldsY = computed(() => shadowFields.value?.map(sf => sf[1]))

const handleMouseOverBoardField = (x: number, y: number) => {
  if (!activeShip.value) return
  showShadowShip.value = true
  mouseOverField.value[0] = x
  mouseOverField.value[1] = y
  canPlaceShip.value = 11 - (isVertical.value ? y : x ) >= activeShip.value.fieldLength
}
const handleMouseLeave = () => {
  showShadowShip.value = false
}
const handleFieldClick = () => {
  if(!canPlaceShip.value) return
  const activeShipIndex = availableShips.findIndex(ship => ship.type === activeShip.value?.type)
  if(availableShips[activeShipIndex]?.count === 0 || undefined) return
  availableShips[activeShipIndex].count--
  if(!availableShips[activeShipIndex].count) {
    activeShip.value = undefined
  }
  takenFields.push(...shadowFields.value)
}
</script>

<template>
  <div class="page">
    <div
      class="board"
      :class="{canPlace: canPlaceShip}"
      @mouseleave="handleMouseLeave()"
      >
      <div
      v-for="row in boardSize[0]"
      :key="row"
      class="board__row"
      >
        <div
        v-for="field in boardSize[1]"
        :key="field"
        class="field"
        :class="{shadow: shadowFieldsX.includes(field) && shadowFieldsY.includes(row)}"
        @mouseover="handleMouseOverBoardField(field, row)"
        @click="handleFieldClick()"
        >
        </div>
      </div>
      <button @click="isVertical = !isVertical">{{ isVertical ? '|' : '-' }}</button>
    </div>
    <div class="availableShips">
      <div v-for="ship in availableShips" :key="ship.type">
        <p>{{ ship.count }}</p>
        <div
          @click="activeShip = (activeShip?.type === ship.type ? undefined : ship)"
          class="availableShip"
          :class="[{ active: activeShip?.type === ship.type }, { disable: !ship.count }]"
          >
          <div
            v-for="field in ship.fieldLength"
            :key="field"
            class="field"
          >
          </div>
        </div>
      </div>
    </div>
    <div style="display:none;">
      mouseOverField: {{mouseOverField}}<br>
      activeShip: {{activeShip}}<br>
      showShadowShip: {{showShadowShip}}<br>
      canPlaceShip: {{canPlaceShip}}<br>
      isVertical: {{isVertical}}<br>
      shadowFields: {{ shadowFields }}<br>
      shadowFieldsX: {{ shadowFieldsX }}<br>
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
.canPlace .field.shadow {
  background-color: rgb(91, 144, 145);
}
.field.shadow {
  background-color: rgb(174, 96, 96);
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
}
.active > .field {
  background-color:  rgb(11, 62, 97);;
}
</style>