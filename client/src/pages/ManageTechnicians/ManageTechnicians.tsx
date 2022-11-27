import { FC, useEffect, useState } from "react";
import ManageUsersTable from "../../components/ManageUsersTable/ManageUsersTable";
import { MenuBar } from "../../components/MenuBar";

export const ManageTechnicians: FC = () => {
  return (
    <div>
      <MenuBar name="" surn="" />
      <ManageUsersTable />
    </div>
  );
};
