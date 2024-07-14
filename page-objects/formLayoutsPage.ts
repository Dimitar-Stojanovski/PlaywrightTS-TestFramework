import { Locator, Page } from "@playwright/test";

export class FormsLayoutPage{

    private readonly page:Page
    private readonly usingTheGridForm:Locator
    private readonly emailInput:Locator
    private readonly passwordInput: Locator
    private readonly signInButton:Locator

    //Inline Form
    private readonly inlineForm:Locator
    private readonly fullNameInput:Locator
    private readonly emainInputInlineForm:Locator
    

    constructor(page:Page){
        this.page = page
        this.usingTheGridForm = page.locator('nb-card', {hasText:'Using The Grid'})
        this.emailInput = this.usingTheGridForm.getByRole('textbox',{name:'Email'})
        this.passwordInput = this.usingTheGridForm.getByRole('textbox', {name:'Password'})
        this.signInButton = this.usingTheGridForm.getByRole('button')

        //Inlineform
        this.inlineForm = page.locator('.inline-form')
        this.fullNameInput = this.inlineForm.getByPlaceholder('Jane Doe')
        this.emainInputInlineForm= this.inlineForm.getByPlaceholder('Email')

        
    }

    submitUsingTheGridFormAndSelectOption = async(email:string,password:string, optionText:string)=>{
    
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.usingTheGridForm.getByRole('radio', {name:optionText}).check({force:true})
        await this.signInButton.click()

    }

    async fillOutInlineForm(fullname:string, email:string, ){

    }



}