import React, { useState, useEffect } from 'react'
import "./Todo.css"

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState([]); //The data of local storage will be stored here
    //Array created of use state which will store the added items
    // const [id, setId] = useState(""); //The data of local storage will be stored here

  const [isEditItem, setIsEditItem] = useState("");
  const [selected, setSelected] = useState(false);
  const [imp, setImp] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
    const addItems = async() => {
        if(!inputdata) //no input is given
        {
            alert("plz enter a value...!")
        }
        else if (inputdata && toggleButton) {
            // setItems(
            //   items.map((curElem) => {
            //     if (curElem.id === isEditItem) {
            //       return { ...curElem, name: inputdata };
            //     }
            //     return curElem;
            //   })
            // );
            const res = await fetch("http://localhost:3001/todo",{
                method:"PUT",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({

                  title:inputdata,
                  id:isEditItem

                })
              })

              const res2 = await res.json();
      console.log(res2);
      
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
            getTodo();
          } 
        else
        {
            
            const res = await fetch("http://localhost:3001/todo",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  title:inputdata,
                  name:"deepak",
                  email:"dadlani",
                  tag:["general"],
                  selected:selected,
                  important:imp
        
                })
              })

              const res2 = await res.json();
      console.log(res2);
      
            setInputData("");
            // const myNewInputData = {
            //     id : new Date().getTime().toString(),
            //     //This will give time as an ID to each inputed value and time is always different hence no 2 element will have same ID.
            //     //To delete an element we need an id
            //     name : inputdata,
            //     //This will store the value of data inserted
            // }
            // setItems([...items, myNewInputData]);
            // //baki ki item value as it is and new inputdata will be addes
            // setInputData("");
            //change back to original empty state after adding any value
        }
    }

    //edit the items
  const editItem = (index,title) => {
      console.log(index);
      console.log(title);
    // const item_todo_edited = items.find((curElem) => {
    //   return curElem.id === index;
    // });
    setInputData(title);
    setIsEditItem(index);

    setToggleButton(true);
  };
    //How tod delete items
    const deleteItems = (index) => {
    //     //From index we will get user ne konse item ko click kiya and the wo pass hoga niche deleteItems me 
    // const updatedItem = items.filter((curElem)=> {
    // //Loop implemented usinf filter. It is ame as map method it will just filter out the stuff 
    // return curElem.id !== index; //Jo item choose ki uske alawa sare items return karega.
    // })
    console.log(index);    
    fetch("http://localhost:3001/todo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: index
    })
  }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // setNotes(json);
    });
//   console.log(_id);
    getTodo()
    }

    const removeAll = () => {
        fetch("http://localhost:3001/todoclearall", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: "dadlani"
            })
          }
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              // setNotes(json);
            });
        //   console.log(_id);
            getTodo()
    }

    const getTodo = () =>{

        fetch("http://localhost:3001/todo"
        )
          .then((response) => response.json())
          .then((json) => {
            // console.log(json);
            setItems(json);
            console.log(json._id);
          });

    }
    //Adding Local Storage
    useEffect(()=> {
        // localStorage.setItem("mytodolist", JSON.stringify(items))
        // //Local storage works as a key value pair and we can only assign string to it.
        // //Mytodolist is the key name
        // //items is in aary and as we can only pass string so we will use json.stringify
        getTodo()
    },[])
//whenever items value will change then only useeffect will work and data will be added on local storage 
    return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <h1>📝</h1>
            <div className='addItems'>
                <input type="text" placeholder='✍ Add Item' className='form-control'
                value={inputdata}
                onChange={(event)=>setInputData(event.target.value)}
                />
                <i className="fa fa-plus add-btn" onClick={() => {addItems();getTodo()}}></i>
                {/* {/taken from font awesome/} */}
            </div>
            {/* {/Show our items/} */}
            <div className='showItems'>
                {items.map((curElem,index)=> {
                    return (
                       
                        <div className='eachItem' key={index}>
                            <input type={"checkbox"} style={{width:"1.15em",height:"1.15em"}} />
                            <h3>{curElem.todo.title}</h3>
                        <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem._id,curElem.todo.title)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(curElem._id)}></i>
                  </div>
                    </div>
                    );
                })}
            
            </div>
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                    {/*data-sm-link-text => to change the text when hovered */}
                    <span>Check List</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
  
}
export default Todo