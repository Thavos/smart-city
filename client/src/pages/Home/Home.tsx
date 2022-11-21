import { FC } from "react";
import styles from "./Home.module.css";
import classnames from "classnames";

export const Home: FC = () => {
  return (
    <div className={styles["container"]}>
      <h1 className={styles["label"]}>Brno</h1>
      <a className={styles["btn"]} href="/login">
        Sign in
      </a>
      <a
        className={classnames(styles["btn"], styles["border-only"])}
        href="/register"
      >
        Sign up
      </a>
    </div>
  );
};
