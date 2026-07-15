# Create New Product

## Goal

1. list distinct product brand that retrieve from database
2. create new products

## Plan 1: Setup project

1. Create cli project with:
   - Typescript v6.0.2
   - Nodejs v25.8.2
   - Fakerjs 10.4.0
   - Eslint typescript
   - @types/mysql
   - commander
   - dotenv

## Plan 2: Implement `list-product-brand` command

1. Create db connection that get required data(Host, Port, Username, Password,...,etc) from `.env`
2. Implement function to support `list-product-brand` command
   1. Retrieved distinct `product_brand` column from `products` table in following scheme

      ```sql
      CREATE TABLE products (
          id BIGINT AUTO_INCREMENT,
          product_name varchar(255),
          product_brand varchar(255),
          stock int,
          product_price double,
          image_url varchar(255),
          created timestamp DEFAULT current_timestamp,
          updated timestamp DEFAULT current_timestamp ON UPDATE current_timestamp,
          PRIMARY KEY (id)
      ) CHARACTER SET utf8 COLLATE utf8_general_ci;
      ```

   2. output should be a file at output directory in root project and call `product-brands.json` for example

      ```json
      ["SportsFun", "CoolKidz"]
      ```

## Plan 3: `new-product` command (simplified)

- Purpose: generate N new product records using existing product brands.

- Steps:
  1. Add a CLI command `new-product <count>` (single numeric argument: number of products to generate).
  2. Read `output/product-brands.json` into a `productBrands` array. If the file is missing, run `list-product-brand` to create it, then read it.
  3. For each product to create (repeat until `count` reached):
      - Pick a brand from `productBrands`.
      - Generate a kid-friendly `product-name` using `Faker`. Ensure the `product-name` is unique within the generated `newProducts` list; if Faker produces a duplicate, retry (e.g., up to 5 attempts) before choosing another brand or name.
      - Generate `product-price`: random decimal between 50.00 and 1000.00 (two decimal places).
      - Generate `product-stock`: random integer between 50 and 1000.
      - Build an object with keys: `product-name`, `product-brand`, `product-price`, `product-stock` and append it to the `newProducts` array.

  4. Write the `newProducts` array to `output/new-products.json`.

Example output:

```json
[
  {
    "product-name": "Balance Training Bicycle",
    "product-brand": "SportsFun",
    "product-price": 119.95,
    "product-stock": 100
  }
]
```
