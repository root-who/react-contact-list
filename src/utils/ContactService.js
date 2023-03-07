export const getContacts = ()=>{
    const contacts = localStorage.getItem("all_contacts")
    if (contacts) return JSON.stringify(contacts)
    return contacts

}

export const setContacts = (contacts)=>{
    localStorage.setItem("all_contacts", JSON.parse(contacts))
}


