import React from 'react'

function AboutModal(props) {
  return (
    <div className='about'>
        <img src="/cross.png" alt="cross" onClick={()=>props.close(false)}/>
        <h1>Shiritori Delta</h1>
        <p>The Game is inspired from japanese Shiritori</p>
        <p>Author: Fahim Shahriyaar</p>
        <p>Email: shahriyaar.thunder@gmail.com</p>
    </div>
  )
}

export default AboutModal