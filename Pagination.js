import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import "./page.css";
function Pagination() {
    const [todos,setTodos]=useState([]);
    const [todosPerPage,setTodosPerPage]=useState(10);
    const [currentPage,setCurrentPage]=useState(1);

    useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/todos")
      .then((res)=>setTodos(res.data));
    },[]);

    const numOfPages=Math.ceil(todos.length /todosPerPage);
    const pages=[...Array(numOfPages+1).keys()].slice(1);
    const indexOfLastTodo=currentPage*todosPerPage;
    const indexOfFirstTodo=indexOfLastTodo-todosPerPage;
    const visibleTodos=todos.slice(indexOfFirstTodo, indexOfLastTodo);
   
    const prevPageHandler=()=>{
      if(currentPage!==1) setCurrentPage(currentPage-1);
    }
    const nextPageHandler=()=>{
      if(currentPage!==numOfPages) setCurrentPage(currentPage+1);
     
    }
     
  return (
    <div className='container'>
         <h1>To DO List</h1>
         <div className="todoList">
        {visibleTodos.map(i=><p key={i.id}>{i.id+".  "}{ i.title}</p>)}
        <button onClick={()=>setTodosPerPage(todosPerPage+10)}>Load More</button>
        </div>
        <span className='pages' onClick={prevPageHandler}>Prev</span>
         {pages.map(page=><span 
                             key={page}
                             onClick={()=>setCurrentPage(page)}
                             className={`${currentPage===page ? "active" : "pages"}`}>
                              {page}
                          </span>
          )}
        <span className='pages' onClick={nextPageHandler}>Next</span>

    </div>
  )
}

export default Pagination