import {Button, Checkbox, Modal, TextField} from "@mui/material";
import { useState } from "react";

type ticket = {
    id: string
    comment:string
    status: boolean
    price:string
    time: string
}

export default function MyServiceTickets (){
    const myTickets: ticket[] = [];
    console.log("Fetch na získání všech ticketů právě lognutýho techniciana do proměnné myTickets");
    //fetch

    function handleCheckbox(c: ticket){
        console.log("Fetch na změnu stavu service ticketu podle ticketu");
        //fetch
    }

    function handleTimeChange(c:ticket){
        console.log("Fetch na změnu estimated času na service ticketu");
        //fetch
    }

    function handlePriceChange(c:ticket){
        console.log("Fetch na změnu estimated ceny na service ticketu");
        //fetch
    }

    function handleModalClose(){
        if(changed){
            console.log("Fetch na update komentáře k ticketu, který je uložen v proměnné ticketData");
            //fetch
        }
        setChanged(false);
        setOpenModal(false);
    }

    function handleOpenModal(ticket:ticket){
        setTicketData(ticket);
        setOpenModal(true);
    }
    function handleCommentChange(){
        setChanged(true);
    }

    const [changed, setChanged] = useState(false);
    const randticket:ticket = {id:"", time:"", price: "", comment:"", status:false};
    const [openModal, setOpenModal] = useState(false);
    const [ticketData, setTicketData] = useState(randticket);


    return(
        <div>
            <table>
                <tr>
                    <td>Id</td>
                    <td>Price</td>
                    <td>Time</td>
                    <td>Status</td>
                    <td>Action</td>
                </tr>
                {myTickets.map(c => {
                    return(
                        <tr>
                            <td>{c.id}</td>
                            <td> <TextField onBlur={() => handlePriceChange(c)} value={c.price} /></td>
                            <td> <TextField onBlur={() => handleTimeChange(c)} value={c.time} /> </td>
                            <td><Checkbox checked={c.status} onChange={() => handleCheckbox(c)} /></td>
                            <td> <Button onClick={() => handleOpenModal(c)}>Comment</Button></td>
                        </tr>
                    )
                })}
            </table>
            <Modal open={openModal} onClose={() => {handleModalClose()}} >
                <TextField onChange={()=> {handleCommentChange()}} value={ticketData.comment}/>
            </Modal>
        </div>
    )
}