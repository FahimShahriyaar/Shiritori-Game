import React from 'react'

function ResultModal(props) {
  return (
    <div className='absolute rounded-2xl bg-sky-900 w-[60%] h-[60%] top-[50%] left-[50%] -translate-[50%] z-10'>
            <div className="winner mb-8">
            <h1>winner</h1>
            <h2>---------- Player {props.winPlayer} ----------</h2>
            </div>
            <div className="players">
                <div className="player1 bg-green-600">
                    <p className='text-center'>Player 1</p>
                    <pre>Score    : {props.Logs[1].score}</pre>
                    <pre>Correct  : {props.Logs[1].correct}</pre>
                    <pre>Incorrect: {props.Logs[1].incorrect}</pre>
                </div>
                <div className="player2 bg-red-600">
                    <p className='text-center'>Player 2</p>
                    <pre>Score    : {props.Logs[2].score}</pre>
                    <pre>Correct  : {props.Logs[2].correct}</pre>
                    <pre>Incorrect: {props.Logs[2].incorrect}</pre>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <button onClick={props.click} className='text-white text-xl bg-gray-700 hover:bg-gray-600 p-3 rounded-lg cursor-pointer'>Play Again</button>
            </div>
        </div>
  )
}

export default ResultModal