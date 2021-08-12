import React, {Component} from 'react';

import './add-item-form.css';

export default class AddItemFrom extends Component {

    state = {
        label : ''
    };

    onLabelChange = (e) => {
        this.setState({
            label : e.target.value
        });
    }; 

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState( {
            label : ''
        });
    };

    render () {   
        return (
           <form className = 'add-item-form d-flex'
                    onSubmit = {this.onSubmit}>

               <input type = 'text' 
               className='form-control'
               placeholder= 'What needs to done'
               onChange = {this.onLabelChange}
               value = {this.state.label}/>

               <button className = 'btn btn-outline-secondary'>
                            Add new element
                </button>
           </form>
        )
    }
}