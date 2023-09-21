import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/registerform.module.css";

const Register = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [gender, setgender] = useState("");
	const [first_name, setfirstname] = useState("");
	const [last_name, setlastname] = useState("");
	const [generation, setgeneration] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/signup/student", {
				username,
				gender,
				first_name,
				last_name,
				email,
				password,
				role_id: "student",
				generation,
			})
			.then((response) => {
				console.log(response.data.message);
				console.log("login successfully");
			});
		navigate("/login");
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form
						className={styles.form_container}
						method="post"
						onSubmit={handleSubmit}
					>
						<h1>Create Account</h1>
						<input
							type="first_name"
							placeholder="First_Name"
							name="first_name"
							onChange={(e) => setfirstname(e.target.value)}
							value={first_name}
							required
							className={styles.input}
						/>
						<input
							type="last_name"
							placeholder="last_Name"
							name="last_name"
							onChange={(e) => setlastname(e.target.value)}
							value={last_name}
							required
							className={styles.input}
						/>
						<input
							type="username"
							placeholder="Username"
							name="username"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							required
							className={styles.input}
						/>
						<select
							name="gender"
							onChange={(e) => setgender(e.target.value)}
							value={gender}
							required
							className={styles.input}
						>
							<option value="">Gender</option>
							<option value="Female">Female</option>
							<option value="Male">Male</option>
							<option value="sth">Prefer not to say</option>
						</select>
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
							name="generation"
							onChange={(e) => setgeneration(e.target.value)}
							value={generation}
							required
							className={styles.input}
						>
							<option value="">Generation</option>
							<option value="22nd">22nd</option>
							<option value="23rd">23rd</option>
							<option value="24th">24th</option>
							<option value="25th">25th</option>
							<option value="26th">26th</option>
						</select>
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
