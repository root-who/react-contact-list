export const getContacts = ()=>{
    const contacts = localStorage.getItem("all_contacts")
    if (contacts) 
        return JSON.parse(contacts)
    return contacts
}

export const getContact = (id)=>{
    const contacts = JSON.parse(localStorage.getItem("all_contacts"))
    return contacts.filter(value => value.twitter === id)[0]   
}

export const setContacts = (contacts)=>{
    localStorage.setItem("all_contacts", JSON.stringify(contacts))
}

export const addContact = (contact)=>{
    let contacts = getContacts()
    if(contacts){
        contacts.push(contact)
        setContacts(contacts)
    }else setContacts([contact])

    
}

