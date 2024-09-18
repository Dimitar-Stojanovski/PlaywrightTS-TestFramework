import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";


export class NavigationPage extends BasePage{

    
    readonly formlayoutMenuItem:Locator
    readonly datePickerMenuItem:Locator
    readonly smartTableMenuItem:Locator
    readonly toolTipMenuItem:Locator


    constructor(page:Page){
        super(page)
        this.formlayoutMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByRole('link',{name:'Datepicker'})
        this.smartTableMenuItem = page.getByRole('link',{name:'Smart Table'})
        this.toolTipMenuItem = page.getByRole('link',{name:'Tooltip'})
    }

    formLayoutPage = async()=>{
        await this.page.getByText('Forms').click()
        //await this.formlayoutMenuItem.click()
        await this.clickOn(this.formlayoutMenuItem)
        
    }

    async datePickerPage(){
        await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
        
    }

    async smartTablePage(){
        await this.page.getByText('Tables & Data').click()
        await this.smartTableMenuItem.click()
    }

    async toasterPage(){

    }

    async toolTipPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.toolTipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle:string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        if(expandedState == "false"){
            await groupMenuItem.click()
        }
    }
}