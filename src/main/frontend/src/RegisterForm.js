import {useState} from "react";

export default function RegisterForm({onRegister, buttonLabel}) {
    const [email, setEmail] = useState('');
    const [passward, setPassward] = useState('');

    return <div>
        <label>Zarejestruj się e-mailem</label>
        <label>Login</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label>Hasło</label>
        <input type="text" value={passward} onChange={(e) => setPassward(e.target.value)}/>
        <button type="button" onClick={() => onRegister(email, passward)}>{buttonLabel || 'Zarejestruj się'}</button>
    </div>;
}