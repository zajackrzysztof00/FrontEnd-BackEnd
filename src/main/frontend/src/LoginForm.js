import {useEffect, useState} from "react";
import UserPanel from "./UserPanel";
import RegisterForm from "./RegisterForm";

export default function LoginForm({onLogin, buttonLabel}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [participants, setParticipants] = useState([]);
    const [addingNewParticipant, setAddingNewParticipant] = useState(false);

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await fetch(`/api/participants`);
            if (response.ok) {
                const participants = await response.json();
                setParticipants(participants);
            }
        };
        fetchParticipants();
    }, []);

    async function RegisterParticipant(participant) {
        const response = await fetch('/api/participants', {
            method: 'POST',
            body: JSON.stringify(participant),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const nextMeetings = [...participants, participant];
            setParticipants(nextMeetings);
            setAddingNewParticipant(false);
        }
    }

    async function register(email, password) {
        await RegisterParticipant({login: email, password: password})
        onLogin(email, password, participants)
    }

    return <div>
        <label>Zaloguj się e-mailem</label>
        <label>Login</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label>Hasło</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="button" onClick={() => onLogin(email, password, participants)}>{buttonLabel || 'Wchodzę'}</button>
        <RegisterForm onRegister={register}/>
    </div>;
}
