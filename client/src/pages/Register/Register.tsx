import { FC, useState } from "react";
import styles from "./Register.module.css";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

export const Register: FC = () => {
  const [name, setName] = useState<string>();
  const [surn, setSurn] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation createUser($createUserInput: CreateUserInput) {
                  createUser(createUserInput: $createUserInput) {
                    id
                  }
                }`,
        variables: {
          createUserInput: { name: name, surn: surn, email: email, pwd: pwd },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.data.createUser.id !== "0") {
          navigate("/profile");
        }
      });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["btn-cont"]}>
        <a className={styles["btn"]} href="/">
          Home
        </a>
        <a className={styles["btn"]} href="/login">
          Login
        </a>
      </div>

      <form className={styles["form"]} onSubmit={(e) => handleSubmit(e)}>
        <div className={classnames(styles["input-container"], styles["ic1"])}>
          <input
            id="name"
            className={styles["input"]}
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <div className={styles["cut"]}></div>
          <label htmlFor="name" className={styles["placeholder"]}>
            First Name
          </label>
        </div>

        <div className={classnames(styles["input-container"], styles["ic2"])}>
          <input
            id="surn"
            className={styles["input"]}
            type="text"
            placeholder=" "
            value={surn}
            onChange={(e) => {
              setSurn(e.target.value);
            }}
            required
          />
          <div className={styles["cut"]}></div>
          <label htmlFor="surn" className={styles["placeholder"]}>
            Last Name
          </label>
        </div>

        <div className={classnames(styles["input-container"], styles["ic2"])}>
          <input
            id="email"
            className={styles["input"]}
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <div className={styles["cut"]}></div>
          <label htmlFor="email" className={styles["placeholder"]}>
            E-mail
          </label>
        </div>

        <div className={classnames(styles["input-container"], styles["ic2"])}>
          <input
            id="pwd"
            className={styles["input"]}
            type="password"
            placeholder=" "
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            required
          />
          <div className={styles["cut"]}></div>
          <label htmlFor="pwd" className={styles["placeholder"]}>
            Password
          </label>
        </div>
        <button className={styles["submit"]}>Register</button>
      </form>
    </div>
  );
};
