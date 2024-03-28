import {test} from '@playwright/test'




test.describe('test suite 1 ', ()=>{

test.beforeEach(async ({page}) => {
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByRole('link',{name:'Form Layouts'}).click()
})

 
test('Locator Syntax rules',async ({page}) => {
  
  //By tagname
  await page.locator('input')

  //By id
  await page.locator('#inputEmails')

  //By attribute
  await page.locator('[placeholder="Email"]')

  //Combining different selectors
  await page.locator('input[placeholder="Email"]')

  //Partial link text
  await page.locator(':text("Using the")')

  // By exact match
  await page.locator(':text-is("Using the grid")')
})

test('User-facing locators', async({page})=>{
 
  await page.getByRole('textbox',{name:"Email"}).first().click()
  //await page.getByRole('button',{name:"Sign in"}).first().click()
  await page.getByLabel("Email").click()

})





})