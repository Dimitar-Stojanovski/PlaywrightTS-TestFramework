import {expect, test} from '@playwright/test'
import exp from 'constants'




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

test('Locating child elements', async({page})=>{
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()

  //You can chain locators alternatively
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

  //Using lists
  await page.locator('nb-card').nth(3).getByRole('button').click()


})

test('Locating parent Elements', async({page})=>{
    //Approach 1
    await page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'}).fill('Hello World')

    //Approach 2
    await page.locator('nb-card',{has:page.locator('#inputPassword2')}).getByRole('textbox',{name:'Password'}).fill('Hello World')

    //Approach 3 using FILTER
    await page.locator('nb-card').filter({hasText:"Basic Form"}).getByLabel('Email address').fill('Hello World')

    //Approach 4 chaining filter
    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"})
          .getByRole('textbox', {name:"Email"}).fill("Playwright Hello")

})

test('Reusing locators', async({page})=>{
  
  const basicForm =  page.locator('nb-card').filter({hasText:"Basic Form"})
  const emailField = basicForm.getByLabel('Email address')

  await  emailField.fill('test@test.com')

  await basicForm.getByLabel('Password').fill('Password123')

  await basicForm.locator('nb-checkbox').click()

  await basicForm.getByRole('button',{name:"Submit"}).click()

  await expect(emailField).toHaveValue('test@test.com')

})

test('Extracting values from elements', async ({page}) => {
  
  //Single text value
  const basicForm =  page.locator('nb-card').filter({hasText:"Basic Form"})
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all text values
  const allRadioBtnsLables = await page.locator('nb-radio').allTextContents()
  expect(allRadioBtnsLables).toContain('Option 1')

  // input value
  const emailField = basicForm.getByRole('textbox', {name:'Email'});
  await emailField.fill('test@test.com')
  const emailValue= await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')


  //getting value from attribute
  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')


})

test('assertions', async({page})=>{

  //General assertions
  const basicFormButton =  page.locator('nb-card').filter({hasText:"Basic Form"}).locator('button')
  expect(basicFormButton).toBeVisible();

  const textOnButton =await basicFormButton.textContent()
  expect(textOnButton).toEqual("Submit")

  // Locator assetion
 await expect(basicFormButton).toHaveText("Submit")

 //Soft assetions
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()

})





})