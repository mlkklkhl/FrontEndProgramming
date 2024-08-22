import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUserPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import { register, login, logout, loadAuthState } from '../Auth';

export default function AuthDialog({ onLogin, customClass }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            let result;
            if (isLogin) {
                result = await login(email, password);
            } else {
                result = await register(email, password, name);
            }
            setUser(result);
            onLogin(result);
            setIsOpen(false);
            resetForm();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            onLogin(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setError(null);
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    useEffect(() => {
        const savedUser = loadAuthState();
        if (savedUser) {
            setUser(savedUser);
            onLogin(savedUser);
        }
    }, [onLogin]);

    if (user) {
        return (
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-gray-800 px-3">Welcome, {user.displayName}</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Sign out
                </button>
            </div>
        );
    }
    
    return (
        // RETRUN STATEMENT
        <>
            <button onClick={() => setIsOpen(true)}
                className={customClass || "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"}>
                <FontAwesomeIcon icon={isLogin ? faSignInAlt : faUserPlus} className="mr-2" />
                {isLogin ? 'Sign in' : 'Sign up'}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">{isLogin ? 'Sign in' : 'Sign up'}</h2>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="Name" required={!isLogin} className="w-full p-2 border rounded" />
                            )}
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" required className="w-full p-2 border rounded" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" required className="w-full p-2 border rounded" />
                            <div id="bot" className="p-2 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button type="button" onClick={toggleAuthMode}
                                        className="text-blue-500 hover:text-blue-600 underline transition duration-300">
                                        {isLogin ? 'Sign up' : 'Sign in'}
                                    </button>
                                </p>
                                <span className="flex space-x-2 float-right">
                                    <button type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 w-auto flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        {isLogin ? 'Sign in' : 'Register'}
                                    </button>
                                    <button type="button" onClick={() => setIsOpen(false)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 w-auto flex items-center">
                                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                        Cancel
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}