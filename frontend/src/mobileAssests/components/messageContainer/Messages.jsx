import React, {useEffect,  useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from '../../../hooks/useGetMessages.js'
import MessageSkeleton from '../../../components/skeletons/MessageSkeleton.jsx'
import useListenMessages from '../../../hooks/useListenMessages.js'

const Messages = () => {
  const {loading, messages} = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()
  
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior : "smooth"})
    }, 100)

  },[messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
    {!loading && messages.length > 0 &&
    messages.map((message)=>(
      <div  key = {message._id} ref = {lastMessageRef}>
      
      <Message message = {message}  />
    
      </div>
    ))
    }
    {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key = {idx} />)}

    {!loading && messages.length === 0 &&
    <p className='text-center mt-80'>Send a message to start the conversation</p>
    }

    </div>
  )
}

export default Messages




