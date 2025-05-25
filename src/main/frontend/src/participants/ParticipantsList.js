export default function ParticipantsList({participants, onDelete}) {

    return (
        <table>
            <thead>
            <tr>
                <th>Email</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                participants.map((participant, index) => <tr key={index}>
                    <td>{participant.login}</td>
                    <td><button onClick={() => onDelete(participant)}>Usuń członka</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
