import React, { Component } from 'react'

  class Search extends Component {

    state = {
        text : '',

    };
    static propTypes = {
        // searchUsers : this.PropTypes.func.isRequired,
        // clearUsers : this. PropTypes.func.isRequired
        //showClear:PropTypes.bool.isRequired,
    };  

    onSubmit = e => {
        e.preventDefault();
        if(this.state.text=== '') {
         this.props.alert('Please enter the name of github User','danger')
        } else 
        {
        this.props.searchUsers(this.state.text)
        this.setState({text : '' })
        }
    }   
     onChange = (e) =>  this.setState({[e.target.name]: e.target.value}) 

    render() {
        const {showClear , clearUsers} =this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'> 
                <input type="text" name='text' placeholder='Enter the name of github user..' value={this.state.text} onChange={this.onChange}/>
                <input type="submit" value='Search' className='btn btn-dark btn-block'/>
                </form>
                {showClear && <button className='btn btn-light btn-block ' onClick={clearUsers}>Clear</button> }
                
            </div>
        )
    }
}


export default Search
