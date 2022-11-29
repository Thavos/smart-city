import { Button, Checkbox, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./myservicetickets.module.css";

type ticket = {
  id: string;
  name: string;
  desc: string;
  state: boolean;
  price: string;
  expectedFinish: string;
};

export default function MyServiceTickets() {
  const [myTickets, setMyTickets] = useState<ticket[]>();
  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query findMyTickets {
                    findMyTickets {
                        id
                        name
                        desc
                        state
                        price
                        expectedFinish
                        Technician{
                            userId
                        }
                    }
                }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.data.findMyTickets) setMyTickets(data.data.findMyTickets);
      });
  }, []);

  function handleCheckbox(c: ticket) {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateServiceRequest($updateServiceRequestInput: UpdateServiceRequestInput) {
                    updateServiceRequest(updateServiceRequestInput: $updateServiceRequestInput) {
                        id
                    }
                }`,
        variables: {
          updateServiceRequestInput: {
            id: c.id,
            state: c.state,
          },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleTimeChange(c: ticket) {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateServiceRequest($updateServiceRequestInput: UpdateServiceRequestInput) {
                      updateServiceRequest(updateServiceRequestInput: $updateServiceRequestInput) {
                          id
                      }
                  }`,
        variables: {
          updateServiceRequestInput: {
            id: c.id,
            expectedFinish: parseInt(c.expectedFinish),
          },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handlePriceChange(c: ticket) {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateServiceRequest($updateServiceRequestInput: UpdateServiceRequestInput) {
                        updateServiceRequest(updateServiceRequestInput: $updateServiceRequestInput) {
                            id
                        }
                    }`,
        variables: {
          updateServiceRequestInput: {
            id: c.id,
            price: c.price,
          },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleModalClose() {
    if (changed) {
      fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation updateServiceRequest($updateServiceRequestInput: UpdateServiceRequestInput) {
                            updateServiceRequest(updateServiceRequestInput: $updateServiceRequestInput) {
                                id
                            }
                        }`,
          variables: {
            updateServiceRequestInput: {
              id: ticketData.id,
              desc: ticketData.desc,
            },
          },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
        });
    }
    setChanged(false);
    setOpenModal(false);
  }

  function handleOpenModal(ticket: ticket) {
    setTicketData(ticket);
    setOpenModal(true);
  }
  function handleCommentChange() {
    setChanged(true);
  }

  const [changed, setChanged] = useState(false);
  const randticket: ticket = {
    id: "",
    name: "",
    desc: "",
    state: true,
    price: "",
    expectedFinish: "",
  };
  const [openModal, setOpenModal] = useState(false);
  const [ticketData, setTicketData] = useState(randticket);

  return (
    <div>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/ticketsPage">
          Tickets
        </a>
      </nav>
      <div className={styles["flex-wrapper"]}>
        <table>
          <thead>
            <tr>
              <th>Ticket Name</th>
              <th>Description</th>
              <th>Est. Price (CZK)</th>
              <th>Est. End Date</th>
            </tr>
          </thead>
          {myTickets &&
            myTickets.map((c) => {
              return (
                <tr>
                  <td>{c.name}</td>
                  <td>{c.desc}</td>
                  <td>{c.price}</td>
                  <td>{new Intl.DateTimeFormat("cs-CZ", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(parseInt(c.expectedFinish))}</td>
                  {/* <div>{c.id}</div> */}
                  {/* <div>
                  {" "}
                  <TextField
                    onBlur={() => handlePriceChange(c)}
                    value={c.price}
                  />
                </div>
                <div>
                  {" "}
                  <TextField
                    onBlur={() => handleTimeChange(c)}
                    value={c.time}
                  />{" "}
                </div>
                <div>
                  <Checkbox
                    checked={c.status}
                    onChange={() => handleCheckbox(c)}
                  />
                </div> */}
                  {/* <div>
                  {" "}
                  <Button onClick={() => handleOpenModal(c)}>Comment</Button>
                </div> */}
                </tr>
              );
            })}
        </table>
      </div>
      <Modal
        open={openModal}
        onClose={(e) => {
          handleModalClose();
        }}
      >
        <TextField
          onChange={() => {
            handleCommentChange();
          }}
          value={ticketData.desc}
        />
      </Modal>
    </div>
  );
}
