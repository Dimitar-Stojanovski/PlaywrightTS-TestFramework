import { Page,expect } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormsLayoutPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

export class PageManager{

    private readonly page:Page
    private readonly navigationPage:NavigationPage
    private readonly formsLayoutPage:FormsLayoutPage
    private readonly datePickerPage:DatePickerPage

    constructor(page:Page){
        this.page = page;
        this.navigationPage = new NavigationPage(this.page)
        this.formsLayoutPage = new FormsLayoutPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)


    }

    navigateTo(){
        return this.navigationPage;
    }

    formLayoutPage(){
        return this.formsLayoutPage;
    }

    onDatePickerPage(){
        return this.datePickerPage;
    }

}