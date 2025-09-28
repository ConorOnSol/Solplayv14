export const CHIPS = [1, 5, 25, 100, 500]
export const NUMBERS = 37 // 0-36

export const SOUND_CHIP = 'https://raw.githubusercontent.com/gamba-labs/gamba/main/apps/play/public/chip.wav'
export const SOUND_WIN = 'https://raw.githubusercontent.com/gamba-labs/gamba/main/apps/play/public/win.wav'
export const SOUND_LOSE = 'https://raw.githubusercontent.com/gamba-labs/gamba/main/apps/play/public/lose.wav'
export const SOUND_PLAY = 'https://raw.githubusercontent.com/gamba-labs/gamba/main/apps/play/public/play.wav'

export const tableLayout: Record<string, { label: string; numbers: number[]; row: number; column: number; color: 'red' | 'black' | 'green' }> = {
  '0': { label: '0', numbers: [0], row: 1, column: '1', color: 'green' },
  
  '1': { label: '1', numbers: [1], row: 2, column: '1', color: 'red' },
  '2': { label: '2', numbers: [2], row: 2, column: '2', color: 'black' },
  '3': { label: '3', numbers: [3], row: 2, column: '3', color: 'red' },
  
  '4': { label: '1st', numbers: [1, 2, 3], row: 3, column: '1', color: 'black' },
  '5': { label: '2nd', numbers: [4, 5, 6], row: 3, column: '2', color: 'red' },
  '6': { label: '3rd', numbers: [7, 8, 9], row: 3, column: '3', color: 'black' },
  
  '7': { label: '1-12', numbers: Array.from({ length: 12 }, (_, i) => i + 1), row: 4, column: '1', color: 'red' },
  '8': { label: '2-12', numbers: Array.from({ length: 12 }, (_, i) => i + 13), row: 4, column: '2', color: 'black' },
  '9': { label: '3-12', numbers: Array.from({ length: 12 }, (_, i) => i + 25), row: 4, column: '3', color: 'red' },
  
  '10': { label: '1-18', numbers: Array.from({ length: 18 }, (_, i) => i + 1), row: 5, column: '1', color: 'black' },
  '11': { label: 'Even', numbers: Array.from({ length: 18 }, (_, i) => (i + 1) * 2), row: 5, column: '2', color: 'red' },
  '12': { label: 'Red', numbers: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36], row: 5, column: '3', color: 'red' },
  '13': { label: 'Black', numbers: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35], row: 5, column: '4', color: 'black' },
  '14': { label: 'Odd', numbers: Array.from({ length: 18 }, (_, i) => i * 2 + 1), row: 5, column: '5', color: 'black' },
  '15': { label: '19-36', numbers: Array.from({ length: 18 }, (_, i) => i + 19), row: 5, column: '6', color: 'red' },
}
