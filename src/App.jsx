import { useState, useEffect } from 'react'
import './App.css'
import GamePanel from './components/GamePanel'
import ResultModal from './components/ResultModal'

const letters=[...Array(26)].map((val, i) => String.fromCharCode(i + 97))

function App() {
  var interval
  const [ActivePlayer, setActivePlayer] = useState(null)
  const [CurrentWord, setCurrentWord] = useState('')
  const [isRunning, setIsRunning] = useState([false,'Play']);

  function NextWord(val){
    setCurrentWord(val)
  }

  function PlayerLogs(val){
    
  }

  function winner(val){
    console.log('winner is: Player '+val)
    setIsRunning([false,'Play Again'])
    setActivePlayer(null)
  }

  useEffect(() => {
    if (isRunning[0]) {
      interval = setInterval(() => {
        setActivePlayer((prev) => prev == 1 ? 2: 1)
      }, 10100);
    }

    
    return () => clearInterval(interval);
  }, [isRunning,ActivePlayer,CurrentWord]);
  
  function play(){
    if(!isRunning[0]){
      setIsRunning([true,'Stop'])
      setActivePlayer(1)
      setCurrentWord(letters[Math.floor(Math.random()*26)])
    }
    else{
      setIsRunning([false,'Play'])
      clearInterval(interval)
      setActivePlayer(null)
    }
  }

  return (
    <>
    <header className='text-white text-4xl bg-gray-950 p-4'>Shiritori Game</header>
    <main className={`relative ${isRunning[1]=='Play Again' && 'blur-xs'}`}>
      <div className='mt-10 flex justify-center gap-10'>
        <GamePanel NextWord={NextWord} CurrentWord={CurrentWord} setActivePlayer={setActivePlayer} ActivePlayer={ActivePlayer} pid='1' winner={winner}/>
        <GamePanel NextWord={NextWord} CurrentWord={CurrentWord} setActivePlayer={setActivePlayer} ActivePlayer={ActivePlayer} pid='2' winner={winner}/>
      </div>
      <div className='mt-10 flex justify-center gap-4'>
        <button onClick={play} className='text-white text-2xl bg-green-800 py-1 px-6 cursor-pointer'>{isRunning[1]}</button>
      </div>

      
    </main>
    {isRunning[1]=='Play Again' && <ResultModal click={play}/>}
    </>
  )
}

export default App
