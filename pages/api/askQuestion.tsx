// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '../../lib/queryApi'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from 'firebase-admin';
import { adminDb } from '@/firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt,chatId,model,session} = req.body

    if(!prompt){
        res.status(400).json({
            answer: "Please provide a prompt!"
        })
    }

    if(!chatId){
        res.status(400).json({
            answer: "Please provide a valid chatID!"
        })
    }

    // chat gpt query
    const response = await query(prompt,chatId,model)
    const message: Message = {
        text: response || 'Chat is unable to find answer',
        createdAt: firestore.Timestamp.now(),
        user:{
            _id: "Chat GPT",
            name:"Chat GPT",
            image: `https://links.papareact.com/89k`,
            
        }
    }

    await adminDb.collection('users').doc(session?.user?.email).collection('chats').doc(chatId).collection('messages').add(message)

  res.status(200).json({answer:  message.text})
}
