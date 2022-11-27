import {FC, useEffect, useState} from "react";
import {MenuBar} from "../../components/MenuBar";
import ManageUsersTable from "../../components/ManageUsers/ManageUsers";

export const ManageUsers: FC = () => {



    return(
        <div>
            <MenuBar name="" surn=""/>
            <ManageUsersTable />
        </div>
    )
}