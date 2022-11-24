import { FC } from "react";
import styles from "./Home.module.css";
import classnames from "classnames";

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
        This city is smart, trust me. Just... just trust me OK?.. Idk anymore...
      </div>
    </>
  );
};
