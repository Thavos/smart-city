import { FC } from "react";
import {Button} from "@mui/material";

export const Manager: FC = () => {
    const tickets = [];
    console.log("fetch na získání všech service ticketů do arraye tickets");
    //fetch
    return (
        <>
            <Button href="/serviceticket">Service tickets</Button>
            <Button href="/managetechnicians">Manage technicians</Button>
        </>
    );
};
