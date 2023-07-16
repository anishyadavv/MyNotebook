
import React ,{ useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
    const noteinitial =[
        {
          "_id": "64b0346c94eb9a9849ee2a2f",
          "user": "64b0273a1cdff13f8cbbbc50",
          "title": "my title",
          "description": "please drink milk at night",
          "tag": "personal",
          "date": "2023-07-13T17:29:16.248Z",
          "__v": 0
        },
        {
          "_id": "64b3929cd8296ffb9596fefe",
          "user": "64b0273a1cdff13f8cbbbc50",
          "title": "hello",
          "description": "please help me",
          "tag": "personal",
          "date": "2023-07-16T06:47:56.939Z",
          "__v": 0
        },
        {
          "_id": "64b392b4d8296ffb9596ff00",
          "user": "64b0273a1cdff13f8cbbbc50",
          "title": "Pernal notes",
          "description": "spelling of personal is wrong",
          "tag": "personal",
          "date": "2023-07-16T06:48:20.909Z",
          "__v": 0
        },{
            "_id": "64b0346c94eb9a9849ee2a2f",
            "user": "64b0273a1cdff13f8cbbbc50",
            "title": "my title",
            "description": "please drink milk at night",
            "tag": "personal",
            "date": "2023-07-13T17:29:16.248Z",
            "__v": 0
          },
          {
            "_id": "64b3929cd8296ffb9596fefe",
            "user": "64b0273a1cdff13f8cbbbc50",
            "title": "hello",
            "description": "please help me",
            "tag": "personal",
            "date": "2023-07-16T06:47:56.939Z",
            "__v": 0
          },
          {
            "_id": "64b392b4d8296ffb9596ff00",
            "user": "64b0273a1cdff13f8cbbbc50",
            "title": "Pernal notes",
            "description": "spelling of personal is wrong",
            "tag": "personal",
            "date": "2023-07-16T06:48:20.909Z",
            "__v": 0
          }
      ]

    const [notes,setNotes] = useState(noteinitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;