import {useEffect, useState} from "react";
import ParticipantsList from "./ParticipantsList";

export default function ParticipantsPage({username}) {
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

    async function handleDeleteParticipant(participant) {
        const response = await fetch(`/api/participants/${participant.login}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextParticipants = participants.filter(m => m !== participant);
            setParticipants(nextParticipants);
        }
    }
    return (
        <div>
            <h2>Członkowie ({participants.length})</h2>
            <ParticipantsList participants={participants} username={username}
                          onDelete={handleDeleteParticipant}/>
        </div>
    )
}
