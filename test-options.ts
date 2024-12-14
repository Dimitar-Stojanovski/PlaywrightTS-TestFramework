import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/page.manager'

export type TestOptions ={
    globalsQaURL:string
    formLayoutPage:string,
    pageManager:PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option:true}],

    formLayoutPage: async({page}, use)=>{
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        //Everything code we do after the await use will serve after the test is executed.
    },

    // formLayoutPage: [async({page}, use)=>{
    //     // THIS WITH INITILIAZE BEFORE beforeEach Hook meaning we do not need to pass the fixture in the test in order to run it.
    //     await page.goto('/')
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()
    //     await use('')
    // }, {auto:true}]

    //We can create dependencies between fixtures for example, giving formLayoutPage to be dependent with Page Manager
    pageManager:async({page,formLayoutPage}, use)=>{
        const pm = new PageManager(page)
        await use(pm)
    }
})