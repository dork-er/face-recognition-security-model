import React from 'react';
import '../styles/login.css'; // Create corresponding CSS for your styles

const Login = () => {
	return (
		<div className="login-container">
			<img
				src="/images/bionicRobot.png"
				alt="robot"
				className="background-image"
			></img>
			<img
				src="/images/backgroundSignup.jpg"
				alt="background"
				className="background-cover"
			></img>
			<div className="login-box">
				<h1 className="login-title">Welcome Back</h1>
				<form>
					<input type="text" placeholder="Username or email" />
					<input type="password" placeholder="Password" />
					<div className="remember-forgot">
						<label>
							<input type="checkbox" /> Remember me
						</label>
						<br />
						<a href="./components/forgotPassword">Forgot password?</a>
					</div>
					<button type="submit" className="login-button">
						Log In
					</button>
				</form>
				<div className="login-link">
					<p>
						Don’t have an account?<a href="/signup">Sign Up</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
