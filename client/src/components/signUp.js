import React, { useState, useEffect } from 'react';
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
	const [formErrors, setFormErrors] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: '',
	});
	const [success, setSuccess] = useState('');

	const validateField = (name, value) => {
		let errorMessage = '';

		switch (name) {
			case 'username':
				if (value.length < 3)
					errorMessage = 'Username must be at least 3 characters long.';
				break;
			case 'email':
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value))
					errorMessage = 'Please enter a valid email address.';
				break;
			case 'password':
				const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
				if (!passwordRegex.test(value))
					errorMessage =
						'Password must be 8+ characters, with an uppercase, lowercase, and a number.';
				break;
			case 'confirmPassword':
				if (value !== formData.password)
					errorMessage = 'Passwords do not match.';
				break;
			default:
				break;
		}

		setFormErrors((prevErrors) => ({
			...prevErrors,
			[name]: errorMessage,
		}));
	};

	const checkAvailability = async (field, value) => {
		if (!value) return;

		try {
			const response = await fetch(
				'http://localhost:5000/auth/checkAvailability',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ [field]: value }),
				}
			);

			if (response.status === 409) {
				const data = await response.json();
				setFormErrors((prevErrors) => ({
					...prevErrors,
					[field]: data.message,
				}));
			} else {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					[field]: '',
				}));
			}
		} catch (error) {
			console.error(`Error checking ${field} availability:`, error);
		}
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const fieldValue = type === 'checkbox' ? checked : value;
		setFormData((prevData) => ({
			...prevData,
			[name]: fieldValue,
		}));

		// Trigger validation and availability checks on field change
		validateField(name, fieldValue);
		if (name === 'username' || name === 'email') {
			checkAvailability(name, fieldValue);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Ensure no remaining validation errors
		for (const field in formData) {
			validateField(field, formData[field]);
		}
		if (Object.values(formErrors).some((error) => error)) return;

		const { username, email, password } = formData;
		setSuccess(''); // Clear any previous success message

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
				setFormData({
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					rememberMe: false,
					agreeToTerms: false,
				});
				setFormErrors({});
			} else {
				const errorData = await response.json();
				setFormErrors((prevErrors) => ({
					...prevErrors,
					submit: errorData.error || 'Signup failed',
				}));
			}
		} catch (error) {
			console.error('Error:', error);
			setFormErrors((prevErrors) => ({
				...prevErrors,
				submit: 'Signup failed. Please try again later.',
			}));
		}
	};

	return (
		<div className="signup-page">
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
			<div className="signup-form-container">
				<h2 className="signup-title">Register</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
					{formErrors.username && (
						<p className="error-message">{formErrors.username}</p>
					)}

					<input
						type="email"
						name="email"
						placeholder="Email address"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					{formErrors.email && (
						<p className="error-message">{formErrors.email}</p>
					)}

					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					{formErrors.password && (
						<p className="error-message">{formErrors.password}</p>
					)}

					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
					{formErrors.confirmPassword && (
						<p className="error-message">{formErrors.confirmPassword}</p>
					)}

					<div className="checkbox-group">
						<label className="checkBoxes">
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
					{formErrors.agreeToTerms && (
						<p className="error-message">{formErrors.agreeToTerms}</p>
					)}

					{formErrors.submit && (
						<p className="error-message">{formErrors.submit}</p>
					)}
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
