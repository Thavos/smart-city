import { FC, useState } from "react";
import styles from "./NewTicket.module.css";
import classnames from "classnames";

export const NewTicket: FC = () => {
  const [name, setName] = useState<string>();
  const [desc, setDesc] = useState<string>();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation createTicket($createTicketInput: CreateTicketInput) {
                createTicket(createTicketInput: $createTicketInput) {
                id
              }
            }`,
        variables: {
          createTicketInput: { name: name, desc: desc, state: 0, userId: "0" },
        },
      }),
    })
      .then((r) => r.json())
      .then(() => window.location.reload());
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles["form"]}>
      <div className={classnames(styles["input-container"], styles["ic1"])}>
        <input
          id="label"
          className={styles["input"]}
          type="text"
          placeholder=" "
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <div className={styles["cut-name"]}></div>
        <label htmlFor="label" className={styles["placeholder"]}>
          Ticket Name
        </label>
      </div>

      <div className={classnames(styles["input-container"], styles["ic2"])}>
        <textarea
          id="desc"
          className={styles["input"]}
          placeholder=" "
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          required
        />
        <div className={styles["cut-desc"]}></div>
        <label htmlFor="desc" className={styles["placeholder"]}>
          Description
        </label>
      </div>

      <div>
        <button className={styles["submit"]} type="submit">
          Submit Ticket
        </button>
      </div>
    </form>
  );
};
