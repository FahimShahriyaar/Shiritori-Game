import { useState, useEffect } from 'react'
import './App.css'
import GamePanel from './components/GamePanel'
import ResultModal from './components/ResultModal'
import InstructionModal from './components/InstructionModal'
import AboutModal from './components/AboutModal'

const letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 97))

function App() {
  var interval
  const [ActivePlayer, setActivePlayer] = useState(null)
  const [CurrentWord, setCurrentWord] = useState('')
  const [isRunning, setIsRunning] = useState([false, 'Play']);
  const [Logs, setLogs] = useState({ 1: null, 2: null });
  const winPlayer = useState(null)

  const instruction=useState(false)
  const about=useState(false)

  function NextWord(val) {
    setCurrentWord(val)
  }

  function PlayerLogs(id, val) {
    setLogs(prev => ({ ...prev, [id]: val }))
  }

  function winner(val) {
    winPlayer[1](val)
    setIsRunning([false, 'Play Again'])
    setActivePlayer(null)
  }

  useEffect(() => {
    if (isRunning[0]) {
      interval = setInterval(() => {
        setActivePlayer((prev) => prev == 1 ? 2 : 1)
        setCurrentWord(letters[Math.floor(Math.random() * 26)])
      }, 10100);
    }


    return () => clearInterval(interval);
  }, [isRunning, ActivePlayer, CurrentWord]);

  function play() {
    if (!isRunning[0]) {
      setIsRunning([true, 'Stop'])
      setActivePlayer(1)
      setCurrentWord(letters[Math.floor(Math.random() * 26)])
    }
    else {
      setIsRunning([false, 'Play'])
      clearInterval(interval)
      setActivePlayer(null)
    }
  }

  return (
    <>
      <header className=' bg-gray-950 p-4 flex justify-between items-center'>
        <h1 className='text-white text-4xl outfit-title'>Shiritori Delta</h1>
        <div className='flex gap-2'>
          <button onClick={()=>instruction[1](true)} className='text-white text-xl bg-amber-800 hover:bg-amber-700 py-1 px-2 rounded-sm'>Instructions</button>
          <button onClick={()=>about[1](true)} className='text-white text-xl bg-amber-800 hover:bg-amber-700 py-1 px-2 rounded-sm'>About</button>
        </div>
      </header>
      <main className={`${((isRunning[1]=='Play Again')||instruction[0]||about[0]) && 'blur-xs'}`}>
        <div className='mt-10 flex items-center justify-center gap-10 flex-col md:flex-row'>
          <GamePanel PlayerLogs={PlayerLogs} NextWord={NextWord} CurrentWord={CurrentWord} setActivePlayer={setActivePlayer} ActivePlayer={ActivePlayer} pid='1' winner={winner} />
          <GamePanel PlayerLogs={PlayerLogs} NextWord={NextWord} CurrentWord={CurrentWord} setActivePlayer={setActivePlayer} ActivePlayer={ActivePlayer} pid='2' winner={winner} />
        </div>
        <div className='mt-10 flex justify-center gap-4'>
          <button disabled={instruction[0] || about[0]} onClick={play} className='text-white text-2xl bg-green-800 py-1 px-6 cursor-pointer'>{isRunning[1]}</button>
        </div>
      </main>

      {isRunning[1] == 'Play Again' && <ResultModal winPlayer={winPlayer[0]} Logs={Logs} click={play} />}
      
      {instruction[0] && <InstructionModal close={instruction[1]}/>}
      {about[0] && <AboutModal close={about[1]}/>}
    </>
  )
}

export default App
