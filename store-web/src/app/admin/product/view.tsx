'use client'

import Button from '@/components/button/button'
import InputField from '@/components/input-field'
import createNewProductService from '@/services/new-product'
import { useState } from 'react'

// ----------------------------------------------------------------------

const ProductManagementView = () => {
  const [productName, setProductName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [modalMessage, setModalMessage] = useState('')

  const onClickCreateProduct = async () => {
    const result = await createNewProductService({
      'product-name': productName,
      'product-brand': brand,
      'product-price': Number(price),
      'product-stock': Number(stock)
    })
    if (!result.message) {
      setModalMessage(`add ${productName} success`)
      setProductName('')
      setBrand('')
      setPrice('')
      setStock('')
    }
  }

  return (
    <div className="bg-white">
      <div className="min-h-[calc(100vh-88px)] mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Product Management
        </h1>

        <div className="max-w-lg flex flex-col gap-4">
          <InputField
            id="product-name"
            label="Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <InputField
            id="product-brand"
            label="Brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <InputField
            id="product-price"
            label="Price(USD)"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <InputField
            id="product-stock"
            label="Stock"
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <div className="mt-4">
            <Button
              id="new-product-btn"
              type="button"
              isblock="true"
              onClick={onClickCreateProduct}
            >
              Create Product
            </Button>
          </div>
        </div>
      </div>

      {modalMessage && (
        <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="modal-box">
            <p>{modalMessage}</p>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setModalMessage('')}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagementView
