import { computed, signal } from '@preact/signals-react'
import { CHIPS, NUMBERS, tableLayout } from './constants'

export const chipPlacements = signal<Record<string, number>>({})
export const hovered = signal<number[]>([])
export const results = signal<number[]>([])
export const selectedChip = signal<number>(CHIPS[0])

export const distributedChips = computed(
  () => {
    const placements = Object.entries(chipPlacements.value)
    const distributed = Array.from({ length: NUMBERS }).map(() => 0)
    for (const [id, amount] of placements) {
      const square = tableLayout[id]
      if (square) {
        const divided = Number(BigInt(amount * 10_000) / BigInt(square.numbers.length))
        for (const number of square.numbers) {
          if (number >= 0 && number < distributed.length) {
            distributed[number] += divided
          }
        }
      }
    }
    return distributed
  },
)

export const totalChipValue = computed(
  () => {
    return Math.floor(distributedChips.value.reduce((a, b) => a + b, 0))
  },
)

export const bet = computed(
  () => {
    const total = totalChipValue.value
    if (total === 0) {
      return Array.from({ length: NUMBERS }).map(() => 0)
    }
    
    const bet = distributedChips.value.map((amount) => {
      return Number(BigInt(amount * NUMBERS * 10_000) / BigInt(total)) / 10_000
    })
    return bet
  },
)

export const addResult = (index: number) => {
  results.value = [...results.value.slice(-19), index]
}

export const getChips = (id: string) => {
  return chipPlacements.value[id] ?? 0
}

export const hover = (ids: number[]) => {
  hovered.value = ids
}

export const addChips = (id: string, amount: number) => {
  chipPlacements.value = {
    ...chipPlacements.value,
    [id]: getChips(id) + amount,
  }
}

export const removeChips = (id: string) => {
  const newPlacements = { ...chipPlacements.value }
  delete newPlacements[id]
  chipPlacements.value = newPlacements
}

export const clearChips = () => {
  chipPlacements.value = {}
}
