import React from 'react';
import '../styles/login.css'; // Create corresponding CSS for your styles

const Login = () => {
	return (
		<div className="login-container">
			<div className="login-box">
				<h1>Welcome Back</h1>
				<form>
					<input type="text" placeholder="Username or email" />
					<input type="password" placeholder="Password" />
					<div className="remember-forgot">
						<label>
							<input type="checkbox" /> Remember me
						</label>
						<a href="./components/forgotPassword">Forgot password?</a>
					</div>
					<button type="submit" className="login-button">
						Log In
					</button>
				</form>
				<div className="signup-link">
					<p>
						Don’t have an account? <a href="./components/signUp.js">Sign Up</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
