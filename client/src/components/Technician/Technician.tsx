import { FC } from "react";
import { Ticktes } from "../Ticktes";
import styles from "./Technician.module.css";

export const Technician: FC = () => {
  return (
    <nav className={styles["nav"]}>
      <a className={styles["nav-link"]} href="/ticketsPage">
        Tickets
      </a>
      <a className={styles["nav-link"]} href="/mytickets">
        My Tickets
      </a>
      <a className={styles["nav-link"]} href="/myservicetickets">
        My Service Tickets
      </a>
    </nav>
  );
};
