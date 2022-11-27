import {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";
import {Box, Button, NativeSelect} from "@mui/material";

type UserType = {
    id:string;
    name: string;
    surn: string;
    authId: number;
    email: string;
};

export function ManageUsersTable(){
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `query users {
          user {
          name
          surn
          authId
          email
          id
        }
      }`,
            }),
        })
            .then((r) => r.json()).then((data)=> {
                console.log(data.data);
                setResult(data.data.user);
            }
        );
    }, []);

    function handleSelectChange(e:ChangeEvent<HTMLSelectElement>,item:UserType){
        console.log("Fetch na změnu role");
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `mutation updateUser($updateUserInput) {
                    updateUser(updateUserInput: $updateUserInput){
                    id
                    }
                    }`,
                variables: {updateUserInput: {id:item.id ,authId: e.target.value}},
            }),
        }).then((r) => r.json()).then((data)=> {
            console.log(data.data);
            setResult(data.data.user);
        }
        );
    }

    function handleDelete(item:UserType){
        console.log("Fetch na mazání");
        /*
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `mutation delete($string) {
                    delete(updateUserInput: $updateUserInput){
                    id
                    }
      }`,
                variables: {updateUserInput: {id:item.id ,authId: e.target.value}},
            }),
        })
        */
    }

    return(
      <div>
          <div style={{color:"white"}}>
            <table>
                  <tr>
                      <td>First Name</td>
                      <td>Last Name</td>
                      <td>E-mail</td>
                      <td>Role</td>
                      <td>Action</td>
                  </tr>
                  {result.map((item:UserType) => {
                      return(
                          <tr>
                              <td>{item.name}</td>
                              <td>{item.surn}</td>
                              <td>{item.email}</td>
                              <td>
                                  <NativeSelect defaultValue={item.authId} sx={{color: "white"}} onChange={(e) => handleSelectChange(e,item)}>
                                      <option value={0}>Citizen</option>
                                      <option value={1}>Technician</option>
                                      <option value={2}>Manager</option>
                                      <option value={3}>Admin</option>
                                  </NativeSelect>
                              </td>
                              <td><Button onClick={() => handleDelete(item)}>Delete</Button></td>
                          </tr>
                      )
                })}
            </table>
          </div>
      </div>
    );
}

export function ManageTechniciansTable(){
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `query users {
          user {
          name
          surn
          authId
          email
          id
        }
      }`,
            }),
        })
            .then((r) => r.json()).then((data)=> {
                console.log(data.data);
                setResult(data.data.user);
            }
        );
    }, []);

    function handleSelectChange(e:ChangeEvent<HTMLSelectElement>,item:UserType){
        console.log("Fetch na změnu role");
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `mutation updateUser($updateUserInput) {
                    updateUser(updateUserInput: $updateUserInput){
                    id
                    }
                    }`,
                variables: {updateUserInput: {id:item.id ,authId: e.target.value}},
            }),
        }).then((r) => r.json()).then((data)=> {
                console.log(data.data);
                setResult(data.data.user);
            }
        );
    }

    function handleDelete(item:UserType){
        console.log("Fetch na mazání");
        /*
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `mutation delete($string) {
                    delete(updateUserInput: $updateUserInput){
                    id
                    }
      }`,
                variables: {updateUserInput: {id:item.id ,authId: e.target.value}},
            }),
        })
        */
    }

    return(
        <div>
            <div style={{color:"white"}}>
                <table>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>E-mail</td>
                        <td>Role</td>
                        <td>Action</td>
                    </tr>
                    {result.map((item:UserType) => {
                        if(item.authId < 3)
                        return(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.surn}</td>
                                <td>{item.email}</td>
                                <td>
                                    <NativeSelect defaultValue={item.authId} sx={{color: "white"}} onChange={(e) => handleSelectChange(e,item)}>
                                        <option value={0}>Citizen</option>
                                        <option value={1}>Technician</option>
                                    </NativeSelect>
                                </td>
                                <td><Button onClick={() => handleDelete(item)}>Delete</Button></td>
                            </tr>
                        )
                        else return (<div />)
                    })}
                </table>
            </div>
        </div>
    );
}