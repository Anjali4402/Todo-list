import React, { useState } from 'react'

export default function TodoHeader({formShow, getStatusValue}) {
    // to get all values of task type. whether it is all, incomplete or complete
    const [statusVal , setStatusVal] = useState()
    const statusType = (e)=>{
        setStatusVal(e.target.value)
        getStatusValue(e.target.value)
    }
    return (
        <>  
            <h1 className= "text-4xl font-bold text-center text-[#040442] uppercase">todo list</h1>
            <div className='flex justify-between py-6'>
                <h2 onClick={()=>{formShow()}} className='text-xl font-semibold py-2 px-4 text-white bg-[darkred] rounded-lg cursor-pointer'>Add Task</h2>
                <select onChange={statusType} value={statusVal} className='text-xl font-medium bg-zinc-400 px-2  rounded-lg'>
                    <option value="all">All</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
        </>
    )
}
