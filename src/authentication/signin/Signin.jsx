import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles/loginform.module.css";

const Signin = () => {
     let navigate = useNavigate();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [role, setRole] = useState("");

     const handleSubmit = (e) => {

          e.preventDefault();

          axios.post("http://localhost:3001/login", { email: email, password: password, role: role })
               .then((response) => {
                    const token = response.data.token;
                    if (role === "student" || role === "teacher") {
                         console.log(response.data);
                         document.cookie = `session=${response.data.token}; path=/`;
                         console.log("Login successful");
                         sessionStorage.setItem('access_token', token);
                         navigate('/home');
                    }
                    else {
                         window.location.href = "http://localhost:3002/home";
                    }
               })
               .catch(err => {
                    console.log("Server error:", err);
               });
     }

     return (
          <div className={styles.login_container}>
               <div className={styles.login_form_container}>
                    <div className={styles.left}>
                         <form
                              className={styles.form_container}
                              action=""
                              id="login"
                              method="post"
                              onSubmit={handleSubmit}
                         >
                              <h1>Sign in to Your Account</h1>
                              <input
                                   type="email"
                                   placeholder="Email"
                                   name="email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required
                                   className={styles.input}
                              />
                              <input
                                   type="password"
                                   placeholder="Password"
                                   name="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required
                                   className={styles.input}
                              />
                              <select
                                   name="role"
                                   onChange={(e) => setRole(e.target.value)}
                                   value={role}
                                   required
                                   className={styles.input}
                              >
                                   <option value="other">Select a Role</option>
                                   <option value="student">Student</option>
                                   <option value="teacher">Teacher</option>
                              </select>
                              {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                              <button type="submit" className={styles.green_btn}>
                                   Sign In
                              </button>
                         </form>
                    </div>
                    <div className={styles.right}>
                         <h1>New Here ?</h1>
                         <Link to="/register">
                              <button type="button" className={styles.white_btn}>
                                   Sign Up
                              </button>
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default Signin;
