import { FC } from "react";
import styles from "./Admin.module.css";
import classnames from "classnames";

export const Admin: FC = () => {
  return (
    <>
      <p>Admin menu</p>
      <a className={classnames(styles["btn"])} href="/manageusers">
        Manage Users
      </a>
      <p>Tickets</p>
      <p>Service tickets</p>
      <p>Users</p>
    </>
  );
};
