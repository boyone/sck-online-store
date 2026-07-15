import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PDFParse } = require('pdf-parse')

/**
 * Converted from Robot Framework:
 *   atdd/ui/002-Order-Summary-PDF/TSS-OSP-001-Order_one_product_one_unit_success.robot
 *
 * ทดสอบ สั่งซื้อสินค้า Balance Training Bicycle จัดส่งด้วย Kerry
 * ชำระเงินด้วยบัตรเครดิต Visa สำเร็จ และตรวจสอบใบเสร็จ
 */
test('order Balance Training Bicycle with Kerry shipping and Visa credit card, then verify the receipt PDF', async ({ page }) => {
  // เข้าสู่เว็บไซต์ และตรวจสอบว่า redirect มาที่ /auth/login
  await test.step('เข้าสู่เว็บไซต์ และตรวจสอบว่า redirect มาที่ /auth/login', async () => {
    await page.context().clearCookies()
    await page.goto('/product/list')
    await expect(page).toHaveURL(/\/auth\/login/)
    await expect(page.locator('#login-page')).toBeVisible()
  })

  // เข้าสู่ระบบ
  await test.step('เข้าสู่ระบบ', async () => {
    await expect(page.locator('#login-username-input')).toBeVisible()
    await page.fill('#login-username-input', 'user_1')
    await page.fill('#login-password-input', 'P@ssw0rd')
    await page.click('#login-btn')
    await page.waitForURL('**/product/list')
    await expect(page.locator('#product-list')).toBeVisible()
  })

  // เลือกดูสินค้า
  await test.step('เลือกดูสินค้า Balance Training Bicycle', async () => {
    const card = page.locator('#product-card-name-1')
    await expect(card).toBeVisible()
    await expect(card).toContainText('Balance Training Bicycle')
    await card.click()
  })

  // ตรวจสอบรายละเอียดสินค้า
  await test.step('ตรวจสอบรายละเอียดสินค้า', async () => {
    await expect(page.locator('#product-detail-product-name')).toBeVisible()
    await expect(page.locator('#product-detail-product-name')).toHaveText('Balance Training Bicycle')
    await expect(page.locator('#product-detail-brand')).toHaveText('SportsFun')
    await expect(page.locator('#product-detail-price-thb')).toHaveText('฿4,314.60')
    await expect(page.locator('#product-detail-point')).toHaveText('43 Points')
  })

  // เพิ่มสินค้าลงตะกร้า
  await test.step('เพิ่มสินค้าลงตะกร้า', async () => {
    await page.click('#product-detail-add-to-cart-btn')
    await expect(page.locator('#header-menu-cart-badge')).toContainText('1')
  })

  // ตรวจสอบข้อมูลสินค้าในตะกร้า และ Checkout
  await test.step('ตรวจสอบข้อมูลสินค้าในตะกร้า และ Checkout', async () => {
    await page.click('#header-menu-cart-btn')
    await expect(page.locator('#product-1-price')).toBeVisible()
    await expect(page.locator('#product-1-name')).toHaveText('Balance Training Bicycle')
    await expect(page.locator('#product-1-price')).toHaveText('฿4,314.60')
    await expect(page.locator('#product-1-point')).toHaveText('43 Points')
    await expect(page.locator('#shopping-cart-subtotal-price')).toHaveText('฿4,314.60')
    await page.click('#shopping-cart-checkout-btn')
  })

  // ใส่ที่อยู่จัดส่งสินค้า
  await test.step('ใส่ที่อยู่จัดส่งสินค้า', async () => {
    await page.fill('#shipping-form-first-name-input', 'ณัฐพล')
    await page.fill('#shipping-form-last-name-input', 'ศรีสมบัติ')
    await page.fill('#shipping-form-address-input', '43/8 หมู่บ้านเปี่ยมสุข ถนนลาดพร้าว ซอย 63')
    await page.selectOption('#shipping-form-province-select', { label: 'กรุงเทพมหานคร' })
    await page.selectOption('#shipping-form-district-select', { label: 'เขตวังทองหลาง' })
    await page.selectOption('#shipping-form-sub-district-select', { label: 'วังทองหลาง' })
    await expect(page.locator('#shipping-form-zipcode-input')).toHaveValue('10310')
    await page.fill('#shipping-form-mobile-input', '0891234567')
  })

  // เลือกวิธีจัดส่งสินค้าเป็น kerry
  await test.step('เลือกวิธีจัดส่งสินค้าเป็น kerry', async () => {
    await page.click('#shipping-method-1-card')
  })

  // ตรวจสอบค่าจัดส่งสินค้าของ Kerry เท่ากันกับ 50.00 บาท
  await test.step('ตรวจสอบค่าจัดส่งสินค้าของ Kerry เท่ากันกับ 50.00 บาท', async () => {
    await expect(page.locator('#shipping-method-1-fee')).toHaveText('฿50.00')
  })

  // เลือกช่องทางการชำระเงินแบบ VISA Credit Card
  await test.step('เลือกช่องทางการชำระเงินแบบ VISA Credit Card', async () => {
    await page.click('#payment-credit-input')
    await page.fill('#payment-credit-form-fullname-input', 'Nattapon Srisombat')
    await page.fill('#payment-credit-form-card-number-input', '5123 4500 0000 0008')
    await page.fill('#payment-credit-form-expiry-input', '01/39')
    await page.fill('#payment-credit-form-cvv-input', '100')
  })

  // ตรวจสอบราคารวมที่ต้องชำระเงิน ต้องเท่ากันกับ 4,364.60
  await test.step('ตรวจสอบราคารวมที่ต้องชำระเงิน ต้องเท่ากันกับ 4,364.60', async () => {
    await expect(page.locator('#order-summary-total-payment-price')).toBeVisible()
    await expect(page.locator('#order-summary-total-payment-price')).toHaveText('฿4,364.60')
  })

  // ยืนยัน OTP
  await test.step('ยืนยัน OTP', async () => {
    await page.click('#payment-now-btn')
    await expect(page.locator('#otp-input')).toBeVisible()
    await page.getByRole('button', { name: 'Request OTP' }).click()
    await page.fill('#otp-input', '124532')
    await page.getByRole('button', { name: 'OK' }).click()
  })

  // ตรวจสอบหมายเลขพัสดุว่าต้องขึ้นต้นด้วย KR
  await test.step('ตรวจสอบหมายเลขพัสดุว่าต้องขึ้นต้นด้วย KR', async () => {
    const trackingId = page.locator('#order-success-tracking-id')
    await expect(trackingId).toBeVisible()
    await expect(trackingId).toContainText('KR-')
    await expect(trackingId).toHaveText(/^KR-\d{7,9}$/)
  })

  // กดดาวน์โหลดไฟล์ + ตรวขสอบข้อมูลในไฟล์ PDF
  await test.step('กดดาวน์โหลดไฟล์ และตรวจสอบข้อมูลในไฟล์ PDF', async () => {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#download-order-summary-btn'),
    ])

    const downloadDir = path.join(__dirname, '..', 'temp_downloads')
    fs.mkdirSync(downloadDir, { recursive: true })
    const filePath = path.join(downloadDir, download.suggestedFilename())
    await download.saveAs(filePath)

    const dataBuffer = fs.readFileSync(filePath)
    const parser = new PDFParse({ data: dataBuffer })
    const pdf = await parser.getText()
    await parser.destroy()
    const text = pdf.text

    expect(text).toContain('Full Name: Sck Shuhari')
    expect(text).toContain('Tracking Number: KR')
    expect(text).toContain('Payment Method: Credit Card / Debit Card')

    // ${product_brand} - ${product_name} ${product_price} ${product_unit} ${product_total_price}
    expect(text).toContain('SportsFun - Balance Training Bicycle 4,314.60 1 4,314.60')

    expect(text).toContain('Merchandise Subtotal (THB) 4,314.60')
    // {kerry=50.00} and {total_price} appear on separate lines in pdf-parse v2 output
    expect(text).toContain('Shipping Fee (THB) 50.00')
    expect(text).toContain('Total Price (THB) 4,364.60')
    expect(text).toContain('Receiving Points 43')
  })
})
