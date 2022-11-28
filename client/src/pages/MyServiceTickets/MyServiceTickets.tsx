import {Button, Checkbox, Modal, TextField} from "@mui/material";
import { useState } from "react";
import styles from "./myservicetickets.module.css";

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
            <nav className={styles["nav"]}>
                <a className={styles["nav-link"]} href="/profile">
                Profile
                </a>
            <div>{">"}</div>
                <a className={styles["nav-link"]} href="/ticketsPage">
                Tickets
                </a>
            </nav>
            <div className={styles["flex-wrapper"]}>
                {myTickets.map(c => {
                    return(
                        <div>
                            <div>{c.id}</div>
                            <div> <TextField onBlur={() => handlePriceChange(c)} value={c.price} /></div>
                            <div> <TextField onBlur={() => handleTimeChange(c)} value={c.time} /> </div>
                            <div><Checkbox checked={c.status} onChange={() => handleCheckbox(c)} /></div>
                            <div> <Button onClick={() => handleOpenModal(c)}>Comment</Button></div>
                        </div>
                    )
                })}
            </div>
            <Modal open={openModal} onClose={() => {handleModalClose()}} >
                <TextField onChange={()=> {handleCommentChange()}} value={ticketData.comment}/>
            </Modal>
        </div>
    )
}