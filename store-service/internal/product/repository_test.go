//go:build integration
// +build integration

package product_test

import (
	"context"
	"store-service/internal/product"
	"testing"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
)

func Test_ProductRepository(t *testing.T) {
	connection, err := sqlx.Connect("mysql", "user:password@(localhost:3306)/store")
	if err != nil {
		t.Fatalf("cannot tearup data err %s", err)
	}
	repository := product.ProductRepositoryMySQL{
		DBConnection: connection,
	}

	t.Run("GetProductByID_Input_ID_2_Should_Be_Product_Detail_No_Error", func(t *testing.T) {
		expected := product.ProductDetail{
			ID:    2,
			Name:  "43 Piece dinner Set",
			Price: 12.95,
			Stock: 200,
			Brand: "CoolKidz",
			Image: "/43_Piece_dinner_Set.png",
		}
		ID := 2

		actualProduct, err := repository.GetProductByID(context.Background(), ID)
		assert.Equal(t, expected, actualProduct)
		assert.Equal(t, err, nil)
	})

	t.Run("UpdateStock_Input_Product_ID_2_No_Error", func(t *testing.T) {
		productID := 2
		stock := 1
		err := repository.UpdateStock(context.Background(), productID, stock)

		assert.Equal(t, nil, err)
	})

	t.Run("CreateNewProduct_Input_NewProduct_Should_Be_New_ID_No_Error", func(t *testing.T) {
		newProduct := product.NewProduct{
			Name:  "Happiness Training Bicycle",
			Brand: "SportsFun",
			Price: 119.95,
			Stock: 100,
		}

		actualID, err := repository.CreateNewProduct(context.Background(), newProduct)

		assert.NoError(t, err)
		assert.NotZero(t, actualID)

		productDetail, err := repository.GetProductByID(context.Background(), actualID)
		assert.Equal(t, newProduct.Name, productDetail.Name)
		assert.Equal(t, newProduct.Brand, productDetail.Brand)
		assert.Equal(t, newProduct.Price, productDetail.Price)
		assert.Equal(t, newProduct.Stock, productDetail.Stock)
		assert.Equal(t, newProduct.Image, productDetail.Image)
	})
}
