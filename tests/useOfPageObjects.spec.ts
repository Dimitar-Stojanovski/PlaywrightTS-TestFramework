import{expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormsLayoutPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200')
})

test('navigate to Form Page', async({page})=>{

    const navigateTo = new NavigationPage(page)
    // await navigateTo.formLayoutPage()
    // await navigateTo.datePickerPage()

    await navigateTo.formLayoutPage()
    await navigateTo.datePickerPage()
    
    
})

test('parametized methods', async({page})=>{
    const navigateTo = new NavigationPage(page)
    const formlayoutPage = new FormsLayoutPage(page)

    await navigateTo.formLayoutPage()
    await formlayoutPage.submitUsingTheGridFormAndSelectOption('test@mail.com','Welcome 2','Option 1')
})