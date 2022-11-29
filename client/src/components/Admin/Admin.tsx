import { FC } from "react";
import styles from "./Admin.module.css";
import classnames from "classnames";

export const Admin: FC = () => {
  return (
    <>
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
        <a className={styles["nav-link"]} href="/manageusers">
          Manage Users
        </a>
      </nav>
    </>
  );
};
