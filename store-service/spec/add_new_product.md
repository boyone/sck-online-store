# Add New Product

Authenticated User can add new products via API

## Convention

1. Implement following plan with step by step
2. Use TDD to implement

## Plan 1

1. Create api
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

   - Response(success)
     - status code: 201
     - body: { "id": "<product id>"}
   - Response(client error)
     - status code: 400
     - body: { "error": "<invalid data with detail>"}
   - Response(server error)
     - status code: 500
     - body: { "error": "<error message>"}

2. Add CreateNewProduct at ProductService, product.go
3. Add CreateNewProduct at ProductRepository, repository.go

## Plan 3: integration test