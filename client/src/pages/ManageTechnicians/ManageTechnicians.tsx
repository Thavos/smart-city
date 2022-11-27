import {FC, useEffect, useState} from "react";
import {MenuBar} from "../../components/MenuBar";
import {ManageTechniciansTable} from "../../components/ManageUsers/ManageUsers";

export const ManageTechnicians: FC = () => {



    return(
        <div>
            <MenuBar name="" surn=""/>
            <ManageTechniciansTable />
        </div>
    )
}