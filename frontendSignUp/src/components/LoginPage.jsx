import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const instruction = "As I'm using Render's free tier to host my backend, you may experience a delay of 50-60 seconds for your first login. Please be patient.\n\nThis is a simple login system where I integrate MySQL with AWS RDS for data transfer."

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

const handlePasswordDataClick = async () => {
    try {
        setErrorMessage(''); // Clear any existing error message
        const response = await axios.get('https://designloginsignup.onrender.com/data');
        setUserData(response.data);
        setShowModal(true);
    } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Failed to fetch password data.');
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage('');
            const response = await axios.post('https://designloginsignup.onrender.com/login', { username, password });
            if (response.status === 200) {
                navigate('/main');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Your Username and\nPassword are incorrect.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
     <p className="text-gray-600 mb-12 sm:mb-4 w-96 sm:absolute sm:bottom-4 sm:right-4 whitespace-pre-line text-xs sm:text-base">{instruction}</p>

            <div className="mx-auto p-6 bg-white rounded-md shadow-md">
        
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>


                    {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>}
                </form>
                <button onClick={handleSignUpClick} className="w-full mt-4 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400">Sign Up</button>
                <button onClick={handlePasswordDataClick} className="w-full mt-4 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400">Password Data</button>
            </div>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Password Data</h3>
                                        <div className="mt-2">
                                            {userData.map((data, index) => (
                                                <p key={index} className="text-gray-600"><span className="font-medium">Username:</span> {data.username}, <span className="font-medium">Password:</span> {data.password}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => setShowModal(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
