import { FC, useEffect, useState } from "react";
import ManageTechniciansTable from "../../components/ManageTechniciansTable/ManageTechniciansTable";
import { MenuBar } from "../../components/MenuBar";
import styles from "./ManageTechnicians.module.css";

export const ManageTechnicians: FC = () => {
  return (
    <div>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/managetechnicians">
          Technicians
        </a>
      </nav>
      <ManageTechniciansTable />
    </div>
  );
};
