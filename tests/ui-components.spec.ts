import{test,expect} from '@playwright/test'
import exp from 'constants'

test.beforeEach(async({page})=>{
    await page.goto('/')
})

test.describe('Forms layout page',()=>{
    
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByRole('link',{name:'Form Layouts'}).click()
    })


    test('Input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).getByLabel('Email')

        await usingTheGridEmailInput.fill("Test2@mail.com")
        await usingTheGridEmailInput.clear()

        //Using keybord 
        await usingTheGridEmailInput.pressSequentially('Test2@mail.com', {delay:100})

        //Assertions
         //generic
         const inputValue = await usingTheGridEmailInput.inputValue()
         expect(inputValue).toEqual("Test2@mail.com")

         //locator assertion
         await expect(usingTheGridEmailInput).toHaveValue('Test2@mail.com')
    })

    test('Radio Buttons', async({page}) => {
        const usintTheGridForm = page.locator('nb-card', {hasText:"Using the Grid"})

        // using force true because the element has class visually hiden, without force it won't work
        await usintTheGridForm.getByLabel('Option 1').check({force:true})
        
        //Assertion
        const radio1Status = await usintTheGridForm.getByLabel('Option 1').isChecked()
        expect(radio1Status).toBeTruthy()

        await usintTheGridForm.getByRole('radio',{name:"Option 2"}).check({force:true})
        const radio2status = usintTheGridForm.getByRole('radio',{name:"Option 2"})
        await expect(radio2status).toBeChecked()
        
    })
})

    test('Checkboxes', async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByRole('link',{name:'Toastr'}).click()
        
        await page.getByRole('checkbox',{name:'Hide on click'}).uncheck({force:true})

        await page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force:true})

        const checkboxes = page.getByRole('checkbox');

        for(const box of await checkboxes.all()){
            await box.uncheck({force:true})
            expect(await box.isChecked()).toBeFalsy()
        }

        //Oposit assertion that all are checked
        for(const box of await checkboxes.all()){
            await box.check({force:true})
            await expect( await box.isChecked()).toBeTruthy()
        }

        
    })
    
    test('lists and dropdowns', async({page})=>{
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list') // when the list has a UL tag
        page.getByRole('listitem') //when the list has LI tag

        const optionList = page.getByRole('list').locator('nb-option')
        await expect(optionList).toHaveText(["Light", "Dark","Cosmic","Corporate"]) 

        await optionList.filter({hasText:"Cosmic"}).click()

        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
       

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic":"rgb(50, 50, 89)",
            "Corporate":"rgb(255, 255, 255)"
        }
        
        await dropdownMenu.click()
        
        //using for loop to iterate through all options
        for(const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if(color != "Corporate")
                await dropdownMenu.click()
                 
        }
    })
    
