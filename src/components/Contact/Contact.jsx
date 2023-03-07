import styled from 'styled-components'
import React, { useState } from 'react';
import { AiOutlineStar, AiFillStar, AiOutlineTwitter} from 'react-icons/ai';
import { Link } from "react-router-dom";


const Container = styled.div`
    padding: 2% 2%;
    width: 75%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
`

const ContactContainer = styled.div`
    display: flex;  
    width:60%; 
    align-items: flex-start;
    justify-content: space-around;
`

const ContactPhotoContainer = styled.div`
    display: flex;   
    width : 30%;
    padding: 2% 2%;
`

const ContactPhoto = styled.img`
    display: flex;   
    width: 100%;
    border-radius: 15px;
`

const ContactInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    width : 46%;
    padding: 2% 2%;
    gap: 14px;
`
const ContactInfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
`

const ContactInfo= styled.p`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    /* margin-bottom: 1rem; */
    margin-right: 5px;
    display: inline-block;
`

const ContactName= styled(ContactInfo)`
    font-size: 22px;
    font-weight: bold;
`
const ContactTwitter = styled(ContactInfo)`
    color:#3a62f5;
    font-size: 18px;
`

const TwitterIcon = styled(AiOutlineTwitter)`
    color:#3a62f5;
    font-size: 20px;
`

const StarFillIcon = styled(AiFillStar)`
    color: #eabc4c;
    font-size: 20px;
    cursor:pointer;
`

const StarOutlineIcon = styled(AiOutlineStar)`
    fill:#eabc4c;
    font-size: 20px;
    cursor:pointer;
`

const ButtonsActionContainer = styled.div`
    display: flex;
    width: 80%;
    input:first-child {
        margin-right: 1rem;
    }
`

const EditContact = styled.input`
    width: 25%;
    font-weight: bold;
    background-color: #FFFFFF;
    color: #3a62f5;
    border: none;
    height: 35px;
    text-align: center;
    border-radius: 5px;
    padding: 5px 5px;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    cursor:pointer;
`

const DeleteContact = styled(EditContact)`
    color: #aa5d65;
`

export const Contact = ()=>{
    // eslint-disable-next-line
    const [contact, setContact] = useState({
        first: "João",
        last: "Paulo",
        avatar: "https://pbs.twimg.com/profile_images/1554476698200117248/SOTfLA2D_400x400.jpg",
        twitter: "jjpRoot",
        number: "(11) 98909-1160",
        notes: "The best ever live",
        favorite: true,
    })

    return (
        <Container >
            <ContactContainer>
                <ContactPhotoContainer>
                    <ContactPhoto src={contact.avatar}/>
                </ContactPhotoContainer>
                <ContactInfosContainer>
                    <ContactInfoContainer>
                        <ContactName>{contact.first} {contact.last}</ContactName>
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
                        <EditContact type="submit" value="Edit"/>
                        <DeleteContact  type="submit" value="Delete"/>
                    </ButtonsActionContainer>
                </ContactInfosContainer>
            </ContactContainer>
        </Container>
    );

}