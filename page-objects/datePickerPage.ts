import { Page,expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class DatePickerPage extends BasePage{
    
    constructor(page:Page){
        super(page)


    }

    async selectCommonDatePickerDateFromToday(numberOfDaysOfToday:number){
        const calendarInput = this.page.getByPlaceholder('Form Picker')
        await calendarInput.click()
        const dateToAssert = await this.selectDateFromCalendar(numberOfDaysOfToday)
        await expect(calendarInput).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeOfDates(startFromToday:number, endFromToday:number){
        const calendarInput = this.page.getByPlaceholder('Range Picker')
        await calendarInput.click()
        const dateToAssertToday = await this.selectDateFromCalendar(startFromToday)
        const dateToAssertEndFromToday = await this.selectDateFromCalendar(endFromToday)
        const finalDatesToAssert = `${dateToAssertToday} - ${dateToAssertEndFromToday}`
        await expect(calendarInput).toHaveValue(finalDatesToAssert)

    }

    private async selectDateFromCalendar(numberOfDaysOfToday:number){
        let date = new Date()
        date.setDate(date.getDate() +numberOfDaysOfToday)
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleDateString('En-US', {month:'short'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`
        
        await this.page.locator(".day-cell.ng-star-inserted").getByText(expectedDate, {exact:true}).click()

        return dateToAssert;
    }
}