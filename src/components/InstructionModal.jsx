import React from 'react'

function InstructionModal(props) {
  return (
    <div className='instructions'>
        <img src="/cross.png" alt="cross" onClick={()=>props.close(false)}/>
        <h1>Instructions</h1>
        <ul>
            <li>The will begin with a initial random letter and Player1 has to type a dictionary word</li>
            <li>If the word is found in dictionary, then Player1 gets equal points of length of typed words</li>
            <li>If the word isn't found in dictionary, then Player1 gets negetive points of length of typed words</li>
            <li>Player1 will get 10 seconds to type a correct word. If the word id correct, then automatically game switch to player2 before 10 seconds</li>
            <li>Now it is Player2's turn to play the game same as the condition</li>
            <li>For player2, the initial letter would be the last letter of Player1's word</li>
            <li>The player who reaches 100 points, will be declared as winner</li>
            <li>Note that, minimum word length should be 4 and previous correct word can't be used in next iteration</li>
        </ul>
    </div>
  )
}

export default InstructionModal