# Create New Product

## Convention

1. test() is isolate
2. if test has multiple step use test.step()
3. if tests have same group create under describe()
4. api spec use from [swagger](../../../store-service/cmd/docs/swagger.yaml)
5. baseURL is 'http://localhost'

## Plan 1:

1. create api test call create_new_product.ts
   - login with
     - user: user_1
     - password: P@ssw0rd
   - then click at user menu
     - id="header-menu-user-btn"
   - then click at admin(admin action list)
     - id="admin-action-list"
   - fill in form
     - product name
       - id="product-name"
       - value="Hellox"
     - product brand
       - id="product-brand"
       - value="SCK"
     - product_price
       - id="product-price"
       - value=100
     - stock
       - id="product-stock"
       - value=100
   - click create product button
     - id="new-product-btn"
