import { FC } from "react";
import styles from "./Citizen.module.css";
import {Admin} from "../Admin";
import classnames from "classnames";

export const Citizen: FC = () => {
  return (
      <>
        <div className="tex">
          Citizen site
        </div>
        <a className={classnames(styles["btn"])} href="/ManageUsers">
          Manage Users
        </a>
      </>
  );
};
