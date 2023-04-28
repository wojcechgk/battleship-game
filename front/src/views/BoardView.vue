<script setup lang="ts">
import { ref, computed } from 'vue'
import { findArrayinArrays } from '@/helpers'
import PlayerBoard from '@/components/PlayerBoard.vue';
const emit = defineEmits<{( e: 'submitBoard', takenFields: number[][]): void }>()
const availableShips = ref([
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
])
const mouseOverField = ref([0,0])
const activeShip = ref()
const showShadowShip = ref(false)
const canPlaceShip = ref(false)
const isVertical = ref(true)
const takenFields = ref<number[][]>([])
const shadowFields = computed(() => {
  if(!showShadowShip.value || !activeShip.value?.fieldLength) return []
  const fields:number[][] = []
  const fieldIterableValue = mouseOverField.value[isVertical.value ? 1 : 0]
    for(let i = fieldIterableValue; i < fieldIterableValue + activeShip.value.fieldLength; i++) {
      fields.push(isVertical.value ? [mouseOverField.value[0], i] : [i, mouseOverField.value[1]])
    }
  return fields
})

const handleMouseOverBoardField = (field: [number, number]) => {
  if (!activeShip.value) return
  const x = field[0]
  const y = field[1]
  showShadowShip.value = true
  mouseOverField.value[0] = x
  mouseOverField.value[1] = y
  canPlaceShip.value = (11 - (isVertical.value ? y : x ) >= activeShip.value.fieldLength) 
  && !shadowFields.value?.some(sf => findArrayinArrays(takenFields.value, sf))
}
const handleMouseLeave = () => {
  showShadowShip.value = false
}
const handleFieldClick = () => {
  if(!canPlaceShip.value) return
  const activeShipIndex = availableShips.value.findIndex(ship => ship.type === activeShip.value?.type)
  if(!availableShips.value[activeShipIndex] || availableShips.value[activeShipIndex]?.count === 0) return
  console.log(shadowFields.value)
  takenFields.value.push(...shadowFields.value)
  availableShips.value[activeShipIndex].count--
  if(!availableShips.value[activeShipIndex].count) {
    activeShip.value = undefined
  }
}

const canSubmitBoard = computed(() => !availableShips.value.some(ship => !!ship.count))
const submitBoard = () => {
  if(!canSubmitBoard.value) return
  emit('submitBoard', takenFields.value)
}

const handleAvailableShipClick = (ship: {type: string, count: number, fieldLength: number}) => {
  if(!ship.count) return
  activeShip.value = (activeShip.value?.type === ship.type ? undefined : ship)
}

</script>

<template>
  <div class="page">
    <PlayerBoard
      :class="{canPlace: canPlaceShip}"
      @mouseleave="handleMouseLeave()"
      @mouseOverBoardField="handleMouseOverBoardField"
      @fieldClick="handleFieldClick()"
      :shadowFields="shadowFields"
      :disabledFields="takenFields"
    />
    <button @click="isVertical = !isVertical">{{ isVertical ? '|' : '-' }}</button>
    <button v-if="canSubmitBoard" @click="submitBoard()">Play</button>
    <div v-else class="availableShips">
      <div v-for="ship in availableShips" :key="ship.type">
        <p>{{ ship.count }}</p>
        <div
          @click="handleAvailableShipClick(ship)"
          class="availableShip"
          :class="[{ active: activeShip?.type === ship.type }, { disable: !ship.count }]"
          >
          <div
            v-for="field in ship.fieldLength"
            :key="field"
            class="shipField"
          >
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
.active > .shipField {
  background-color:  rgb(0, 104, 183);
}
</style>