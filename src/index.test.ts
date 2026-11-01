import { describe, expect, it } from 'vitest'
import { seedChunk } from '.'

describe('seedChunk', () => {
  it('should create a height map with values between 0 and 1', () => {
    const options = { chunkSize: 5, posX: 0, posY: 0, seed: 'foobar' }
    const chunkHeightMap = seedChunk(options)
    expect(chunkHeightMap).toHaveLength(options.chunkSize)
    chunkHeightMap.forEach(row => {
      expect(row).toHaveLength(options.chunkSize)
      row.forEach(value => {
        expect(typeof value).toBe('number')
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(1)
      })
    })
  })

  it('should produce the same values for the same seed and (absolute) position', () => {
    const SHARED_SEED = 'test-seed'

    const options1 = { chunkSize: 5, posX: 0, posY: 0, seed: SHARED_SEED }
    const chunkHeightMap1 = seedChunk(options1)
    const map1posX3posY3 = chunkHeightMap1[3][3]

    // Some other usage of the RNG to ensure it doesn't affect the deterministic output
    seedChunk({ chunkSize: 1, posX: 99, posY: 13, seed: 'foo' })

    const options2 = { chunkSize: 2, posX: 2, posY: 2, seed: SHARED_SEED }
    const chunkHeightMap2 = seedChunk(options2)
    const map2posX3posY3 = chunkHeightMap2[1][1] // corresponds to x3y3 on map1 due to posX and posY offsets

    expect(map1posX3posY3).toEqual(map2posX3posY3)
  })
})
