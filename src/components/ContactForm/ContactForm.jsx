import { useEffect, useState } from "react"
import styled from "styled-components"
import {ContactPhotoContainer, ContactPhoto} from '../Contact/Contact'
import {ContactSearchInput} from '../RootList/RootList'

const Container = styled.div`
    width: 75%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    padding: 2% 2%;
`

const ContactFormContainer = styled.form`
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
    justify-content: space-between;
    align-items: center;
`

const ContactLabel = styled.label`
    width: 20%;
    font-size: 16px;
`

const ContactInput = styled(ContactSearchInput)`
    padding-left: 5px;
    width: ${props=> props.full ? "70%": "30%"};
    height: 35px;
`


export const ContactForm = ()=>{

    const [urlImageError, setUrlImageError] = useState(undefined)
    const [contact, setContact] = useState({
        first_name:{
            label: "First name",
            value:""
        },
        last_name:{
            label: "Last name",
            value:""
        },
        twitter:{
            label: "Twitter",
            value:""
        },
        avatar:{
            label: "Url Avatar",
            value:""
        },
        number:{
            label: "Phone number",
            value:""
        },
        notes:{
            label: "Notes",
            value:""
        },
        favorite: {
            label: "Favorite",
            value:""
        },
    })

    useEffect(()=>{
    },[contact])

    const handleChange = (e) => {
            const { name, value } = e.target;
            let label = name
            label = contact[label].label
            if(name === "avatar") setUrlImageError(undefined)
            setContact(prevState => ({
                ...prevState,
                [name]: {
                    label: label,
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
            <ContactFormContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{"Name"}</ContactLabel>
                    <ContactInput 
                    type="text" 
                    onChange={handleChange} 
                    name={"first_name"} 
                    placeholder={contact.first_name.label} 
                    defaultValue={contact.first_name.value}/>
                    <ContactInput 
                    type="text" 
                    onChange={handleChange} 
                    name={"last_name"} 
                    placeholder={contact.last_name.label} 
                    defaultValue={contact.last_name.value}/>
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.twitter.label}</ContactLabel>
                    <ContactInput full 
                    type="text" 
                    onChange={handleChange} 
                    name={"twitter"} 
                    placeholder={"@"} 
                    defaultValue={contact.twitter.value}/>
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.number.label}</ContactLabel>
                    <ContactInput full 
                    type="text"
                    onChange={handleChange}  
                    name={"number"} 
                    placeholder={"+55 (11) 999999999"} 
                    defaultValue={contact.number.value}/>
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.notes.label}</ContactLabel>
                    <ContactInput full 
                    type="text" 
                    onChange={handleChange} 
                    name={"notes"} 
                    placeholder={"Some note"} 
                    defaultValue={contact.notes.value}/>
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.avatar.label}</ContactLabel>
                    <ContactInput full 
                    type="text" 
                    onChange={handleChange} 
                    name={"avatar"} 
                    placeholder={"http://url-to-avatar-photo.jpg"} 
                    defaultValue={contact.avatar.value}/>
                </ContactInfoInputContainer>
                <ContactInfoInputContainer>
                    <ContactLabel>{contact.favorite.label}</ContactLabel>
                    <ContactInput full placeholder={contact.favorite.label} defaultValue={contact.favorite.value}/>
                </ContactInfoInputContainer>
            </ContactFormContainer>
            <ContactPhotoContainer>
                <ContactPhoto src={urlImageError ? urlImageError : contact.avatar.value} onError={imageError}/>
            </ContactPhotoContainer>
        </Container>
        </>
    )
}