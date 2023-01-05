import React, { useEffect, useState } from 'react'
import TodoHeader from './component/TodoHeader'
import TodoForm from './component/TodoForm'
import ToDoList from './component/ToDoList'

//  to  get the data from LocalStorage
const getLocalItems = ()=>{
  let lists = localStorage.getItem('lists')
  if(lists){
    return JSON.parse(localStorage.getItem('lists'));
  }else{
    return [];
  }
}
export default function App() {
  // get input task form TodoForm.js
  const [inputTask, setInputTask] = useState({
    title : '',
    status: 'incomplete'
  })  

  // TodoForm hide and show
  const [formDisplay, setFormDispaly] = useState('hidden')  
  // Make TaskList | collection of all task
  const [taskList, setTaskList] =  useState(getLocalItems())
  
  // selected TaskList | The collection of tasks to display.
  const [selectedTaskList, setSelectedTaskList] = useState([])

  // current status type value (all/incomplete/complete)
  const [statusValue ,setStatusValue] = useState()

  // form in editMode or not
  const [editCondition , setEditCondition] = useState(false)

  // The value that is selected for editing
  const [selectedEditVal ,setSelectedEditVal] = useState()

  // The collection of task whose status value is incomplete
  const [incompleteTask, setIncompleteTask] = useState([])

  // The collection of task whose status value is complete.
  const [completeTask , setCompleteTask]= useState([])


  // add task in tasklist
  const addInTaskList =(task)=>{
    // get current time and date.
    const todayDate = new Date().toLocaleDateString();
    const todaytime = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    const timeNow = `${todaytime},${todayDate}`
    
    //  when title is emplty.
    if(!task.title){
      alert('please fill data')
    }
    // when edit the task
    else if(task.title && editCondition){
    setTaskList(
      taskList.map((val)=>{
        if(val.id === selectedEditVal){
          return {
            ...val, task:{...val.task, title:task.title,status:task.status}
          }
        }
        return val
      })
    )
    setEditCondition(false)
    }
    // when we add task.
    else{
      setTaskList((oldVal)=>{
        const allInputdata = {id: new Date().getTime().toString(), currentTime: timeNow , task}
        return(
          [...oldVal,allInputdata]
        )
      })
    }
    setFormDispaly('hidden')
    setInputTask((oldval)=>{
      return{
              ...oldval,
              title:'',
              status:'incomplete'
      }      
    })
  }

  // useEffect run when we change anything in tasklist.
  useEffect(()=>{
    // add task in completTask and inCompleTask
    const compVal = taskList.filter((val)=>{
      return val.task.status === 'complete'
    })
    setCompleteTask(compVal)

    const incompVal = taskList.filter((val)=>{
      return val.task.status === 'incomplete'
    })
    setIncompleteTask(incompVal)


    // set the value of selectedTaskList 
    if(statusValue === 'incomplete'){
      setSelectedTaskList(incompVal)
    }
    else if(statusValue === 'complete'){
      setSelectedTaskList(compVal)
    }
    else{
      setSelectedTaskList(taskList)
    }

  },[taskList])


  //  useEffect run when we change statusValue.
  useEffect(()=>{
    if(statusValue === 'incomplete'){
      setSelectedTaskList(incompleteTask)
    }
    else if(statusValue === 'complete'){
      setSelectedTaskList(completeTask)
    }
    else{
      setSelectedTaskList(taskList)
    }
  },[statusValue])

  // when we change status Value
  const getStatusValue =(e)=>{
    setStatusValue(e)
  }

  // when we delete some task
  const deleteTask = (id)=>{
    setTaskList(
        taskList.filter((val)=>{
        return(
            !(val.id === id)
          )
        })
      )
    }

  // when we edit task
  const editTask =(id)=>{
    setFormDispaly('show')
    setEditCondition(true)
    let editValue = selectedTaskList.find((val)=>{
        return(val.id === id)
    })
    setSelectedEditVal(id)
    setInputTask({title:editValue.task.title, status:editValue.task.status})
  }


  // add Data to localStorage
  useEffect(()=>{
    localStorage.setItem("lists",JSON.stringify(taskList))
  },[taskList])

  // when we change status value opposite.
  const changeStatusType = (ids)=>{
    setTaskList(
      taskList.map((val)=>{
        if(val.id === ids){
          const oppositeValue = val.task.status === 'complete'?'incomplete':'complete';
          return {
            ...val, task:{...val.task, title:val.task.title,status:oppositeValue}
          }
        }
        return val
      })
    )
  }


  return (
      <div className='bg-[lightslategray] min-h-screen'>
        <div className='relative  py-10 max-w-4xl mx-auto w-11/12'>
              <TodoHeader 
                  formShow = {()=>{setFormDispaly('show')}}
                  getStatusValue = {getStatusValue}
              />
              <TodoForm 
                  formDisplay = {formDisplay}
                  formHide={()=>{setFormDispaly('hidden')}}
                  addInTaskList = {addInTaskList}
                  inputTask = {inputTask}
                  setInputTask = {setInputTask}
                  editCondition = {editCondition}
              />
              <div className="bg-[#c6c6fa] p-2 min-[500px]:p-4 rounded-xl">
                {
                  selectedTaskList.length === 0 ? 
                  <div className='text-center py-6'>
                    <span className='bg-[lightslategray] px-4 py-2 text-xl rounded-lg font-medium'>No Todos</span>
                  </div> 
                  :
                  selectedTaskList.map((val)=>{
                    return <ToDoList 
                                key={val.id} 
                                giveValue={val}
                                deleteTask = {deleteTask}
                                editTask = {editTask}
                                changeStatusType = {changeStatusType}
                                />
                  })
                }
              </div>
        </div>
      </div>
  )
}


