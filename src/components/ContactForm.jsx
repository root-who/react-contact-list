import React, { useEffect, useState,} from "react"
import { Link, useLocation, useNavigate, useOutletContext} from "react-router-dom"
import styled from "styled-components"
import { addContact, editContact } from "../utils/ContactService"
import { ContactPhoto, EditContact, DeleteContact, StarFillIcon, StarOutlineIcon} from './ContactStyled'
import {ContactSearchInput} from './RootList'

const Container = styled.div`
    width: 71%;
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    padding: 2% 2%;
`

const ContactContainer = styled.form`
    padding-top: 2%;
    display: flex;  
    flex-wrap: wrap;
    width:50%; 
    align-items: flex-start;
    justify-content: space-around;
    gap: 2rem;
`

const ContactInfoInputContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props=> props.favorite ? "flex-start": "space-between"};
    align-items: center;
`

const ContactLabel = styled.label`
    width: 20%;
    font-size: 16px;
    margin-right: ${props => props.favorite ? "2.75rem" : "0"};
`

const ContactInput = styled(ContactSearchInput)`
    padding-left: 5px;
    width: ${props=> props.full ? "70%": "30%"};
    height: 35px;
`

const ContactViewAndActionContainer = styled.div`
    display: flex;   
    width : 30%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
`

const ContactActionsContainer = styled.div`
    display: flex;   
    width : 100%;
    justify-content: space-between;
    align-items: flex-end;
`
const ContactPreviewPhoto = styled(ContactPhoto)`
    max-width: 280px;
    max-height: 280px;
`

export const LinkTo = styled(Link)`
    width: 25%;
    display: flex;
    &:hover, :visited, :link, :active{
        text-decoration: none;
    }
    text-decoration: none;
`

const SaveContact = styled(EditContact)`
    width: 25%;
`

const CancelContact = styled(DeleteContact)`
    width: 100%;
`

const ContactForm = ()=>{

    const {updateContacts} = useOutletContext();
    let navigate = useNavigate()
    let { state } = useLocation();
    const [urlImageError, setUrlImageError] = useState(undefined)
    const [contactEdit, setContactEdit] = useState()

    
    const [contact, setContact] = useState({
        first_name:{
            label: "First name",
            value:"",
            isValid: true
        },
        last_name:{
            label: "Last name",
            value:"",
            isValid: true
        },
        twitter:{
            label: "Twitter",
            value:"",
            isValid: true
        },
        avatar:{
            label: "Url Avatar",
            value:"",
            isValid: true
        },
        number:{
            label: "Phone number",
            value:"",
            isValid: true
        },
        notes:{
            label: "Notes",
            value:"",
            isValid: true
        },
        favorite: {
            label: "Favorite",
            value: ""
        },
    })

    useEffect(()=>{
        const init = () =>{
            (state && !contactEdit) ? initContact(state.contactEdit) : (state === null && contactEdit) && cleanForm()
        }

        const initContact = (obj) =>{
            setContactEdit(obj)
            setUrlImageError(undefined)
            for (const key in obj) {
                console.log(obj[key])
                setContact(prevState => ({
                        ...prevState,
                        [key]: {
                            label: prevState[key].label,
                            value: obj[key]
                        }
                    }));
            }
            
        }
        
        const cleanForm = () =>{
            for (const key in contact) {
                setContact(prevState => ({
                        ...prevState,
                        [key]: {
                            label: prevState[key].label,
                            value: ""
                        }
                    }));
            }
            setContactEdit(undefined)
            imageError()
        }
        

        init()
    },[contact, state, contactEdit, urlImageError])

    const setFavorite = () =>{
        let favorite = true
        if(contact.favorite.value){
            favorite = false
        }
        setContact(prevState => ({
                        ...prevState,
                        "favorite": {
                            label: prevState["favorite"].label,
                            value: favorite
                        }
                    })); 
    }
    

    const saveContact = (e) =>{
        e.preventDefault()
        const saveContact = {
            first_name: contact.first_name.value,
            last_name: contact.last_name.value,
            twitter: contact.twitter.value,
            avatar: contact.avatar.value,
            number: contact.number.value,
            notes: contact.notes.value,
            favorite: contact.favorite.value
        }
        if(contactEdit){
            editContact(saveContact)
            
        }
        else {
            addContact(saveContact)
        }
    updateContacts()
    navigate(`/`)
    }

    const handleChange = (e) => {
            const { name, value } = e.target;
            if(name === "avatar") setUrlImageError(undefined)
            console.log(value)
            setContact(prevState => ({
                ...prevState,
                [name]: {
                    label: prevState[name].label,
                    value: value
                }
            }));
    };
    
    const imageError = (e) =>{
        setUrlImageError("https://upload.wikimedia.org/wikipedia/commons/f/f7/Facebook_default_male_avatar.gif")
    }

    return(
        <>
        <Container>
            <ContactContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{"Name"}</ContactLabel>
                    <ContactInput 
                    type="text" 
                    onChange={handleChange} 
                    name={"first_name"} 
                    placeholder={contact.first_name.label} 
                    defaultValue={contact.first_name.value}
                    validation={contact.first_name.isValid}
                    />
                    <ContactInput 
                    type="text" 
                    onChange={handleChange} 
                    name={"last_name"} 
                    placeholder={contact.last_name.label} 
                    defaultValue={contact.last_name.value}
                    validation={contact.last_name.isValid}
                    />
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.twitter.label}</ContactLabel>
                    <ContactInput full 
                    type="text" 
                    onChange={handleChange} 
                    name={"twitter"} 
                    placeholder={"@"} 
                    defaultValue={contact.twitter.value}
                    validation={contact.twitter.isValid}
                    />
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.number.label}</ContactLabel>
                    <ContactInput full 
                    type="text"
                    onChange={handleChange}  
                    name={"number"} 
                    placeholder={"+55 (11) 999999999"} 
                    defaultValue={contact.number.value}
                    validation={contact.number.isValid}
                    />
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.notes.label}</ContactLabel>
                    <ContactInput full 
                    type="text" 
                    onChange={handleChange} 
                    name={"notes"} 
                    placeholder={"Some note"} 
                    defaultValue={contact.notes.value}
                    validation={contact.notes.isValid}
                    />
                    
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.avatar.label}</ContactLabel>
                    <ContactInput full 
                    type="text" 
                    onChange={handleChange} 
                    name={"avatar"} 
                    placeholder={"http://url-to-avatar-photo.jpg"} 
                    defaultValue={contact.avatar.value}
                    validation={contact.avatar.isValid}
                    />
                    
                </ContactInfoInputContainer>
                <ContactInfoInputContainer favorite>
                    <ContactLabel favorite>{contact.favorite.label}</ContactLabel>
                    {
                        contact.favorite.value 
                        ? 
                        <StarFillIcon onClick={setFavorite}/> 
                        : 
                        <StarOutlineIcon onClick={setFavorite}/>
                    }
                </ContactInfoInputContainer>
            </ContactContainer>
            <ContactViewAndActionContainer>
                <ContactPreviewPhoto src={urlImageError ? urlImageError : contact.avatar.value} onError={imageError}/>
                <ContactActionsContainer>
                    <SaveContact type="submit" value="Save" onClick={saveContact}/>
                    <LinkTo button="true" to={`/`}>
                        <CancelContact type="submit" value="Cancel"  />
                    </LinkTo>
                </ContactActionsContainer>
            </ContactViewAndActionContainer>
        </Container>
        </>
    )
}

export default ContactForm