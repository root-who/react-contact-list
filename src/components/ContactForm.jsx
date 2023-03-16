import React, { useEffect, useState,} from "react"
import { Link, useLocation, useNavigate, useOutletContext} from "react-router-dom"
import styled from "styled-components"
import { addContact, editContact } from "../utils/ContactService"
import { validateName, validatePhoneNumber, validateTwitter, validateTwitterByEdit } from "../utils/ValidationForm"
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
    flex-wrap: wrap;
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
    border: ${props=>props.isValid == "valid" ? "none" :  "1px red solid"};
    height: 35px;
`

const ContactInputSpan = styled.span`
    color:red;
    width:100%;
    text-align: end;
    margin-top:5px;
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
    width: 250px;
    height: 250px;
    margin: auto auto;
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
            isValid: "valid"
        },
        last_name:{
            label: "Last name",
            value:"",
            isValid: "valid"
        },
        twitter:{
            label: "Twitter",
            value:"",
            isValid: "valid"
        },
        avatar:{
            label: "Url Avatar",
            value:"",
        },
        number:{
            label: "Phone number",
            value:"",
            isValid: "valid"
        },
        notes:{
            label: "Notes",
            value:"",
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
            console.log(state.contactEdit)
            for (const key in contact) {
                setContact(prevState => ({
                        ...prevState,
                        [key]: {
                            label: prevState[key].label,
                            value: obj[key],
                            isValid:"valid"
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
                            value: "",
                            isValid:"valid"
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
                            value: favorite,
                            isValid:"valid"
                        }
                    })); 
    }
    const validate = (form) =>{
        let validFirstName = "valid"
        let validLastName = "valid"
        let validTwitter = "valid"
        let validPhoneNumber = "valid"
        if(form === "edit"){
            validFirstName = validateName(contact.first_name.value)
            validLastName = validateName(contact.last_name.value)
            validTwitter = validateTwitterByEdit(contact.twitter.value)
            validPhoneNumber = validatePhoneNumber(contact.number.value)
        }else{
            validFirstName = validateName(contact.first_name.value)
            validLastName = validateName(contact.last_name.value)
            validTwitter = validateTwitter(contact.twitter.value)
            validPhoneNumber = validatePhoneNumber(contact.number.value)
        }
        const formValid = {
            first_name:validFirstName,
            last_name:validLastName,
            twitter:validTwitter,
            number:validPhoneNumber,
        }
        for (const key in formValid) {
            setContact(prevState => ({
                            ...prevState,
                            [key]: {
                                label: prevState[key].label,
                                value: prevState[key].value,
                                isValid: formValid[key]
                            }
                        }));
        }
        return (validPhoneNumber && validLastName && validTwitter && validPhoneNumber)
    }

    const saveContact = (e) =>{
        let valid = false
        const saveContact = {
            first_name: contact.first_name.value,
            last_name: contact.last_name.value,
            twitter: contact.twitter.value,
            avatar: urlImageError ? urlImageError : contact.avatar.value,
            number: contact.number.value,
            notes: contact.notes.value,
            favorite: contact.favorite.value
        }        
        if(contactEdit){
            valid = validate("edit") 
            saveContact.id = contactEdit.id
            valid && editContact(saveContact)
        }
        else {
            valid = validate() 
            valid && addContact(saveContact)
        }
        console.log(saveContact)
        console.log(valid)

        if(valid){
            updateContacts()
            navigate(`/`)
        }

    }

    const handleChange = (e) => {
            const { name, value } = e.target;
            if(name === "avatar") setUrlImageError(undefined)
            setContact(prevState => ({
                ...prevState,
                [name]: {
                    label: prevState[name].label,
                    value: value,
                    isValid: "valid"
                }
            }));
    };
    
    const imageError = (e) =>{
        setUrlImageError("https://upload.wikimedia.org/wikipedia/commons/f/f7/Facebook_default_male_avatar.gif")
    }

    return(
        <>
        <Container>
            <ContactContainer >
                <ContactInfoInputContainer>
                    <ContactLabel>{"Name"}</ContactLabel>
                    <ContactInput 
                    required
                    type="text" 
                    onChange={handleChange} 
                    name={"first_name"} 
                    placeholder={contact.first_name.label} 
                    defaultValue={contact.first_name.value}
                    isValid={contact.first_name.isValid}
                    />
                    <ContactInput 
                    required
                    type="text" 
                    onChange={handleChange} 
                    name={"last_name"} 
                    placeholder={contact.last_name.label} 
                    defaultValue={contact.last_name.value}
                    isValid={contact.last_name.isValid}
                    />
                    {(!contact.last_name.isValid || !contact.first_name.isValid) && <ContactInputSpan>Name can't be empty</ContactInputSpan>}
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.twitter.label}</ContactLabel>
                    <ContactInput full 
                    required
                    type="text" 
                    onChange={handleChange} 
                    name={"twitter"} 
                    placeholder={"@"} 
                    defaultValue={contact.twitter.value}
                    isValid={contact.twitter.isValid}
                    />
                    {!contact.twitter.isValid && <ContactInputSpan>Twitter can't be empty</ContactInputSpan>}
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.number.label}</ContactLabel>
                    <ContactInput full 
                    required
                    type="text"
                    onChange={handleChange}  
                    name={"number"} 
                    placeholder={"(11)99999-9999"} 
                    defaultValue={contact.number.value}
                    isValid={contact.number.isValid}
                    />
                    {!contact.number.isValid && <ContactInputSpan>Number can't be empty and need follow the pattern (xx)xxxxx-xxxx</ContactInputSpan>}
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.notes.label}</ContactLabel>
                    <ContactInput full 
                    required
                    type="text" 
                    onChange={handleChange} 
                    name={"notes"} 
                    placeholder={"Some note"} 
                    defaultValue={contact.notes.value}
                    isValid="valid"
                    />
                    
                    
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.avatar.label}</ContactLabel>
                    <ContactInput full 
                    required
                    type="text" 
                    onChange={handleChange} 
                    name={"avatar"} 
                    placeholder={"http://url-to-avatar-photo.jpg"} 
                    defaultValue={contact.avatar.value}
                    isValid="valid"
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