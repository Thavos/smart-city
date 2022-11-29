import { FC, useEffect, useState } from "react";
import ManageUsersTable from "../../components/ManageUsersTable/ManageUsersTable";
import { MenuBar } from "../../components/MenuBar";
import styles from "./ManageUser.module.css";

export const ManageUsers: FC = () => {
  return (
    <div>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/manageusers">
          Users
        </a>
      </nav>
      <ManageUsersTable />
    </div>
  );
};
