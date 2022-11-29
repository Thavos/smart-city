import { FC } from "react";
import { Button } from "@mui/material";
import styles from "./Manager.module.css";

export const Manager: FC = () => {
  return (
    <nav className={styles["nav"]}>
      <a className={styles["nav-link"]} href="/ticketsPage">
        Tickets
      </a>
      <a className={styles["nav-link"]} href="/mytickets">
        My Tickets
      </a>
      <a className={styles["nav-link"]} href="/serviceticket">
        Service Tickets
      </a>
      <a className={styles["nav-link"]} href="/managetechnicians">
        Manage Technicians
      </a>
    </nav>
  );
};
