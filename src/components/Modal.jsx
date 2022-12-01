import React from "react";


const classes = ['Typical aura with migraine', 'Migraine without aura', 'Typical aura without migraine', 'Familial hemiplegic migraine', 'Sporadic hemiplegic migraine', 'Basilar-type Aura', 'Other'];

export default function Modal(props){
    if (!props.show) {
        return null;
    }

    const sum = props.sum;

    function createList(element, index) {
        if (element < 1) return;
        return(
            <div className="potential-solution">
                <p>Persentase migraine adalah {classes[index]} :  {100 * element / sum} %</p>
            </div>
        );
    }
    console.log(props.prediction);
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">{props.prediction.map(createList)}</div>
                <div className="modal-footer">
                    <button className="button btn" onClick={props.onReload}>Reload</button>
                </div>
            </div>
        </div>
    )
}