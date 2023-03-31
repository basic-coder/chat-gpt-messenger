'use client'

import { db } from '@/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import {toast} from 'react-hot-toast'
import ModelSelection from './ModelSelection'
import useSWR from 'swr';

type Props = {
    chatId: string
}

const ChatInput = ({chatId}:Props) => {
    const {data: session} = useSession()
    const [prompt, setPrompt] = useState('');

    //TODO useswr to get model
    const {data: model} = useSWR('model',{
        fallbackData: 'text-davinci-003'
      })

    const sendMessage = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(!prompt) return ;
        const input =prompt.trim();

        setPrompt('');

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user:{
                _id: session?.user?.email!,
                name: session?.user?.name!,
                image: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
                
            }
        }
         await addDoc(collection(db,"users",session?.user?.email!,'chats',chatId,'messages'),message)

         //toast notification (loading)
         const notification = toast.loading('ChatGPT is thinking...')

         await fetch('/api/askQuestion',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId,model, session
            })
         }).then((res)=>{
            // toast notification

            toast.success('ChatGPT has responded!',{
                id: notification,
            })
         })
    }
    
  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm '>
        <form className='p-5 space-x-5 flex' onSubmit={sendMessage}>
            <input disabled={!session} value={prompt} onChange={(e) => setPrompt(e.target.value)} className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300' type="text" placeholder='Type your message here...' />
            <button  disabled={!prompt || !session} type='submit' className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-400'>
                <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
            </button>
        </form>

        <div className='md:hidden'>
            <ModelSelection />
        </div>
    </div>
  )
}

export default ChatInput