import { useLoaderData } from 'react-router-dom'
import styled from 'styled-components'


const Container = styled.div`
    width: 25%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 2% 1%;
    border-right: 1px solid #a0a0a0;
`

const ContactListContainer = styled.div`

`

const ContactAction = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 98%;
    height: 35px;

`

const ContactSearchInput = styled.input`
    width: 68%;
    background-color: #FFFFFF;
    color: #1b1b1b;
    border: none;
    height: 100%;
    border-radius: 5px;
    padding-left: 15px ;
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

const NewContact = styled.input`
    width: 18%;
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


const ContactList = styled.ol`
    
`
const ContactItem = styled.li`
    
`


export const RootList = ()=>{
    const {contacts} = useLoaderData()    
    return(
        <>
            <Container>
                <ContactAction>
                    <ContactSearchInput placeholder='🔍 Search'/>
                    <NewContact type="submit" value="New"/>
                </ContactAction>
                <ContactListContainer>
                    <ContactList>
                        {
                            contacts ? contacts.map((contact, key)=>(
                                <ContactItem key={key}>
                                    {contact.name}
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

    