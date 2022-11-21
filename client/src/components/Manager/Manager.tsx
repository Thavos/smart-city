import { FC } from "react";
import { User } from "../User";
import styles from "./Manager.module.css";

export const Manager: FC = () => {
  return (
    <>
      <p>Manager menu</p>
      <User />
      <p>My service tickets</p>
    </>
  );
};
