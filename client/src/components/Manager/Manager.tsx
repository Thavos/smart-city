import { FC } from "react";
import { Ticktes } from "../Ticktes";
import styles from "./Manager.module.css";

export const Manager: FC = () => {
  return (
    <>
      <p>Manager menu</p>
      <Ticktes />
      <p>My service tickets</p>
    </>
  );
};
