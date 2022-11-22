export default function Input(props) {
    return(
        <div className="Input">
            <label className="mx-2">Visual: </label>
            <input type="number" className="" id={props.answer + "Number"} aria-describedby="button" name="response" placeholder="Masukkan Nilai"/>
            {/* TODO: INPUT UNIT */}
            <label className="mx-2">Unit</label>
        </div>
    );
}