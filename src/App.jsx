

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'

function App() {
  //creating a state to edit or add a todo
  const [todo, settodo] = useState("")
  //creating a state array to store our todos
  const [todos, settodos] = useState([])
  //creating a state fpr showing finished tasks only
  const [showFinished, setshowFinished] = useState(true)
  //useEffect (as we need to render our todos from local storage)
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring != null) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  //asyns behaviour of useState gets the localstorage malfunction
 useEffect(() => {
 savetols()
 }, [todos])
 
  //Now creating function to handle different events like add/edit/delete
  //first we need to handle change in our input tag
  const handleChange = (e) => {
    settodo(e.target.value)

  }
  const handleSave = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetols()
  }
  //handling change in the checkbox
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    //if let newtodos = todos , it will not rerenders as this gives the same reference and a new array is not created
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos);
    savetols()
  }
  const handleDelete = (e, id) => {
    //using filter method
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    console.log(newtodos)
    settodos(newtodos)
    savetols()
  }
  //in this we will create and illusion of updation
  const handleEdit = (e, id) => {
    //first we will display our todo in input tag
    let t = todos.filter(item => {
      return item.id === id;
    })
    settodo(t[0].todo)
    //then we will delete it and using save a new todo gets displayed
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    savetols()
  }
  // No we need to save our todos as it gets lost after a reload
  //we are using localstorage for this
  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("update")
    // we will run this after every add(save), edit, delete, checkbox
  }
//for finished tasks 
const Togglefinished =() => {
  setshowFinished( !showFinished)
}
// const handleKeyPress = (event) => {
//   if (event.key === 'Enter') {
//     handleSave();
//   }
// };

  return (
    <>
      <Navbar />
      <div className=" md:container bg-[#F8E7F6] rounded-xl my-5 mx-2 md:mx-auto min-h-[80vh] p-3">
        <div className="addtodo">
          <h2 className='font-bold text-lg'>Add a New Todo</h2>
          <input onChange={handleChange} value={todo} className='w-1/2' type="text" />
          <button onClick={handleSave} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-red-500 rounded-md p-1 mx-3 cursor-pointer text-white text-sm font-bold'>Save</button>
        </div>
        <input className='cursor-pointer' onChange={Togglefinished} type="checkbox" name="" checked={showFinished} id="" /> Show Finished
        <h2 className='font-bold text-lg'>Your Todos</h2>
        {todos.length === 0 && <div>No Todos to display</div>}
        <div className="todos">
          {todos.map(item => {
            return (showFinished || !item.iscompleted) && <div key={item.id} className="todo bg-[#ecc8e6] rounded-xl p-1 flex w-1/2 my-3 justify-between">
              <div className='flex gap-3'><input onChange={handleCheckbox} className='cursor-pointer' type="checkbox" name={item.id} id="" checked={item.iscompleted} />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div></div>
              <div className="buttons flex h-full items-center">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-[#F5F5F5] hover:bg-[#DAD2FF] rounded-xl px-2 py-1 mx-3 text-black text-sm font-bold'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-[#F5F5F5] hover:bg-[#DAD2FF] rounded-xl p-1 mx-3 text-black text-sm font-bold'>Delete</button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
