function displayActiviy(data, index) {
    return(
        <div className="flex-item" key={index}>
            <p>{data.question}</p>
            <p>{data.answer}</p>
            <p>{data.parameter}</p>
            <p>{data.date}</p>
        </div>
    );
}

export default function Explanation({activities}){
    // console.log(activities);
    activities.splice(0, 2);
    return (
        <div id="Explanation">
            <h2>Explanation Section</h2>
            <div className="d-flex flex-column">
                {activities.length > 0 ? activities.map(displayActiviy) : ""}
            </div>
        </div>
    );
}