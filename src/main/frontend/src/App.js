import "milligram";
import './App.css';
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm";
import UserPanel from "./UserPanel";
import RegisterForm from "./RegisterForm";

function App() {
    const [loggedIn, setLoggedIn] = useState('');

    async function login(email, password) {
        const response = await fetch(`/api/participants/${email}`, {
            method: 'GET',
        });
        if (response.ok) {
            const participant = await response.json();
            if (participant.login == email && participant.password == password) {
                setLoggedIn(email);
            }
        }
    }

    function logout() {
        setLoggedIn('');
    }

    return (
        <div>
            <h1>System do zapisów na zajęcia</h1>
            {loggedIn ? <UserPanel username={loggedIn} onLogout={logout}/> : <LoginForm onLogin={login}/>}
        </div>
    );
}

export default App;
