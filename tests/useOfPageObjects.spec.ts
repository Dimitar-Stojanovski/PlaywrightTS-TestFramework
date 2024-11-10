import{expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/page.manager'
import {faker} from '@faker-js/faker'



test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200')
    
})

test('navigate to Form Page', async({page})=>{

    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page)
    // await navigateTo.formLayoutPage()
    // await navigateTo.datePickerPage()
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datePickerPage()
    
    
})

test('parametized methods', async({page})=>{
    // const navigateTo = new NavigationPage(page)
    // const formlayoutPage = new FormsLayoutPage(page)
    // const datePickerPage = new DatePickerPage(page)
    const pm = new PageManager(page)

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.trim()}${faker.number.int(1000)}@test.com`
    
    await pm.navigateTo().formLayoutPage()
    await pm.formLayoutPage().submitUsingTheGridFormAndSelectOption(randomEmail,'Welcome 2','Option 1')

    await pm.formLayoutPage().fillOutInlineForm(randomFullName, randomEmail, true)

    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(2)
    // await pm.onDatePickerPage().selectDatePickerWithRangeOfDates(2,4)
})