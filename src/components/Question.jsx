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

export default function Question({question, answers, onAnswerSubmit, options, onData}){

    function handleSubmit(){
        const response = parseInt(document.querySelector('input[name="response"]:checked').value);
        onAnswerSubmit(options[response]);
        onData(
            {
                question: question,
                answer: answers[response],
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
                    {answers.map(createInput)}
                </div>
            </form>
            {answers.length > 0 ? <button id="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button> : <p>No Answer option was found</p>}
        </div>
    );
}