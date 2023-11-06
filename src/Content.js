import React from 'react'
import { useState, useEffect } from 'react';
import AddingItems from './AddingItems';
import SearchItem from './SearchItem';

const Content = () => {
    const API_URL = "http://localhost:3500/items";
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [searchItem, setSearchIeam] = useState('')
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const responce = await fetch(API_URL);
                if (!responce.ok) throw Error("Data not received");
                const listItems = await responce.json();
                setItems(listItems);
            }
            catch (err) {
                setFetchError(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        setTimeout(() => {
            (async () => await fetchItems())()
        }, 2000)

    })


    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item)
        setItems(listItems)
    }

    const deleteText = (id) => {
        const listItems = items.filter((item) =>
            item.id !== id)
        setItems(listItems)
    }
    return (
        <main>
            <AddingItems
                newItem={newItem}
                setNewItem={setNewItem}
                items={items}
                setItems={setItems}
            />
            <SearchItem
                searchItem={searchItem}
                setSearchIeam={setSearchIeam}
            />
            {isLoading && <p>Contant is Loading...</p>}
            {fetchError && <p>{`Error: ${fetchError}`}</p>}
            {!isLoading && !fetchError &&
            
           <> {(items.length ?
                (<ul>
                    {items.filter(item => (item.item).toLowerCase().includes(searchItem.toLowerCase())).map((item) => (
                        <li className='item' key={item.id}>
                            <input
                                type='checkbox'
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked} />
                            <label style={(item.checked) ? { textDecorationLine: 'line-through' } : null}
                                onDoubleClick={() => handleCheck(item.id)}> {item.item}</label>
                            <button key={item.id} onClick={() => deleteText(item.id)}>Delete</button>

                        </li>
                    ))}
                </ul>)
                : (<p style={{ marginTop: '2rem' }}>Your List is Emty</p>)


            )}</>
                    }


        </main>
    )
}

export default Content