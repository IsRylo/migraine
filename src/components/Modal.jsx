import React from "react";


const classes = ['Typical aura with migraine', 'Migraine without aura', 'Typical aura without migraine', 'Familial hemiplegic migraine', 'Sporadic hemiplegic migraine', 'Basilar-type Aura', 'Other'];

function sortWithIndeces(toSort) {
    for (var i = 0; i < toSort.length; i++) {
      toSort[i] = [toSort[i], i];
    }
    toSort.sort(function(left, right) {
      return left[0] > right[0] ? -1 : 1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
      toSort.sortIndices.push(toSort[j][1]);
      toSort[j] = toSort[j][0];
    }
    return toSort;
}

export default function Modal(props){
    if (!props.show) {
        return null;
    }

    const sum = props.sum;

    function createList(element, index, arr) {
        if (element < 1) return;
        return(
            <div className="potential-solution" key={index}>
                <p>Persentase migraine adalah {classes[arr.sortIndices[index]]} :  {(100 * element / sum).toFixed(2)} %</p>
            </div>
        );
    }
    // console.log(sortWithIndeces(props.prediction));
    var sorted = sortWithIndeces(props.prediction);
    console.log(sorted.sortIndices);

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">{sorted.map(createList)}</div>
                <div className="modal-footer">
                    <button className="button btn" onClick={props.onReload}>Reload</button>
                </div>
            </div>
        </div>
    )
}