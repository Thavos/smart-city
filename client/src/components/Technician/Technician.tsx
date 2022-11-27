import { FC } from "react";
import { Tickets } from "../Tickets";
import styles from "./Technician.module.css";

export const Technician: FC = () => {
  return (
    <>
      <p>Technician menu</p>
      <Tickets />
      <p>My service tickets</p>
    </>
  );
};
