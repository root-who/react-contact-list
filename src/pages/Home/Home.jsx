import { Outlet } from "react-router-dom"
import { RootList } from "../../components/RootList"
import styled from "styled-components"
import { getContacts } from "../../utils/ContactService";
import React, { useEffect, useState } from 'react'
import useDebounce from "../../hooks/use-debounce";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
`


export const Home = ()=>{

    const [contacts, setContacts] = useState(getContacts())
    const [searchValue, setSearchValue] = useState("")
    const deb = useDebounce(searchValue, 300)
    
    const updateContacts = () => {
        setContacts(sortList(getContacts()))
    }

    useEffect(()=>{
    
    },[contacts])

    const concatNames = (first_name, last_name) =>{
        return String(first_name).concat(" ", last_name).toLowerCase()
    }

    const sortList = (list) =>{
        list.sort((current, next)=>{
            if(concatNames(current.first_name, current.last_name)> concatNames(next.first_name, next.last_name)){
                return 1
            }
            if(concatNames(current.first_name, current.last_name) < concatNames(next.first_name, next.last_name) ){
                return -1
            }
            return 0
        })
        return list
    }

    function searchList (){
        if(searchValue !== "" && contacts){
            return sortList(contacts)
                    .filter(contact => concatNames(contact.first_name, contact.last_name).toLocaleLowerCase().includes(String(deb).toLowerCase()))
        }else if(contacts){
            return sortList(contacts)
        }
    }



    return(
        <>
            <Container>
                <RootList contacts={searchList()} searchValue={searchValue} setSearchValue={setSearchValue}/>
                <Outlet context={{
                    searchList,
                    updateContacts
                    
                }}/>
            </Container>
        </>
    )
}