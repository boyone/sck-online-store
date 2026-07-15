# Create Product management page

## User can manage product including

1. Add new product
2. Edit product
3. Disable product

## Plan 1: Add new product

1. Create new product management page
2. Main body including
    - product_name with label: Name
        - id="product-name"
        - type="Text"
    - product_brand with label: Brand
        - id="product-brand"
        - type="Text"
    - product_price_thb with label: Price(USD)
        - id="product-price"
        - type="Text"
    - stock with label: Stock
        - id="product-stock"
        - type="Text"
    - create product button
        - id="new-product-btn"
        - type="button"

## Plan 2: Create new product service

1. Create CreateNewProduct at services/new-product.ts to call api with following spec:
   - Request
     - path: 'api/v1/product'
     - method: 'POST'
     - content-type: 'application/json'
     - body:

       ```json
       {
           "product-name": "BalancTraining Bicycle", // not null
           "product-brand": "SportsFun", // not null
           "product-price": 119.95, // not null
           "product-stock": 100 // not null
       }
       ```

2. Add CreateNewProduct Action for 'new-product-btn' to bind with CreateNewProduct at services/new-product.ts
3. After create success page should show toast with 'add <product name> success' then clear the inputs

## Plan 3: Update create sucess

1. After create success page should show modal with 'add <product name> success' message then clear the inputs instead of toast