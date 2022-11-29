import { FC } from "react";
import styles from "./Home.module.css";
import classnames from "classnames";
import { Ticktes } from "../../components/Ticktes";

export const Home: FC = () => {
  return (
    <>
      <div className={styles["menu-bar"]}>
        <div className={styles["label"]}>Smart City Brno</div>
        <nav className={styles["nav"]}>
          <a className={styles["btn"]} href="/login">
            Sign in
          </a>
          <a
            className={classnames(styles["btn"], styles["border-only"])}
            href="/register"
          >
            Sign up
          </a>
        </nav>
      </div>

      <div className={styles["feed"]}>
        <h1>Tickets feed</h1>
      </div>
      <Ticktes hideNewTicket={true} />
    </>
  );
};
