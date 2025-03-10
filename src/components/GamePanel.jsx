import React, { useEffect, useRef, useState } from 'react'
import correctSound from '../assets/correct.mp3';
import incorrectSound from '../assets/error.mp3';
import winningSound from '../assets/winning.mp3';

function GamePanel(props) {
  var interval
  const panel = useRef()
  const inputBox = useRef()
  const loader = useRef()
  const msg = useRef()

  const [Player, setPlayer] = useState({ score: 0, correct:0, incorrect:0, logs: [] })
  const [Timer, setTimer] = useState(null)
  const [InputVal, setInputVal] = useState('')
  const [stack, setStack]=useState([])
  

  let fullword=props.CurrentWord+InputVal
  let score=Player.score
  const [result, setResult]=useState([null,fullword])
  
  useEffect(() => {

    if (props.ActivePlayer == null) {
      setPlayer({ score: 0, correct:0, incorrect:0, logs: [] })
      setInputVal('')
      setTimer(null)
      panel.current.classList.remove('active')
      loader.current.classList.remove('animate')
    }
    else if (props.ActivePlayer == props.pid) {
      setTimer(10)

      panel.current.classList.add('active')
      loader.current.classList.add('animate')
      inputBox.current.focus()
      interval = setInterval(() => {
        setTimer(prev => --prev)
      }, 1000)
    }
    else {
      setInputVal('')
      setTimer(null)
      panel.current.classList.remove('active')
      loader.current.classList.remove('animate')
    }


    return () => {
      clearInterval(interval)
      props.PlayerLogs(props.pid,Player)
    }
  }, [props.ActivePlayer])

  function checkWord(event) {
    msg.current.classList.remove('scale-in-center')
    if (event.key == 'Enter') {
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + fullword)
        .then(res => {         
          if (res.ok && !stack.includes(fullword)) {
            playSound(correctSound)
            score+=fullword.length
            setResult([true,fullword])

            panel.current.classList.add('blink-2')
            setTimeout(()=>panel.current.classList.remove('blink-2'),500)
            setPlayer(prev => {
              prev.correct+=1
              prev.score =score
              prev.logs.push({ word: fullword, status: 1 })
              return prev
            });
            
            if(score>=10){
              props.winner(props.pid)
              clearInterval(interval)
              loader.current.classList.remove('animate')
              playSound(winningSound)
              return
              }

            props.setActivePlayer(props.ActivePlayer == 1 ? 2 : 1)
            props.NextWord(fullword.at(-1))
            setStack(prev=>[...prev,fullword])
          }
          else {
            playSound(incorrectSound)
            score-=fullword.length
            setResult([false,fullword])
            panel.current.classList.add('shake-horizontal')
            setTimeout(()=>panel.current.classList.remove('shake-horizontal'),500)
            setPlayer(prev => {
              prev.incorrect+=1
              prev.score = score
              prev.logs.push({ word: fullword, status: 0 })
              return prev
            })
          }

          msg.current.classList.add('scale-in-center')

        })
        .catch(error => console.log(error));
    }

  }

  function playSound(soundFile){
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <div className='relative rounded-lg bg-[#151617] flex flex-col w-85 p-5 gap-2 items-center' ref={panel}>
      <h1 className='text-2xl font-bold text-white'>Player {props.pid}</h1>
      <div className='flex justify-between w-full relative overflow-hidden'>
        <p className='text-white text-4xl font-semibold z-1'>{Player.score}</p>
        <p className='text-white text-4xl font-semibold z-1'>{Timer}</p>
        <div className="loader" ref={loader}></div>
      </div>
      <input disabled={props.ActivePlayer != props.pid} type="text" value={props.ActivePlayer==props.pid ? fullword: ''} onChange={(e) => setInputVal(e.target.value.slice(1))} className='bg-white w-full h-10 px-2 font-semibold text-2xl' onKeyDown={checkWord} ref={inputBox} />
      <div className='msgbox' ref={msg}>
        {result[0]?'+':'-'}{result[1].length}
      </div>
      <div className='logbox w-full overflow-auto h-45'>
        <ul>
          {Player.logs.map((v, i) => <li key={i} className={v.status?'correct':'incorrect'}>{v.word}{v.status == 0 && <img src="/cross.png" alt="cross_icon" />}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default GamePanel