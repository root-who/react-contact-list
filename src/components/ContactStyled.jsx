import styled from 'styled-components'
import { AiOutlineStar, AiFillStar, AiOutlineTwitter} from 'react-icons/ai';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from "react-router-dom";

export const Container = styled.div`
    position: relative;
    padding: 2% 0;
    width: ${props=>props.list ? "100%": "62%"};
    border-bottom: ${props=>props.list ? "1px solid #c7c7c7": "none"};
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    margin: 0 6%;
`

export const ArrowBack = styled(BsFillArrowLeftSquareFill)`
    font-size: 30px;
    fill: #3a62f5;
    margin: 0 2rem;
`

export const ContactContainer = styled.div`
    /* flex-grow: ${props=>props.list ? "0": "1"}; */
    display: flex;  
    width: ${props=>props.list ? "45%": "60%"};
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;

`

export const ContactPhotoContainer = styled.div`
    display: flex;   
    width : ${props=>props.list ? "45%": "51%"};
    padding: 2% 2%;
`

export const ContactPhoto = styled.img`
    display: flex;   
    width: 100%;
    border-radius: 15px;
    height: ${props=>props.list ? "174px": "247px"}
`

export const ContactInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width : 41%;
    padding: 2% 2%;
    gap: 14px;
`
export const ContactInfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    a{
        width:100%;
    }
`

export const ContactInfo= styled.p`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    /* margin-bottom: 1rem; */
    margin-right: 5px;
    display: inline-block;
`

export const ContactName= styled(ContactInfo)`
    font-size: 22px;
    /* width: 50%; */
    font-weight: bold;
`
export const ContactTwitter = styled(ContactInfo)`
    color:#3a62f5;
    font-size: 18px;
`

export const TwitterIcon = styled(AiOutlineTwitter)`
    color:#3a62f5;
    font-size: 20px;
`

export const StarFillIcon = styled(AiFillStar)`
    color: #eabc4c;
    font-size: 20px;
    cursor:pointer;
`

export const StarOutlineIcon = styled(AiOutlineStar)`
    fill:#eabc4c;
    font-size: 20px;
    cursor:pointer;
`

export const ButtonsActionContainer = styled.div`
    display: flex;
    width: 100%;
    a{
        margin-right: 1rem;
    }
`

export const LinkTo = styled(Link)`
    width: 25%;
    display: flex;
    text-decoration: none;
    height: auto;
`

export const EditContact = styled.input`
    width:100%;
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

export const DeleteContact = styled(EditContact)`
    width: 25%;
    color: #aa5d65;
`