import {test,expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    
  })

test('auto waiting in playwright', async({page}) => {
    const successBtn = page.locator('.bg-success')
    // //await successBtn.click()
    // //const text= await successBtn.textContent()

    // await successBtn.waitFor({state:'attached'})
    // const text= await successBtn.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

   await expect(successBtn).toHaveText('Data loaded with AJAX get request.', {timeout:20000}) 
})

test('alternative waits', async ({page}) => {
    const successBtn = page.locator('.bg-success')

    // wait for an element
    //await page.waitForSelector('.bg-success')

    // wait for an response(api)
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed(NOT RECOMENDED)
    await page.waitForLoadState('networkidle')

    const text= await successBtn.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})