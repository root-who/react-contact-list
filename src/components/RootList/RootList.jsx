import styled from 'styled-components'
// import { addContact, getContacts } from '../../utils/ContactService'
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 25%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 2% 0;
    border-right: 1px solid #c7c7c7;
`

const ContactAction = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 98%;
    height: 35px;

`

export const ContactSearchInput = styled.input`
    width: 68%;
    background-color: #FFFFFF;
    color: #1b1b1b;
    border: none;
    height: 100%;
    border-radius: 5px;
    padding-left: 15px;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    :focus {
        outline: none;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #a0a0a0;
        opacity: 1; /* Firefox */
        font-size: 14px;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #a0a0a0;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #a0a0a0;
    }
    :focus::-webkit-input-placeholder { color:transparent; }
    :focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
    :focus::-moz-placeholder { color:transparent; } /* FF 19+ */
    :focus:-ms-input-placeholder { color:transparent; } /* Internet Explorer 10-11 */
`

const LinkTo = styled(Link)`
    width: ${props=>props.button ? "18%" : "100%"};
    height: 100%;
    display: flex;
    &:hover, :visited, :link, :active{
        text-decoration: none;
    }
    text-decoration: none;
`

const NewContact = styled.input`
    width: 100%;
    background-color: #FFFFFF;
    color: #3a62f5;
    border: none;
    height: 100%;
    border-radius: 5px;
    padding: 1px 2px;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    cursor:pointer;
    font-weight: 500;
`

const ContactListContainer = styled.div`
    margin-top: 2rem;
    width:100%;
    display: flex;
`

const ContactList = styled.ol`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ContactItem = styled.li`
    cursor: pointer;
    width: calc(100%);
    height: 30px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding-top: 15px;
    border-bottom: 1px solid #3a62f5;
    &:hover{
        p, a{
            background-color: #3a62f5;
            color: white;
        }
        background-color: #3a62f5;
    }
`
const ContactName = styled.p`
    color: #000000;
    font-size: 16px;
    font-weight: bold;
    padding-left: 20px;
    margin-bottom: 5px;
`


export const RootList = ({contacts})=>{
    return(
        <>
            <Container>
                <ContactAction>
                    <ContactSearchInput placeholder='🔍 Search'/>
                    <LinkTo button to={"/newContact"}>
                        <NewContact type="submit" value="New" />
                    </LinkTo>
                </ContactAction>
                <ContactListContainer>
                    <ContactList>
                        {
                            contacts ? contacts.map((contact, key)=>(
                                <ContactItem key={key}>
                                    <LinkTo to={`/contacts/${contact.twitter}`}>
                                        <ContactName>{contact.first_name} {contact.last_name}</ContactName>
                                    </LinkTo>
                                </ContactItem>
                            ))
                            :
                            <></>
                        }
                    </ContactList>
                </ContactListContainer>
            </Container>

        </>
    )
}

    