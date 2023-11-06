import React from 'react'

const SearchItem = ({searchItem,setSearchIeam}) => {
  return (
    <form className='searchForm'>
        <label htmlFor='searchItem'>Search Item</label>
        <input
            id='searchItem'
            type='text'
            value={searchItem}
            onChange={(e)=> setSearchIeam(e.target.value)}
        />
    </form>
    
  )
}

export default SearchItem