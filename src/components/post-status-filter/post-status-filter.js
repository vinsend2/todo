import React, {useState} from 'react';
import { Button } from 'reactstrap';

export default function PostStatusFilter (props) {
  
  const buttons = [
    {name: `all`, label: `Все`},
    {name: `like`, label: `Понравилось`}
  ]
  const buttonsActiv = buttons.map(({name, label}) => {
    const active = props.filter === name;
    const clazz = active ? 'btn-info' : 'btn-outline-secondary'
     return (
      <button key={name}
       type="button" 
       className={`btn ${clazz}`}
       onClick={()=> props.onFilterSelect(name)}
       >{label}</button>
     )
  });
    return (
        <div className="btn-group">         
          {buttonsActiv}
        </div>
    )
}

