import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

test.describe('Logout Functionality', () => {
    test.beforeEach(async ({ page }) => {
        // B1: login vào hệ thống
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.login('admin-testing11@gmail.com', '123456')
        await page.waitForTimeout(3000) // chờ 1s để đảm bảo đã login thành công
    })

    test('TC02: Logout by clearing all localStorage data', async ({ page }) => {
        const loginPage = new LoginPage(page)
        // dùng evaluate để thực hiện xóa toàn bộ localStorage data
        await page.evaluate(() => localStorage.clear())

        await page.waitForTimeout(2000) // chờ 1s để đảm bảo đã xóa localStorage thành công

        // reload lại trang để áp dụng việc xóa localStorage
        await page.reload()

        // sau khi reload trang, kiểm tra xem đã bị logout hay chưa
        // có thể kiểm tra bằng cách xác nhận rằng URL đã chuyển về trang login
        await expect(page).toHaveURL('https://demo4.cybersoft.edu.vn/login')

        // check link Signin có hiển thị hay không
        await expect(loginPage.loginLink).toBeVisible()

        const storageLength = await page.evaluate(() => localStorage.length)
        expect(storageLength).toBe(0)
    })
})

