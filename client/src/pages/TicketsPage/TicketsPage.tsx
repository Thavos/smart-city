import { FC } from "react";
import { NewTicket } from "../../components/NewTicket";
import { Ticktes } from "../../components/Ticktes";
import styles from "./TicketsPage.module.css";

export const TicketsPage: FC = () => {
  return (
    <>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/ticketsPage">
          Tickets
        </a>
      </nav>
      <Ticktes />
    </>
  );
};
