jest.mock('@faker-js/faker', () => ({ faker: {} }))
jest.mock('../list-product-brand', () => ({ listProductBrand: jest.fn() }))

import { generateUniqueName } from '../new-product'

describe('generateUniqueName', () => {
  it('returns generated name when no conflict exists', () => {
    const existingNames = new Set<string>()
    const generate = () => 'Balance Training Bicycle'

    const result = generateUniqueName(existingNames, generate)

    expect(result).toBe('Balance Training Bicycle')
  })

  it('retries and returns a unique name when first attempt is a duplicate', () => {
    const existingNames = new Set(['Duplicate Name'])
    const names = ['Duplicate Name', 'Unique Name']
    let callCount = 0
    const generate = () => names[callCount++]

    const result = generateUniqueName(existingNames, generate)

    expect(result).toBe('Unique Name')
    expect(callCount).toBe(2)
  })

  it('returns last attempt after exhausting 5 retries when all names are duplicates', () => {
    const existingNames = new Set(['Dup'])
    const generate = () => 'Dup'
    let callCount = 0
    const countingGenerate = () => { callCount++; return generate() }

    const result = generateUniqueName(existingNames, countingGenerate, 5)

    expect(result).toBe('Dup')
    expect(callCount).toBe(6) // 5 retries + 1 final fallback
  })
})
