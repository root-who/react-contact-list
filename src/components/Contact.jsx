import React from 'react';
import { LinkTo, ContactContainer, ContactInfoContainer, ContactInfosContainer, ContactName, ContactPhoto, ContactPhotoContainer, Container, EditContact, StarFillIcon, StarOutlineIcon } from './ContactStyled';
import styled from 'styled-components'


const LinkInfo = styled(LinkTo)`
    width: 50%;
    align-self: flex-end;
`

const Contact = ({contact})=>{


    return (
    <>
        {
            contact && 
            <Container list={true}>
                <ContactContainer list={true}>
                    <ContactPhotoContainer list={true}>
                        <ContactPhoto list={true} src={contact.avatar}/>
                    </ContactPhotoContainer>
                    <ContactInfosContainer>
                        <ContactInfoContainer>
                            <ContactName>{contact.first_name} {contact.last_name}</ContactName>
                            {contact.favorite ? <StarFillIcon/> : <StarOutlineIcon/>}
                        </ContactInfoContainer>
                        <LinkInfo to={`/contacts/${contact.twitter}`} state={{contact: contact}}>
                            <EditContact type="submit" value="Info"/>
                        </LinkInfo>
                    </ContactInfosContainer>
                </ContactContainer>
            </Container>
        }
    </>
    );
}

export default Contact