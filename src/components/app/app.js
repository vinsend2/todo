import React, {useState} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css'

import styled from 'styled-components';

const AppBlock = styled.div`
        margin: 0 auto;
        max-width: 800px;
    `



export default function App () {

    const [data, setData] = useState( [
        {label: 'Going to learn React', important: true, like: false, id: 1},
        {label: 'That is so good', important: false, like: false, id: 2},
        {label: 'I need a breake...', important: false, like: false, id: 3}
       
    ]);
    const [term, setTerm] = useState (``);

    const [maxId, setMaxId] = useState(4);

    const [filter, setFilter] = useState(`all`);


        function filterPost (items, filter) {
            if (filter === `like`) {
                return items.filter(item => item.like)
            }
            else {
                return items
            }
        }    
   
        function deleteItem (id) {
            setData((data) => {
                const index = data.findIndex(elem => elem.id === id)
                const before = data.slice(0, index);
                const after = data.slice(index + 1);

                const newArr = [...before, ...after];                
               
                return  newArr                                                  
            });           
        }

        function searchPosts (items, term) {
            if (term.length === 0) {
                return items
            }

            return items.filter((item) => {
                return item.label.indexOf(term) > -1
            });
        }

        function onUpdateSearch2 (term) {
            setTerm(term);
        }
     
        function addItem (body) {
            const newItem = {
                label: body,
                important: false,
                id: maxId + 1
            }
            setMaxId(maxId + 1);
            console.log(maxId);
            setData((data) => {
                const newArr = [...data, newItem];
                return newArr
            });
        }

        function onFilterSelect (filter) {
            setFilter(filter);
        }
        

        
        function onToggleImportant (id) {
            setData((data) => {
                const index = data.findIndex(elem => elem.id === id);
                const old = data[index];
                const newItem = {...old, important: !old.important};
                const before = data.slice(0, index);
                const after = data.slice(index + 1);

                const newArr = [...before, newItem, ...after];  

                return newArr
            });
        }
        

         function onToggleLike (id) {
            setData((data) => {
                const index = data.findIndex(elem => elem.id === id);
                const old = data[index];
                const newItem = {...old, like: !old.like};
                const before = data.slice(0, index);
                const after = data.slice(index + 1);

                const newArr = [...before, newItem, ...after];  

                return newArr
            });
        }
        
        const liked = data.filter(item => item.like).length;

        
        const allPosts = data.length;

        const visiblePosts = filterPost((searchPosts(data, term)), filter);
        
        return (
         <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={onUpdateSearch2}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts}
                onDelete={deleteItem}
                onToggleImportant={onToggleImportant}
                onToggleLike={onToggleLike} />
                <PostAddForm
                onAdd={addItem}/>
         </AppBlock>
        ) 
    }
    


