import { FC } from "react";
import { Ticktes } from "../Ticktes";
import styles from "./Technician.module.css";

export const Technician: FC = () => {
  return (
    <nav className={styles["nav"]}>
      <a className={styles["nav-link"]} href="/ticketsPage">
        Tickets
      </a>
      <a className={styles["nav-link"]}>My Tickets</a>
      <a className={styles["nav-link"]} href="/ticketsPage">
        Service Tickets
      </a>
      <a className={styles["nav-link"]}>My Service Tickets</a>
    </nav>
  );
};
