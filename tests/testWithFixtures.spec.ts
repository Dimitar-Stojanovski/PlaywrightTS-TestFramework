import{test} from '../test-options'
import { PageManager } from '../page-objects/page.manager'
import {faker} from '@faker-js/faker'


test('test by using Fixtures', async({page,formLayoutPage})=>{
    
    const pm = new PageManager(page)

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.trim()}${faker.number.int(1000)}@test.com`
    
   
    await pm.formLayoutPage().submitUsingTheGridFormAndSelectOption(randomEmail,'Welcome 2','Option 1')
    await pm.formLayoutPage().fillOutInlineForm(randomFullName, randomEmail, true)

    
})

test('test by using Fixtures as page object class is in Fixture', async({pageManager})=>{
    
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.trim()}${faker.number.int(1000)}@test.com`
    
   
    await pageManager.formLayoutPage().submitUsingTheGridFormAndSelectOption(randomEmail,'Welcome 2','Option 1')
    await pageManager.formLayoutPage().fillOutInlineForm(randomFullName, randomEmail, true)

    
})



// test('test by using Fixtures with auto true', async({page})=>{
    
//     const pm = new PageManager(page)

//     const randomFullName = faker.person.fullName()
//     const randomEmail = `${randomFullName.trim()}${faker.number.int(1000)}@test.com`
    
   
//     await pm.formLayoutPage().submitUsingTheGridFormAndSelectOption(randomEmail,'Welcome 2','Option 1')
//     await pm.formLayoutPage().fillOutInlineForm(randomFullName, randomEmail, true)

    
// })