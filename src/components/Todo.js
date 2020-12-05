import React from 'react'
import ReactDOM from 'react-dom'
import { getCurrentUser } from '../utils/auth'
import { send_command } from '../utils/RedisBackend'

class Todo extends React.Component{

    state = {
        user: ``,
        newtask: ``,
        items: []  
    }

    constructor(props){
        super(props);
        this.state.user = getCurrentUser();
        const cmdString = "SMEMBERS Tasks_" + this.state.user.username;
        this.sendCommand(cmdString);
//        ReactDOM.render(this.renderItems(), document.getElementById('lst'));
    }

    handleUpdate = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        })
    }
    sendCommand = (cmd) => {
        try {
            send_command(cmd, this.processResults);
          } catch (err) {
            this.setState({ error: err })
            console.log('error...: ', err)
          }        
    }
    processResults = async(resStr) => {
        console.log(resStr);
        var resObj = JSON.parse(resStr);
        resObj.splice(resObj.length-1,1);
        this.state.items = [...resObj];
        console.log(this.state.items);
    }
    addTask = () => {
        const item = {
            user: this.state.user.username,
            task: this.state.newtask,
            id: Date.now() 
        };
        this.state.items.push(item);
        const cmdString = "SADD Tasks_" + item.user + " " + JSON.stringify(item);
        this.sendCommand(cmdString);
        document.getElementById('taskinput').value="";
        ReactDOM.render(this.renderItems(), document.getElementById('lst'));
    }
    renderItems = () => {
        const listItems = this.state.items.map((the_task, id) => (
            <li key ={id}>
                {the_task.task}
            </li>
        ));
        return listItems;
    }
    render(){
        const user = getCurrentUser()
        this.state.user = user;
        return(<div>
            <p>Hello: <label>{this.state.user.username}</label></p>
            <ul id="lst"></ul>
            <div style={styles.formContainer}>
                <input
                    onChange={this.handleUpdate}
                    placeholder='New Task'
                    name='newtask'
                    id='taskinput'
                    style={styles.input}
                /> 
            </div>            
            <div style={styles.button} onClick={this.addTask}>
                    <span style={styles.buttonText}>Add Task</span>
            </div>    
        </div>)
    }
}

const styles = {
    input: {
      height: 40, margin: '10px 0px', padding: 7
    },
    formContainer: {
      display: 'flex', flexDirection: 'column'
    },
    button: {
      backgroundColor: 'rebeccapurple', padding: '15px 7px', cursor: 'pointer', textAlign: 'center', marginBottom: 10
    },
    buttonText: {
      color: 'white'
    }
  }

export default Todo 