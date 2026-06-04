import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'
import { listProductBrand } from './list-product-brand'

interface NewProduct {
  'product-name': string
  'product-brand': string
  'product-price': number
  'product-stock': number
}

async function readProductBrands(): Promise<string[]> {
  const outputPath = path.join(process.cwd(), 'output', 'product-brands.json')

  if (!fs.existsSync(outputPath)) {
    await listProductBrand()
  }

  const content = fs.readFileSync(outputPath, 'utf-8')
  return JSON.parse(content) as string[]
}

export function generateUniqueName(
  existingNames: Set<string>,
  generate: () => string,
  maxAttempts = 5
): string {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const name = generate()
    if (!existingNames.has(name)) {
      return name
    }
  }
  return generate()
}

export async function newProduct(numberOfNewProduct: number): Promise<void> {
  const productBrands = await readProductBrands()
  const newProducts: NewProduct[] = []
  const usedNames = new Set<string>()

  for (let i = 0; i < numberOfNewProduct; i++) {
    const productName = generateUniqueName(usedNames, () => faker.commerce.productName())
    usedNames.add(productName)
    const productPrice = parseFloat((faker.number.float({ min: 50, max: 1000 })).toFixed(2))
    const productStock = faker.number.int({ min: 50, max: 1000 })
    const productBrand = faker.helpers.arrayElement(productBrands)

    newProducts.push({
      'product-name': productName,
      'product-brand': productBrand,
      'product-price': productPrice,
      'product-stock': productStock,
    })
  }

  const outputDir = path.join(process.cwd(), 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const outputPath = path.join(outputDir, 'new-products.json')
  fs.writeFileSync(outputPath, JSON.stringify(newProducts, null, 2))
  console.log(`Saved ${newProducts.length} product(s) to ${outputPath}`)
}
