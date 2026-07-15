#!/usr/bin/env node

import { Command } from 'commander'
import { listProductBrand } from './list-product-brand'
import { newProduct } from './new-product'

const program = new Command()

program
  .name('data-generator')
  .description('CLI tool for generating test data for sck-online-store')
  .version('1.0.0')

program
  .command('list-product-brand')
  .description('Retrieve distinct product brands from database and save to output/product-brands.json')
  .action(async () => {
    try {
      await listProductBrand()
    } catch (err) {
      console.error('Error:', err)
      process.exit(1)
    }
  })

program
  .command('new-products')
  .description('Generate new products and save to output/new-products.json')
  .argument('<numberOfNewProduct>', 'Number of new products to generate', parseInt)
  .action(async (numberOfNewProduct: number) => {
    try {
      await newProduct(numberOfNewProduct)
    } catch (err) {
      console.error('Error:', err)
      process.exit(1)
    }
  })

program.parse(process.argv)
