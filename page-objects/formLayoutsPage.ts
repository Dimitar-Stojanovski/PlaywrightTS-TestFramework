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
    private readonly sumbitButtonInlineForm:Locator

    constructor(page:Page){
        this.page = page
        this.usingTheGridForm = page.locator('nb-card', {hasText:'Using The Grid'})
        this.emailInput = this.usingTheGridForm.getByRole('textbox',{name:'Email'})
        this.passwordInput = this.usingTheGridForm.getByRole('textbox', {name:'Password'})
        this.signInButton = this.usingTheGridForm.getByRole('button')

        //Inlineform
        this.inlineForm = page.locator('nb-card', {hasText:'Inline form'})
        this.fullNameInput = this.inlineForm.getByPlaceholder('Jane Doe')
        this.emainInputInlineForm= this.inlineForm.getByPlaceholder('Email')
        this.sumbitButtonInlineForm = this.inlineForm.getByRole('button',{name:'Submit'})

        
    }

    submitUsingTheGridFormAndSelectOption = async(email:string,password:string, optionText:string)=>{
    
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.usingTheGridForm.getByRole('radio', {name:optionText}).check({force:true})
        await this.signInButton.click()

    }
    /**
     * This is a sample method descritpion which is generated with cross and double star signs
     * @param fullname 
     * @param email 
     * @param rememberMe 
     */
    async fillOutInlineForm(fullname:string, email:string, rememberMe:boolean){
        await this.fullNameInput.fill(fullname)
        await this.emainInputInlineForm.fill(email)

        if(rememberMe == true){
            await this.inlineForm.getByRole('checkbox').check({force:true})
        }
        await this.sumbitButtonInlineForm.click()
        


    }



}