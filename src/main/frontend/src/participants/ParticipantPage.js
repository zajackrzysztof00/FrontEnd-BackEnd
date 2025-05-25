import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import ParticipantsList from "./ParticipantsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const nextMeetings = [...meetings, meeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }

    async function handleNewParticipant(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const nextMeetings = [...meetings, meeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }

    // function handleNewMeeting(meeting) {
    //     const nextMeetings = [...meetings, meeting];
    //     setMeetings(nextMeetings);
    //     setAddingNewMeeting(false);
    // }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);
        }
    }
    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewParticipantForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <ParticipantsList meetings={meetings} username={username}
                              onDelete={handleDeleteMeeting} onAddParticipatnt={handleNewParticipant}/>}
        </div>
    )
}
