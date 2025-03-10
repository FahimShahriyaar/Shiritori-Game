import React from 'react'

function ResultModal(props) {
  return (
    <div className='absolute rounded-2xl bg-sky-900 w-[50%] h-[50%] top-[50%] left-[50%] -translate-[50%] z-10'>
            <div className="winner mb-4">
            <h1>winner</h1>
            <h2>player 1</h2>
            </div>
            <div className="players">
                <div className="player1">
                    <pre>Score    :</pre>
                    <pre>Correct  : </pre>
                    <pre>Incorrect: </pre>
                </div>
                <div className="player2">
                    <pre>Score    :</pre>
                    <pre>Correct  : </pre>
                    <pre>Incorrect: </pre>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <button onClick={props.click} className='text-white text-xl bg-green-700 hover:bg-green-600 p-3 rounded-lg cursor-pointer'>Play Again</button>
            </div>
        </div>
  )
}

export default ResultModal