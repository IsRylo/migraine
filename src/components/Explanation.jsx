export default function Explanation(props){
    return (
        <div className="Explanation">
            <div className="row">
                <p>{props.question}</p>
            </div>
            <div className="row">
                <div className="col">
                    <p>{props.answer}</p>
                </div>
                <div className="col">
                    <p>{props.date}</p>
                </div>
            </div>
        </div>
    );
}