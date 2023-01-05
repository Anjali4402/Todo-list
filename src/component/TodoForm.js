import React, { useState } from 'react'

export default function TodoForm({formDisplay,formHide, addInTaskList, inputTask , setInputTask,editCondition}) {
    //  this function run when we write title or add status.
    const addDetals = (e)=>{
        const {name, value} = e.target;
        setInputTask((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }
    // this function run when add our task ( click on 'Add task')
    const addBtn = (e)=>{
        e.preventDefault();
        addInTaskList(inputTask)
    }
    // this funciton run when we cancel task ( click on 'cancel')
    const cancelBtn = (e)=>{
        e.preventDefault();
        formHide()
    }
    return (
        <>
            <div className={`${formDisplay} absolute w-full`}> 
                    <div  className='text-end'><span onClick={()=>{formHide()}} className='text-2xl cursor-pointer bg-[#c6c6fa] py-2 px-3 rounded-lg'>&#x2716;</span></div>
                    <form className='flex flex-col bg-[#c6c6fa] p-8 my-4 rounded-xl text-black'>
                        <h2 className='font-semibold py-2 text-xl'>Add TODO</h2>
                        <label className='py-1 text-lg'  htmlFor="title">Title</label>
                        <input onChange={addDetals} className='p-2 text-black my-1 text-lg' type="text" id='title' name='title' value={inputTask.title} />
                        <label className='py-1 text-lg' htmlFor="status">Status</label>
                        <select onChange={addDetals} className='p-2 text-black my-1 text-lg' name="status" id="status" value={inputTask.status}>
                            <option  value="incomplete" >Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                        <div className='pt-6'>
                            <button onClick={addBtn} className='text-xl font-semibold py-2 px-4 text-white bg-[darkred] rounded-lg cursor-pointer mr-4'>{
                                editCondition? <span>Update task</span> : <span>Add task</span>
                            }</button>
                            <button onClick={cancelBtn} className='bg-[lightslategray] px-4 py-2 rounded-lg cursor-pointer text-xl text-black font-medium ml-4'>Cancel</button>
                        </div>
                    </form>
            </div>
        </>
    )
}
