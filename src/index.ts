import random from 'random'
import { createNoise2D } from 'simplex-noise'

interface SeedChunkOptions {
  chunkSize: number

  /**
   * Absolute X coordinate of the top left corner of the generated chunk
   */
  posX: number
  /**
   * Absolute Y coordinate of the top left corner of the generated chunk
   */
  posY: number

  seed: string
}
export const seedChunk = (options: SeedChunkOptions): number[][] => {
  random.use(`heightmap-${options.seed}`)
  const noise2D = createNoise2D(() => random.float())

  const scale = 150
  const octaves = 5
  const persistence = 0.5
  const lacunarity = 2.5

  return [
    ...Array(options.chunkSize),
  ].map(
    (_, relativeY) => [
      ...Array(options.chunkSize),
    ].map(
      (_, relativeX) => {
        const x = options.posX + relativeX
        const y = options.posY + relativeY

        let amplitude = 1
        let frequency = 1
        let noise = 0

        // Apply each one of the octaves on top of each other.
        for (let i = 0; i < octaves; i++) {
          const sX = x / scale * frequency
          const sY = y / scale * frequency

          // Add the noise.
          noise += noise2D(sX, sY) * amplitude

          // Update the amplitude and frequency for the next octave.
          amplitude *= persistence
          frequency *= lacunarity
        }

        // Return values in the range [0, 1] instead of [-1, 1]
        return Math.abs(noise)
      },
    ),
  )
}
