<script setup lang="ts">
import { findArrayinArrays } from '@/helpers'
const emit = defineEmits<{
  ( e: 'mouseOverBoardField', field: [number, number]): void,
  ( e: 'fieldClick', field: [number, number]): void,
}>()
const props = withDefaults(
  defineProps<{
    shadowFields?: number[][],
    disabledFields?: number[][],
    boardSize?: [number, number],
  }>(),
  {
    shadowFields: () => [],
    disabledFields: () => [],
    boardSize: () => [10, 10],
  })
</script>
<template>
   <div class="board">
      <div
      v-for="row in props.boardSize[0]"
      :key="row"
      class="board__row"
      >
        <div
        v-for="col in props.boardSize[1]"
        :key="row + col"
        class="field"
        :class="[
          {shadow: findArrayinArrays(props.shadowFields, [col, row])},
          {disabled: findArrayinArrays(props.disabledFields, [col, row])}
        ]"
        @mouseover="emit('mouseOverBoardField', [col, row])"
        @click="emit('fieldClick', [col, row])"
        >
        </div>
      </div>
    </div>
</template>
<style scoped>
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
  cursor: pointer;
}
.field.disabled {
  background-color:  rgb(0, 104, 183);
}
.field.shadow {
  background-color: rgb(174, 96, 96);
  cursor: not-allowed;
}
</style>