export default function Explanation({activities}){
    if (activities.length > 0)
    return (
        <div id="Explanation">
            <h2>Explanation Section</h2>
            <div className="d-flex flex-align-vertical">
                <p>{activities[0].question}</p>
                <p>{activities[0].answer}</p>
                <p>{activities[0].date}</p>
            </div>
        </div>
    );
}