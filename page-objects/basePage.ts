import { Locator, Page } from "@playwright/test";

export class BasePage{

   protected readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }


    protected async waitForNumberOfSeconds(timeInSeconds:number){
        await this.page.waitForTimeout(timeInSeconds *10000)
    }

    protected async clickOn(locator:Locator){
        await locator.click()
    }

    protected async Type(locator:Locator, text:string){
        await locator.fill(text)
    }

}