import React from 'react'
import { getCurrentUser } from '../utils/auth'
import { send_command } from '../utils/RedisBackend'

class Todo extends React.Component{

    state = {
        user: ``,
        newtask: ``,
        items: []  
    }

    handleUpdate = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        })
    }
    sendCommand = async() => {
        const { redisCommand} = this.state
        try {
            this.state.redisResult = await send_command(redisCommand, this.processResults);
          } catch (err) {
            this.setState({ error: err })
            console.log('error...: ', err)
          }        
    }
    processResults = async(resObj) => {
        this.state.redisResult = resObj;
        console.log(this.state.redisResult);
    }
    addTask = async() => {
        const item = {
            user: this.state.user.username,
            task: this.state.newtask,
            id: Date.now() 
        };
        this.state.items.push(item);
    }
    render(){
        const user = getCurrentUser()
        this.state.user = user;
        return(<div>
            <div>
            {this.state.items.map((item, id) => (
                <Item key={id} item={item.task} />
            ))}
            </div>            
            <div style={styles.formContainer}>
                <input
                    onChange={this.handleUpdate}
                    placeholder='New Task'
                    name='newtask'
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