import React, { useState,useEffect } from 'react'
const Search = () => {
    const[search,setSearch]=useState("")
    const[searchResult,setSearchResult]=useState([])
    const[select,setSelect]=useState(-1)

    const changeHandler = (e)=>{
        setSearch(e.target.value);
    }
    const closeHandle=()=>{
        setSearch("")
        setSearchResult([])
    }
    const keyHandle =(e)=>{
        console.log(e.key)
        if(e.key==='ArrowUp' && select>0){
            setSelect(prev => prev-1)
        }
        else if(e.key==='ArrowDown' && select<=searchResult.length-1){
            setSelect(prev => prev+1)
        }
        else if (e.key==='Enter' && select>=0){
            window.open(searchResult[select].show.url)
        }
    }


    useEffect(() => {
      fetch(`http://api.tvmaze.com/search/shows?q=${search}`).then((res)=>{
        return res.json()
      }).then((data)=>{
        console.log(data);
        setSearchResult(data)
      })
    
      return () => {
        
      }
    }, [search])
    
  return (

    
    <div className='container'>
        <nav>
            <input type="text" onChange={changeHandler} placeholder='Search' value={search} onKeyDown={keyHandle}/>
            {
                search ==="" ? <button className='search'>Search </button> : <button className='close' onClick={closeHandle}>close</button>
            }
            
            
        </nav>
        <div className="result">
            {
                searchResult.map((data,index)=>{
                    return <a href={data.show.url} target='_blank' key={index} 
                    className={
                        select===index ? 'link active' : 'link'
                    }
                       
                    >{data.show.name}  </a>
                })
            }
        </div>
    </div>
  )
}

export default Search