import { FC, useEffect, useState } from "react";
import ManageTechniciansTable from "../../components/ManageTechniciansTable/ManageTechniciansTable";
import { MenuBar } from "../../components/MenuBar";

export const ManageTechnicians: FC = () => {
  return (
    <div>
      <MenuBar name="" surn="" />
      <ManageTechniciansTable />
    </div>
  );
};
