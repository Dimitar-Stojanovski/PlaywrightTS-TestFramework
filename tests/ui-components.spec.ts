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

    test('tooltips', async({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByRole('link',{name:'Tooltip'}).click()

        const tooltipCard = page.locator('nb-card',{hasText:'Tooltip Placements'})

        await tooltipCard.getByRole('button',{name:'Top'}).hover()

        //Asserting the text in the tooltip
        const tooltip = await page.locator('nb-tooltip').textContent()
        //const tooltiip2 = page.locator('nb-tooltip')
        expect(tooltip).toEqual('This is a tooltip')
        //await expect(tooltiip2).toHaveText('This is a tooltip')
    })

    test('dialog boxes', async({page})=>{
        await page.getByText('Tables & Data').click()
        await page.getByRole('link',{name:'Smart Table'}).click()

        //finding the trash item element
        //await page.getByRole('table').locator('tr',{hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
        
        //Using listener to catch the dialog(alert) and accepting it. Playright by default is canceling them
        page.on('dialog', dialog=>{
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        //finding the trash item element
        //await page.getByRole('table').locator('tr',{hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
        
        
        
        //finding the element  in another way
        const firstTrashButton = page.getByRole('table').locator('i.nb-trash').first();
        await firstTrashButton.click()
        
        const firstTableRow = page.locator('table > tbody > tr').first()
        await expect(firstTableRow).not.toHaveText('mdo@gmail.com')

      
       

    })

    test('Web Tables part 1', async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByRole('link',{name:'Smart Table'}).click()

        // Getting the text in any kind of row
        const targetRow = page.getByRole('row',{name:"twitter@outlook.com"})
        await targetRow.locator('i.nb-edit').click()

        const ageInput = page.locator('input-editor').getByPlaceholder('Age')
        await ageInput.clear()
        await ageInput.fill('35')
        await page.locator('.nb-checkmark').click()

        //get the row of the value based on specific row
        
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
        const targetRowById = page.getByRole('row', {name:"11"}).filter({has:page.locator('td').nth(1).getByText('11')})
        await targetRowById.locator('i.nb-edit').click()

        const emailInput =  page.locator('input-editor').getByPlaceholder('E-mail')
        await emailInput.clear()
        await emailInput.fill('test@mail.com')
        await page.locator('.nb-checkmark').click()

        //Assert the new email
        await expect(targetRowById.locator('td').nth(5)).toHaveText('test@mail.com')



    })

    test('Web Tables part 2', async({page}) => {

        await page.getByText('Tables & Data').click()
        await page.getByRole('link',{name:'Smart Table'}).click()

        // filter that all columns have the searcehd value(Ex Age)
        var ageInput = page.getByPlaceholder("Age")
        const ages = ["20", "30", "40","200"]

        for(let age of ages){
            await ageInput.fill(age)
            await page.waitForTimeout(500)

            const ageRows = page.locator('tbody tr')
            for(let row of await ageRows.all()){
                const cellVallue = await row.locator('td').last().textContent();
                if(age == "200"){
                    expect(cellVallue).toEqual(" No data found ")
                } else{
                    expect(cellVallue).toEqual(age)
                }    
               
            }
        }

    })

    test('Date Picker part 1', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByRole('link',{name:'Datepicker'}).click()

        const calendarInput = page.getByPlaceholder('Form Picker')

        await calendarInput.click()
        
        await page.locator("//*[@class='day-cell ng-star-inserted']").getByText('14', {exact:true}).click()

        await expect(calendarInput).toHaveValue('May 14, 2024')
    })

    test('Date Picker part 2', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByRole('link',{name:'Datepicker'}).click()

        const calendarInput = page.getByPlaceholder('Form Picker')

        await calendarInput.click()

        let date = new Date()
        date.setDate(date.getDate() +1)
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleDateString('En-US', {month:'short'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`
        
        await page.locator("//*[@class='day-cell ng-star-inserted']").getByText(expectedDate, {exact:true}).click()

        await expect(calendarInput).toHaveValue(dateToAssert)
    })

    test('Sliders', async({page})=>{
         // First way update Slider Attribute

         const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
         await tempGauge.evaluate(node =>{
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy','232.630')
         })
         await tempGauge.click()

        //  //Mouse movement
        //  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        //  await tempBox.scrollIntoViewIfNeeded()

        // const box = await tempBox.boundingBox()
        // const a = box.x + box.width / 2
        // const b = box.y + box.height / 2

        // await page.mouse.move(a,b)
        // await page.mouse.down()
        // await page.mouse.move(a+100, b)
        // await page.mouse.move(a+100.,b+100)
        // await page.mouse.up()
        // await expect(tempBox).toContainText('30')


    })
    
