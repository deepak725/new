import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import { IoIosAdd } from "react-icons/io";
import './Notes.css'
import {VscSymbolColor} from "react-icons/vsc";
function Notes ({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [user,setUser] = useState({
    name:"deepak",
    email:"mscit@gmail.com"  
  });
  const [tag,setTag] = useState([
      "work","study"
  ]);
  const [color,setBgcolor] = useState("#ffc812");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    apiGet();
 },[]); 



  function handleChange(e) {
    const { name, value } = e.target;
    
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded(true);
  }

  const postData = async(e) =>{
      e.preventDefault();

      const res = await fetch("http://localhost:3001/notes",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          title:note.title,content:note.content,name:user.name,email:user.email,tag:tag,
          color:color
        })
      })
      
      const res2 = await res.json();
      console.log(res2);

      submitButton();
      
      
  }
  function submitButton(event) {
    //  fetch("https://retoolapi.dev/UPF9Vy/data")
    // .then((res) => res.json())
    // .then((data) => {
    //  // console.log(data);
    //   setNotes(data);
    // //  console.log(notes);
      
    // });
   
    setNote({
      title: "",
      content: "",
    });
    setBgcolor("white");
    setTag([]);
    setExpanded(false);
    // console.log(notes);
   
    apiGet();
  }
  const apiGet = () => {
    fetch("http://localhost:3001/notes"
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setNotes(json);
        console.log(json._id);
      });


    
  };

  return (
    <div className="Notes">
      <form>
      <input
            
            type="text"
            placeholder="Search"
            name="title"
            
           
          />
      </form>
      <form>
      
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
         {isExpanded && ( <input type={"color"} style={{width:"10%"}} defaultValue={color} onChange={(e)=>{

              console.log(e.target.value);
              setBgcolor(e.target.value);
         }} />)}
        </p>
        <button onClick={postData}>
          <IoIosAdd size={35} />
        </button>
       
      </form>
      <div className="notes-item">
        {notes.map(( note, index,_id) => (
        <Note
          key={index}
          title={note.note.title}
          content={note.note.content}
           id={note._id}
          func = {apiGet}
          color ={note.note.color}
        />
      ))}
      </div>
    </div>
  );
}

export default Notes;