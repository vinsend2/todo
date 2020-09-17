import React, { useState } from 'react';

export default function SearchPanel ({onUpdateSearch}) {

    const [term, setTerm] = useState(``);

    const onUpdateSearch2 = (e) => {      
        setTerm(e.target.value);      
        onUpdateSearch(term);
        console.log(term);
    }

   
    return (
        <input
            className="form-control search-input"
            type="text"
            placeholder="Поиск по записям"
            onChange={onUpdateSearch2}
        />
    )
}

