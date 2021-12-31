import React,{Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react';
import Navbar from './components/layout/Navbar';
import User from './components/users/Users';
import  Search from './components/users/Search';
import  Alert  from './components/layout/Alert';
import './App.css';
import axios from 'axios';
import Users from './components/users/Users';

class App extends Component {
  state =  {
    users : [],
    loading :false,
    alert: null
  }
  // If we dont want to show first time the users we can coment from async to false
  async componentDidMount() {
    this.setState({loading: true});

   const res = await axios
    .get(`https://api.github.com/users?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` 
    );

    this.setState({users: res.data, loading : false})
  }

  //Search GutHub Users
  searchUsers = async text => {   
    const res = await axios
    .get(`https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` 
    );

    this.setState({users: res.data.items, loading : false})

  }
  //Clear User from state
  clearUsers =() => this.setState({users:  [],   loading: false});
  
  //Set Alert
  setAlert=(msg, type)=> {
    this.setState({alert: {msg:msg ,type:type}})
    setTimeout(()=> this.setState({alert: null }), 3000)

  }
  render() {

    const {users, loading} =this.state;


  return (
    <div className='App'>
        <Navbar /> 
        <div className='container'>
          <Alert alert={this.state.alert}/>
          < Search searchUsers={this.searchUsers} clearUsers ={this.clearUsers} showClear={users.length > 0 ? true : false} alert={this.setAlert}/>
          {/* setAlert={this.setAlert} */}
          <Users loading={loading} users={users}/></div>
        
    </div>
      
  );
}
}

export default App;
