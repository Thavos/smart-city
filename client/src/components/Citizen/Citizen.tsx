import { FC } from "react";
import styles from "./Citizen.module.css";
import { Admin } from "../Admin";
import classnames from "classnames";

export const Citizen: FC = () => {
  return (
    <nav className={styles["nav"]}>
      <a className={styles["nav-link"]} href="/ticketsPage">
        Tickets
      </a>
      <a className={styles["nav-link"]}>My Tickets</a>
    </nav>
  );
};
