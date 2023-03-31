"use client"

import { db } from "../firebase";
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "@firebase/firestore";
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

const Sidebar = () => {

  const { data: session } = useSession();
  
  const [chats, loading, error] = useCollection(session && query(collection(db, "users", session?.user?.email!, 'chats'), orderBy('createdAt','asc')))
  
  if (loading) return <h1>loading</h1> 
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <>

          <NewChat />

          <div className="hidden sm:inline">
              <ModelSelection />
          </div>

          {/* Map through chat rows */}
          <div className="flex flex-col space-y-2 my-2">
            {
              loading && (
                <div className="animate-pulse texr-center text-white">
                  <p>Loading Chats...</p>
                </div>
              )
            }
          {chats?.docs.map(chat => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
          </div>
          </>
        </div>
      </div>
      {session && (
        <img onClick={() => signOut()} src={session.user?.image!} alt="profile" className="h-12 w-12 rounded-full cursor-pointer mb-2 mx-auto hover:opacity-50" />
      )}
    </div>
  )
}

export default Sidebar