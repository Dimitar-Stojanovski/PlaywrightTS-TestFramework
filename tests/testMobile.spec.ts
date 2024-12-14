import {test, expect} from '@playwright/test'


// test.beforeEach(async({page})=>{
   
// })


test('Testing on Mobile Devices', async ({page}, testInfo) => {
    await page.goto('/')
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click()
    await page.getByRole('link',{name:'Form Layouts'}).click()
    const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).getByLabel('Email')

    await usingTheGridEmailInput.fill("Test2@mail.com")

     //locator assertion
     await expect(usingTheGridEmailInput).toHaveValue('Test2@mail.com')
})