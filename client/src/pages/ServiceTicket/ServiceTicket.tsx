import { MenuBar } from "../../components/MenuBar";
import { Box, Button, Checkbox, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./ServiceTicket.module.css";
import { convertToObject } from "typescript";

export const ServiceTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [technicians, setTechnicians] = useState<any>();
  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query technicians {
                    technicians {
                        id
                        user{
                            id
                            name
                            surn
                            email
                            authId
                        }
                    }
                }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.data.technicians) setTechnicians(data.data.technicians);
      });
  }, [setTechnicians]);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleNewServiceticket(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    NewServiceTicket(
      event.target.name,
      event.target.description.value,
      event.target.technician.value,
      technicians
    );
  }

  function handleCheckbox(ticket: any) {
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
            id: ticket.id,
            state: ticket.state,
          },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  const [servTickets, setServTickets] = useState<any[]>();
  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query serviceRequests {
                    serviceRequests {
                        id
                        name
                        desc
                        state
                        price
                        expectedFinish
                        technician {
                            userId
                        }
                    }
                }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.data.serviceRequests)
          setServTickets(data.data.serviceRequests);
      });
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/ticketsPage">
          Tickets
        </a>
      </nav>
      <Button onClick={handleShowModal}>Create new service ticket</Button>
      <div className={styles["table-wrapper"]}>
        <table>
          <thead>
            <tr>
              <th>Ticket Name</th>
              <th>Description</th>
              <th>Technician</th>
              <th>Est. Price (CZK)</th>
              <th>Est. End Date</th>
            </tr>
          </thead>
          {servTickets &&
            servTickets.map((item: any) => {
              if (technicians)
                technicians.forEach((tech: any) => {
                  if (tech.user.id === item.technician.userId)
                    item.email = tech.user.email;
                });
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.email}</td>
                  <td>{item.price}</td>
                  <td>
                    {new Intl.DateTimeFormat("cs-CZ", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(parseInt(item.expectedFinish))}
                  </td>
                  <td>
                    <Checkbox
                      checked={item.state}
                      onChange={() => handleCheckbox(item)}
                    />
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={style}>
          <form onSubmit={handleNewServiceticket}>
            <h2>Create new service ticket</h2>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Name"
              defaultValue=""
            />
            <p />
            <input
              name="description"
              type="text"
              className="form-control"
              placeholder="Description"
              defaultValue=""
            />
            <p />
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              defaultValue=""
            />
            <p />
            <input
              name="endDate"
              type="date"
              className="form-control"
              placeholder="End Date"
              defaultValue=""
            />
            <p />
            <select id="technician">
              {technicians &&
                technicians.map((item: any) => {
                  return (
                    <option value={item.user.email}>{item.user.email}</option>
                  );
                })}
            </select>
            <p />
            <Button type="submit">Create</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

function NewServiceTicket(
  name: String,
  desc: String,
  tech: String,
  technicians: any
) {
  technicians.forEach((tech: any) => {
    if (tech.user.email === tech) tech = tech.id;
  });

  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation updateServiceRequest($createServiceRequestInput: CreateServiceRequestInput) {
                          updateServiceRequest(createServiceRequestInput: $createServiceRequestInput) {
                              id
                          }
                      }`,
      variables: {
        createServiceRequestInput: {
          name: name,
          desc: desc,
          state: 0,
          expectedFinish: "000000000",
          price: 0,
          managerId: "null",
          technicianId: tech,
        },
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
}
