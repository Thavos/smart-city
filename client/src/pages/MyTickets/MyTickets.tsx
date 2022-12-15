import { FC, useEffect, useState } from "react";
import styles from "./MyTickets.module.css";

enum status {
  "Waiting" = 0,
  "Assigned" = 1,
  "Resolved" = 2,
  "Declined" = 3,
}

const TicketStatus = ["Waiting", "Assigned", "Resolved", "Declined"];

export const MyTickets: FC = () => {
  const [tickets, setTickets] = useState<[any]>();

  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query myTickets {
          myTickets {
          name
          desc
          state
          createdAt
          userId
        }
      }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.data.myTickets) setTickets(data.data.myTickets);
      });
  }, [setTickets]);

  return (
    <div className={styles["body"]}>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/mytickets">
          My Tickets
        </a>
      </nav>

      <div className={styles["all-tickets"]}>
        {tickets &&
          tickets.reverse().map((c, id) => {
            return (
              <div key={"ticket" + id} className={styles["ticket"]}>
                <header className={styles["ticket-name"]}>{c.name}</header>
                <div className={styles["ticket-date"]}>
                  {new Intl.DateTimeFormat("cs-CZ", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(parseInt(c.createdAt))}
                </div>
                <div className={styles["ticket-state"]}>
                  {TicketStatus[c.state]}
                </div>
                <div className={styles["ticket-dsc"]}>
                  <p>{c.desc}</p>
                </div>
              </div>
            );
          })}
      </div>

      <footer className={styles["footer-wrapper"]}>
        <div>School project</div>
        <div>Smart City</div>
      </footer>
    </div>
  );
};
