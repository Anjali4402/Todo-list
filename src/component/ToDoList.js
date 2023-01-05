import React from 'react'

export default function ToDoList({giveValue, deleteTask, editTask,changeStatusType}) {
    return (
        <div className="rounded-xl bg-[midnightblue] p-2 min-[500px]:p-4 flex items-center my-4 text-white">
            {
                giveValue.task.status === 'complete'?
                    <div onClick={()=>changeStatusType(giveValue.id)} className='bg-[darkred] flex justify-center text-3xl border rounded-lg w-10 h-10 mr-3'>&#x2714;</div>
                    :
                    <div onClick={()=>changeStatusType(giveValue.id)} className='bg-[lightslategray] flex justify-center text-3xl rounded-lg w-10 h-10 mr-3 '></div> 
            }
            <div className='grow'>
                <h2 className='text-lg min-[500px]:text-xl font-bold'>
                    {
                        giveValue.task.status === 'complete'?
                        <span className='line-through'>{giveValue.task.title}</span>:
                        <span>{giveValue.task.title}</span>
                    }
                </h2>
                <p className='text-sm min-[500px]:text-lg'>{giveValue.currentTime}</p>
            </div>
            <div onClick={()=>{deleteTask(giveValue.id)}}  className='h-10 w-10 text-3xl flex items-center justify-center bg-[lightslategray] text-black rounded-lg'>&#x2612;</div>
            <div onClick={()=>{editTask(giveValue.id)}} className='h-10 w-10 ml-3 text-xl flex  justify-center bg-[lightslategray] rounded-lg'>&#x270D;</div>
        </div>
    )
}
