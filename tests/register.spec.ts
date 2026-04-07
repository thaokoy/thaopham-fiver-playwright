import test, { expect } from '@playwright/test'
import { RegisterPage } from '../pages/registerPage'

test.describe('Register test case', () => {
    test('TC01: Register successfully', async ({ page }) => {
        const registerPage = new RegisterPage(page)

        await page.goto(registerPage.url)

        await registerPage.register({
            name: "Phuong",
            email: `phuong${Date.now()}@gmail.com`,
            password: '123456',
            confirmPassword: '123456',
            phone: '0334532345',
            birthday: '1990-01-01',
            gender: 'male'
        })

        await page.waitForTimeout(5000)
        const isSuccess = await registerPage.isRegisterSuccess()
        expect(isSuccess).toBe(true)
    })
})