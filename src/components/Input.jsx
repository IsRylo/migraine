export default function Input(props) {
    return(
        <div className="Input">
            <label className="mx-2">{props.parameter} : </label>
            <input type="number" className="" id={props.answer + "Number"} aria-describedby="button" name="response" placeholder="Masukkan Nilai"/>
            {/* TODO: INPUT UNIT */}
            <label className="mx-2">Units</label>
        </div>
    );
}