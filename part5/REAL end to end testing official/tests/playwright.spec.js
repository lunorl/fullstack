const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('http://localhost:5173')
        await request.post('http://localhost:3003/api/testing')
        await request.post('http://localhost:5173/api/users', {     
            data: {
                user: 'liljohn',
                username: 'liljohn',
                password: 'lilguy'
            }
        })
        await request.post('http://localhost:5173/api/users', {     
            data: {
                user: 'liljohne',
                username: 'liljohne',
                password: 'lilguye'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('log in to application')).toBeVisible()
        await expect(page.getByPlaceholder('type username here')).toBeVisible()
        await expect(page.getByPlaceholder('type password here')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login'})).toBeVisible()
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByPlaceholder('type username here').fill('liljohn')
            await page.getByPlaceholder('type password here').fill('lilguy')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('create new')).toBeVisible()
        })
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByPlaceholder('type username here').fill('s')
            await page.getByPlaceholder('type password here').fill('s')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByPlaceholder('type username here').fill('liljohn')
            await page.getByPlaceholder('type password here').fill('lilguy')
            await page.getByRole('button', {name: 'login'}).click()
        })
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', {name: 'new note'}).click()
            await page.getByPlaceholder('title').fill('title')
            await page.getByPlaceholder('author').fill('author')
            await page.getByPlaceholder('url').fill('url')
            await page.getByRole('button', {name: 'create'}).click()
            await expect(page.getByText('title author view')).toBeVisible()
        })
        test('A blog can be liked', async ({ page }) => {
            await page.getByRole('button', {name: 'new note'}).click()
            await page.getByPlaceholder('title').fill('title')
            await page.getByPlaceholder('author').fill('author')
            await page.getByPlaceholder('url').fill('url')
            await page.getByRole('button', {name: 'create'}).click()
            await page.getByRole('button', { name: 'view' }).first().click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('title author hide url likes 1')).toBeVisible()
        })
        test('a blog cannot be deleted by wrong account', async ({ page }) => {
            await page.getByRole('button', {name: 'new note'}).click()
            await page.getByPlaceholder('title').fill('title')
            await page.getByPlaceholder('author').fill('author')
            await page.getByPlaceholder('url').fill('url')
            await page.getByRole('button', {name: 'create'}).click()
            await page.getByRole('button', {name: 'logout'}).click()
            await page.getByPlaceholder('type username here').fill('liljohne')
            await page.getByPlaceholder('type password here').fill('lilguye')
            await page.getByRole('button', {name: 'login'}).click()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
        test('1 likes higher than 0 like', async ({ page }) => {
            await page.getByRole('button', {name: 'new note'}).click()
            await page.getByPlaceholder('title').fill('title')
            await page.getByPlaceholder('author').fill('author')
            await page.getByPlaceholder('url').fill('url')
            await page.getByRole('button', {name: 'create'}).click()
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByPlaceholder('title').fill('title')
            await page.getByPlaceholder('author').fill('author')
            await page.getByPlaceholder('url').fill('url')
            await page.getByRole('button', {name: 'create'}).click()
            await page.getByRole('button', { name: 'view' }).first().click() //if the first one has one likes that means the highest one is at the top
            await expect(page.getByText('title author hide url likes 1')).toBeVisible()
        })
    })
})