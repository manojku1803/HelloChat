'use client';
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css'

export default function  Page(){
  const {  sendMessage, messages } = useSocket();
  const [message, setMessage ]= useState("");
  return (
    <div>
      
      <div>
        <input onChange={(e)=>setMessage(e.target.value)} className={classes['chat-input']} placeholder="message" />
        <button onClick={(e)=>sendMessage(message)} className={classes['btn']}>Send</button>
      </div>

      <div>
        {messages.map((e)=>(
          <li>{e}</li>
        ))}
      </div>
    </div>
  )
}