import Input from "./Input";
import React, { useCallback, useState } from 'react';

function createInput(answer, index){
    return (
    <Input 
        key = {index}
        value = {index}
        answer = {answer}
    />
    );
}

export default function Question({question, answers, onAnswerSubmit, options, onData, threshold, parameter}){

    function handleSubmit(){
        const response = parseInt(document.querySelector('input[name="response"]').value);
        onAnswerSubmit(options[response <= threshold ? 0 : 1]);
        onData(
            {
                question: question,
                parameter: parameter,
                answer: response,
                date: new Date().toLocaleString()
            }
        );
    }

    return(
        <div id="Question">
            <h2>Question Section</h2>
            <form className="mt-4">
                <div className="form-group">
                    <p>{question}</p>
                    {parameter != undefined ? <Input parameter={parameter}/> : ""}
                </div>
            </form>
            {parameter != undefined ? <button id="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button> : ""}
        </div>
    );
}