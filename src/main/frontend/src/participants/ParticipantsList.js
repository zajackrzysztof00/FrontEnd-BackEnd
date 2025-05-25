export default function ParticipantsList({participants, onDelete}) {

    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                participants.map((participant, index) => <tr key={index}>
                    <td>{participant.title}</td>
                    <td>{participant.description}</td>
                    <td><button onClick={() => onDelete(participant)}>Usuń członka</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
