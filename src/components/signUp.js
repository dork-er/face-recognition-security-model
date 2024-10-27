import React, { useState } from 'react';
import '../styles/signUp.css';

const SignUp = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		rememberMe: false,
		agreeToTerms: false,
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Client-side password match check
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		const { username, email, password } = formData;
		setError(''); // Clear any previous errors

		try {
			const response = await fetch('http://localhost:5000/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				setSuccess(data.message); // Display success message
				setError(''); // Clear any error message
				setFormData({
					// Clear form fields
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					rememberMe: false,
					agreeToTerms: false,
				});
			} else {
				const errorData = await response.json();
				setError(errorData.error || 'Signup failed'); // Display backend error message
			}
		} catch (error) {
			console.error('Error:', error);
			setError('Signup failed. Please try again later.');
		}
	};

	return (
		<div className="signup-page">
			<div className="signup-form-container">
				<h2 className="signup-title">Register</h2>
				<p className="signup-subtitle">Create your new account</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						placeholder="Username or email address"
						value={formData.username}
						onChange={handleChange}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Email address"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
					<div className="checkbox-group">
						<label>
							<input
								type="checkbox"
								name="rememberMe"
								checked={formData.rememberMe}
								onChange={handleChange}
							/>
							Remember me
						</label>
						<label>
							<input
								type="checkbox"
								name="agreeToTerms"
								checked={formData.agreeToTerms}
								onChange={handleChange}
								required
							/>
							I agree to the terms and conditions
						</label>
					</div>
					{error && <p className="error-message">{error}</p>}
					{success && <p className="success-message">{success}</p>}
					<button type="submit" className="signup-button">
						Sign Up
					</button>
					<p className="login-link">
						Already have an account? <a href="/login">Log In</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
