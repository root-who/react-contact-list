import { getContacts } from "./ContactService"

export const validateName = (name)=>{
    if(name !== "") return "valid"
}

export const validateTwitter = (twitter)=>{
    let twitterValid= true
    const contacts = getContacts()
    contacts.forEach((value)=>{
        if(value.twitter === twitter){
            twitterValid = false
        }
    })
    if (twitter === "" || twitter.trim() === "") twitterValid = false
    if(twitterValid) return "valid"
}

export const validateTwitterByEdit = (twitter)=>{
    let twitterValid= true
    const contacts = getContacts().filter((value)=> value.twitter !== twitter)
    contacts.forEach((value)=>{
        if(value.twitter === twitter){
            twitterValid = false
        }
    })
    if (twitter === "" || twitter.trim() === "") twitterValid = false
    if(twitterValid) return "valid"
}

export const validatePhoneNumber = (number)=>{
    const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
    if(phoneRegex.test(number)) return "valid"
}