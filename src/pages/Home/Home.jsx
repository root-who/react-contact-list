import { Outlet } from "react-router-dom"
import { RootList } from "../../components/RootList/RootList"
import styled from "styled-components"
import { getContacts } from "../../utils/ContactService";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
`

export function loader() {
    const contacts = getContacts();
    return { contacts };
}

export const Home = ()=>{


    return(
        <>
            <Container>
                <RootList/>
                <Outlet/>
            </Container>
        </>
    )
}