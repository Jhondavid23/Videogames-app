import React from 'react'
import style from './videogameForm.module.css'


function SelectList({genres, handleChange, name, onBlur}) {
  return (
    <div>
        <select name={name} id="" onChange={handleChange} onBlur={onBlur} className={style.select}>
            <option value="">Genres</option>
            {genres && genres.map((e)=>{
                return <option name={e.name} value={e.name} key={e.name}>{e.name}</option>
            })}
        </select>
    </div>
  )
}

export default SelectList