import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { findArrayinArrays } from '@/helpers'

const takenFields = ref<number[][]>([])

export const useBoard = (): {
  canPlaceShip: Ref<boolean>;
  canSubmitBoard: ComputedRef<boolean>;
  handleAvailableShipClick: (ship: {
      type: string;
      count: number;
      fieldLength: number;
    }) => void;
  handleFieldClick: () => void;
  handleMouseLeave: () => void;
  handleMouseOverBoardField: (field: [number, number]) => void;
  takenFields: Ref<number[][]>;
  isVertical: Ref<boolean>;
  activeShip: Ref<{
    type: string;
    count: number;
    fieldLength: number;
}>;
  availableShips: Ref<{
    type: string;
    count: number;
    fieldLength: number;
}[]>;
  shadowFields: ComputedRef<number[][]>;
} => {
  const availableShips = ref([
    {
      type: 'shipType1',
      count: 1,
      fieldLength: 1
    },
    {
      type: 'shipType2',
      count: 1,
      fieldLength: 2
    },
    {
      type: 'shipType3',
      count: 1,
      fieldLength: 3
    },
    {
      type: 'shipType4',
      count: 1,
      fieldLength: 4
    },
    {
      type: 'shipType5',
      count: 1,
      fieldLength: 5
    },
  ])
  const mouseOverField = ref([0, 0])
  const activeShip = ref()
  const showShadowShip = ref(false)
  const canPlaceShip = ref(false)
  const isVertical = ref(true)
  const shadowFields = computed(() => {
    if (!showShadowShip.value || !activeShip.value?.fieldLength) return []
    const fields: number[][] = []
    const fieldIterableValue = mouseOverField.value[isVertical.value ? 1 : 0]
    for (let i = fieldIterableValue; i < fieldIterableValue + activeShip.value.fieldLength; i++) {
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
    canPlaceShip.value = (11 - (isVertical.value ? y : x) >= activeShip.value.fieldLength)
      && !shadowFields.value?.some(sf => findArrayinArrays(takenFields.value, sf))
  }
  const handleMouseLeave = () => {
    showShadowShip.value = false
  }
  const handleFieldClick = () => {
    if (!canPlaceShip.value) return
    const activeShipIndex = availableShips.value.findIndex(ship => ship.type === activeShip.value?.type)
    if (!availableShips.value[activeShipIndex] || availableShips.value[activeShipIndex]?.count === 0) return
    console.log(shadowFields.value)
    takenFields.value.push(...shadowFields.value)
    availableShips.value[activeShipIndex].count--
    if (!availableShips.value[activeShipIndex].count) {
      activeShip.value = undefined
    }
  }
  
  const canSubmitBoard = computed(() => !availableShips.value.some(ship => !!ship.count))
  
  const handleAvailableShipClick = (ship: { type: string, count: number, fieldLength: number }) => {
    if (!ship.count) return
    activeShip.value = (activeShip.value?.type === ship.type ? undefined : ship)
  }
  return {
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
  }
}