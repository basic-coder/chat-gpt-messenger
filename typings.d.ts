interface Message {
    text: input,
    createdAt: admin.firestore.Timestamp,
    user:{
        _id: string,
        name: string,
        image: string   
    }
}