import { FC } from "react";
import { Ticktes } from "../Ticktes";
import styles from "./Technician.module.css";

export const Technician: FC = () => {
  return (
    <>
      <p>Technician menu</p>
      <Ticktes />
      <p>My service tickets</p>
    </>
  );
};
