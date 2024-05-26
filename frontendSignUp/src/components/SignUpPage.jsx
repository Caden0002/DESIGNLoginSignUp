import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function SignUpPage(props) {
    // State variables for username, password, and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clear previous error messages
            setErrorMessage('');

            // Send sign-up request to server
            const response = await axios.post('https://designlogin.onrender.com/signup', { username, password });

            // If sign-up successful, redirect to LoginPage
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);

            // If sign-up failed, display error message
            setErrorMessage('Error occurred while signing up. Please try again.');
        }
    };

    // Function to handle back button click
    const handleBackClick = () => {
        navigate('/login'); // Navigate back to the login page
    };

    // JSX structure for sign-up form
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up</button>
                    {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} {/* Display error message if exists */}
                </form>
                {/* Back button */}
                <button onClick={handleBackClick} className="w-full mt-4 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400">Back to Login</button>
            </div>
        </div>
    );
}

export default SignUpPage;
