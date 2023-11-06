import React from 'react'
import { useRef } from 'react';

const AddingItems = ({newItem,setNewItem,items,setItems}) => {

    const inputRef = useRef()

    const addItem = (item) =>{
        const id = items.length ? items[items.length-1].id+1 : 1;
        const addNewItem ={id, checked:false,item}
        const listItems = [...items, addNewItem]

        setItems(listItems)
            localStorage.setItem("todo_list",JSON.stringify(listItems))

    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if (!newItem) return;
        addItem (newItem)
        setNewItem("")

    }

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addItem'>Add Items</label>
            <input
                autoFocus
                ref={inputRef}
                id='addItem'
                type='text'
                required 
                value={newItem}
                onChange={(e)=> setNewItem(e.target.value)}
                
                />
            <button 
            type='submit' 
            aria-label='Add Item'
            onClick={()=> inputRef.current.focus()}
            >Submit</button>
        </form>
    )
}

export default AddingItems