export default function Input(props) {
    return(
        <div className="Input">
            <input type="radio" className="form-check-input" id={props.answer + "RadioButton"} aria-describedby="button" name="response" value={props.value}/>
            <label className="mx-2">{props.answer}</label>
        </div>
    );
}