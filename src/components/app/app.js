import React, { Component } from 'react';

import AppHeader from '../app-header';
import ToDoList from '../todo-list';
import SearchBar from '../search-bar';
import ItemStatusFilter from '../item-status-filter';
import AddItemFrom from  '../add-item-form/';
import './app.css';


export default class App extends Component {

    maxId = 100;
    state = {
      todolist : [
          this.createTodoItem('Drink Coffe'),
          this.createTodoItem('Smoke ciggarette'),
          this.createTodoItem('Do smth')
      ],
      term : '',
      filter : 'all'
    };
    

    onDelete = (id) => {
      this.setState(({todolist}) => {
        const idx = todolist.findIndex((el) => el.id === id);

        const newArr = [
          ...todolist.slice(0, idx),
          ...todolist.slice(idx + 1)];
          
        return {
          todolist : newArr
          };
      });
    }; 

    createTodoItem(label) {
      return {
        label,
        important : false,
        done : false,
        id : this.maxId++
      }
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        
        this.setState(({todolist}) => {
          const newArr = [...todolist, newItem];
          return {
            todolist : newArr
          };
      });
 
    };
  
    onToggleProp = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem =arr[idx];
        const newItem = {...oldItem, [propName] : !oldItem.propName};

        return [
          ...arr.slice(0, idx),
          newItem,
          ...arr.slice(idx + 1)
        ];
   

    };

    onToggleImportant = (id) => {
      this.setState (({todolist})=> {
        return {
          todolist : this.onToggleProp(todolist, id, 'important')}
      });
    };

    onToggleDone = (id) => {
      this.setState (({todolist})=> {
        return  {
          todolist : this.onToggleProp(todolist, id, 'done')}
      });
    };


    onSearchChange = (term) => {
      this.setState({term});
    };


    search(items, term) {
      if (term.length === 0) {
        return items;
      }

     return items.filter((item) =>{
        return item.label.indexOf(term) > -1;
      });
    };

    onFilterChange = (filter) => {
      this.setState({filter});
    };

    filter (items, filter) {
      switch (filter) {
        case 'all':
          return items
          case 'active':
            return  items.filter((item) => !item.done)
          case 'done' :
            return  items.filter((item) =>  item.done)
        default: 
              return (items)
      }
    };

  render () {

 

    const {todolist, term, filter} = this.state;
    const visibleItems = this.filter(this.search(todolist, term), filter);
    const doneCounter = todolist
                         .filter((el) => el.done).length;
    const todoCount = todolist.length - doneCounter;
    return (
      <div className= 'app'> 
        <AppHeader toDo = {todoCount} done = {doneCounter} />
        <SearchBar  onSearchChange = {this.onSearchChange}/> 
        <ItemStatusFilter 
        filter = {filter}
        onFilterChange = {this.onFilterChange}  />
        <ToDoList todos = {visibleItems} 
        onDelete = {this.onDelete}
        onToggleImportant = {this.onToggleImportant}
        onToggleDone = {this.onToggleDone}/>
        <AddItemFrom 
        addItem ={this.addItem} />
      </div>
      );
  };

}