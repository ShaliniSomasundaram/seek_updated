import React, { useState } from 'react'
import axios from 'axios'

function Chk() {
    let [set,setState] = useState([])
    let submit=()=>{
        axios.get("http://localhost:3000/data")
        .then((e)=>{
            setState(e.data)
            console.log(set);
        })
    }
  return (
    <div>
        <button onSubmit={submit}>Submit</button>
    </div>
  )
}

export default Chk