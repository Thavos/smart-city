import { MenuBar } from "../../components/MenuBar";
import { Box, Button, Checkbox, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./ServiceTicket.module.css"


export const ServiceTicket = () => {
    const [showModal, setShowModal] = useState(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    let technicians: any[] = [];
    useEffect(() => {
        fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `query technicians {
                        technicians {
                            id
                        user{
                            id
                            name
                            surn
                            email
                            authId
                        }
                    }
                }`,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                technicians = data.data.technicians;
                console.log(technicians);
            });
    }, []);

    function handleShowModal() {
        setShowModal(true);
    }

    function handleNewServiceticket(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        NewServiceTicket(event.target.name, event.target.description.value, event.target.technician.value);
    }

    function handleCheckbox(ticket: any) {
        console.log("Fetch na update stavu ticketu");
        console.log(ticket);
    }


    let tickets: any[] = [];
    console.log("Fetch na získání všech service ticketů s infem o jejich id, email technika co ho spravuje, estimated price a time a status");
    //fetch
    return (
        <div className={styles["wrapper"]}>
            <nav className={styles["nav"]}>
                <a className={styles["nav-link"]} href="/profile">
                    Profile
                </a>
                <div>{">"}</div>
                <a className={styles["nav-link"]} href="/ticketsPage">
                    Tickets
                </a>
            </nav>
            <Button onClick={handleShowModal}>Create new service ticket</Button>
            <div style={{ color: "white" }}>
                <table>
                    {tickets &&
                        tickets.map(item => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.price}</td>
                                    <td>{item.time}</td>
                                    <td><Checkbox checked={item.status} onChange={() => handleCheckbox(item)} /></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box sx={style}>
                    <form onSubmit={handleNewServiceticket}>
                        <h2>Create new service ticket</h2>
                        <input name="name" type="text" className="form-control" placeholder="Name" defaultValue="" />
                        <input name="description" type="text" className="form-control" placeholder="Description" defaultValue="" />
                        <p />
                        <select id="technician">
                            {technicians.map((item) => {
                                return (
                                    <option value={item.email}>{item.email}</option>
                                )
                            })}
                        </select>
                        <p />
                        <Button type="submit">Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );

}

function NewServiceTicket(name: String, desc: String, tech: String) {
    console.log("Fetch na vytvoření novýho service ticketu s descriptionem desc a zadaným technikem tech");
    console.log(name);
    console.log(desc);
    console.log(tech);
    //fetch
}