import React, {  useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { deleteContact as deleteContactService } from '../utils/ContactService';
import { useOutletContext } from "react-router-dom";
import {  LinkTo,ButtonsActionContainer, ContactContainer, ContactInfo, ContactInfoContainer, ContactInfosContainer, ContactName, ContactPhoto, ContactPhotoContainer, ContactTwitter, Container, DeleteContact, EditContact, StarFillIcon, StarOutlineIcon, TwitterIcon, ArrowBack } from './ContactStyled';



const ContactDatails = ({contact_size, contact_from_list})=>{
    const {updateContacts} = useOutletContext();
    let { state } = useLocation();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [contact, setContact] = useState()


    useEffect(()=>{

        const initContact = (obj) =>{
            setContact(obj)
        }   

        const init = () =>{
            (state === null && !contact && !contact_from_list) ?  navigate("/") :
            state === null && !contact ? initContact(contact_from_list) : initContact(state.contact) 
        }

        init()
    },[state])


    const deleteContact = (contact) => {
        deleteContactService(contact.twitter)
        updateContacts()
        navigate("/")
    }
     

    return (
    <>
        {
            contact && 
            <Container list={false}>
                <Link to={`/`}>
                    <ArrowBack/>
                </Link>
                <ContactContainer list={false}>
                    <ContactPhotoContainer>
                        <ContactPhoto list={false} src={contact.avatar}/>
                    </ContactPhotoContainer>
                    <ContactInfosContainer>
                        <ContactInfoContainer>
                            <ContactName>{contact.first_name} {contact.last_name}</ContactName>
                            {contact.favorite ? <StarFillIcon/> : <StarOutlineIcon/>}
                        </ContactInfoContainer>
                        <ContactInfoContainer>
                            <Link to={`https://twitter.com/${contact.twitter}`}>
                                <ContactTwitter>{contact.twitter}</ContactTwitter>
                                <TwitterIcon/>
                            </Link>
                        </ContactInfoContainer>
                        <ContactInfo>{contact.number}</ContactInfo>
                        <ContactInfo>{contact.notes}</ContactInfo>
                        <ButtonsActionContainer>
                            <LinkTo button to={`/editContact/${contact.twitter}`} state={{"contactEdit" : contact}}>
                                <EditContact type="submit" value="Edit"/>
                            </LinkTo>
                            <DeleteContact  type="submit" value="Delete"onClick={(event)=>{
                                event.preventDefault()
                                deleteContact(contact)       
                            }}/>
                        </ButtonsActionContainer>
                    </ContactInfosContainer>
                </ContactContainer>
            </Container>
        }
    </>
    );
}

export default ContactDatails