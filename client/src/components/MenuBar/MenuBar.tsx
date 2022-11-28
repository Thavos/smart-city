import { FC } from "react";
import styles from "./MenuBar.module.css";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  surn: string;
  role?: string;
}

export const MenuBar: FC<Props> = ({ name, surn, role }) => {
  const navigate = useNavigate();

  const logout = async () => {
    console.log("here");

    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(() => navigate("/"));
  };

  return (
    <div className={styles["menu-bar"]}>
      <div className={styles["user"]}>
        {name} {surn} {role && <>-</>} {role}
      </div>
      <nav className={styles["nav"]}>
        <a className={classnames(styles["btn"])} href="/profile">
          Home
        </a>
        {/*TODO this may result in harming fetch post, need testing*/}
        <a
          className={classnames(styles["btn"], styles["logout"])}
          onClick={logout}
          href="/"
        >
          Logout
        </a>
      </nav>
    </div>
  );
};
