import { MenuBar } from "../../components/MenuBar";
import { Box, Button, Checkbox, Modal } from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import styles from "./ServiceTicket.module.css";
import { convertToObject } from "typescript";
import Cookies from "universal-cookie";

export const ServiceTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const [serviceTicketName, setServiceTicketName] = useState("");
  const [serviceTicketDesc, setServiceTicketDesc] = useState("");
  const [serviceTicketPrice, setServiceTicketPrice] = useState("");
  const [serviceTicketDate, setServiceTicketDate] = useState("");
  const [serviceTicketTechId, setServiceTicketTechId] = useState("");
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

  async function handleNewServiceticket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation createServiceRequest($createServiceRequestInput: CreateServiceRequestInput) {
                        createServiceRequest(createServiceRequestInput: $createServiceRequestInput) {
                          id
                        }
                      }`,
        variables: {
          createServiceRequestInput: {
            name: serviceTicketName,
            desc: serviceTicketDesc,
            state: 0,
            expectedFinish: Date.now().toString(),
            price: 0,
            managerId: localStorage.getItem("Id"),
            technicianId: serviceTicketTechId,
          },
        },
      }),
    })
        .then((r) => r.json())
        .then((data) => {
        });
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
        <a className={styles["nav-link"]} href="/serviceticket">
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
          <form onSubmit={(e:FormEvent<HTMLFormElement>) => handleNewServiceticket(e)}>
            <h2>Create new service ticket</h2>
            <input
             id="name"
             type="text"
             value={serviceTicketName}
             onChange={(e:ChangeEvent<HTMLInputElement>) => {
               setServiceTicketName(e.target.value);
             }}
             required
             />
            <p/>
            <textarea
                id="desc"
                value={serviceTicketDesc}
                onChange={(e:ChangeEvent<HTMLTextAreaElement>) => {
                  setServiceTicketDesc(e.target.value);
                }}
                required
            />
            <p />
            <input
                name="price"
                type="number"
                value={serviceTicketPrice}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  setServiceTicketPrice(e.target.value);
                }}
            />
            <p />
            <input
              name="endDate"
              type="date"
              className="form-control"
              placeholder="End Date"
              defaultValue=""
              onChange={(e:ChangeEvent<HTMLInputElement>) => {
                setServiceTicketDate(e.target.value);
              }}
            />
            <p />
            <select
                id="technician"
                onChange={(e:ChangeEvent<HTMLSelectElement>) => {
                  console.log(e.target.value);
                  setServiceTicketTechId(e.target.value);
                }}
            >
              {technicians &&
                technicians.map((item: any) => {
                  return (
                    <option value={item.user.id}>{item.user.email}</option>
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
