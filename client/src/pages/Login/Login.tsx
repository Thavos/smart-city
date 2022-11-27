import { FC, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();

  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query login($loginUserInput: LoginUserInput) {
          login(loginUserInput: $loginUserInput) {
            id
          }
        }`,
        variables: {
          loginUserInput: { email: email, pwd: pwd },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (
          data.data.login.id !== "WrongPassword" &&
          data.data.login.id !== "UnknownUser"
        ) {
          navigate("/profile");
        } else {
          setData(data.data.login.id);
        }
      });
  };

  return (
    <div className={styles["container"]}>
      <a className={styles["btn"]} href="/">
        Home
      </a>

      <form className={styles["form"]} onSubmit={(e) => handleSubmit(e)}>
        <div className={classnames(styles["input-container"], styles["ic1"])}>
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
        <button className={styles["submit"]}>Login</button>
      </form>

      <p>{data}</p>
      {data && (
        <>
          <p>Dont have an account yet?</p>
          <a className={styles["btn"]} href="/register">
            Click to Register Here
          </a>
        </>
      )}
    </div>
  );
};
