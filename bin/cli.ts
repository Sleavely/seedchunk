import { seedChunk } from '../src'

const {
  HEIGHTMAP_SEED = '',
} = process.env

;(async () => {
  const seedString = process.argv[2] || HEIGHTMAP_SEED
  if (!seedString) {
    throw new Error('No seed string provided. Either supply it as an argument or set HEIGHTMAP_SEED env variable')
  }
  console.log('Using seed %s', seedString)
  const heightMap = seedChunk({ chunkSize: 10, posX: 137, posY: 50, seed: seedString })

  console.log(heightMap.map(row => row.map(value => (value * 10).toFixed(3)).join(' ')).join('\n'))
})().catch(e => {
  console.error(e)
  process.exit(1)
})
