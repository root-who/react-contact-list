import React, { lazy } from "react";
import {  useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
const Contact = lazy(async () => (await import('./Contact')))

const ListContainer = styled.div`
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
    margin-top: 2rem;
`
const Title = styled.h1`
    width:100%;
    margin: 2rem 0 2rem 2rem;
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
`


const ContactList = () => {
    const {searchList} = useOutletContext();

    return ( 
        <>
        <ListContainer>
        <Title>Contact List Preview</Title>
        {
            searchList() && searchList().map((value, key)=>(
                <Contact contact={value} key={key}/>
            ))

        }
        </ListContainer>
        </>
    );
}
 
export default ContactList;