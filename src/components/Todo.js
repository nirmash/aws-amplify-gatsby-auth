import React from 'react'
import { Link } from 'gatsby'
import { getCurrentUser } from '../utils/auth'
import { send_command } from '../utils/RedisBackend'


class Todo extends React.Component{

    state = {
        redisCommand: ``,
        redisResult: ``  
    }

    handleUpdate = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        })
    }
    sendCommand = async() => {
        const { redisCommand, redisResult } = this.state
        try {
            redisResult = await send_command(redisCommand)

          } catch (err) {
            this.setState({ error: err })
            console.log('error...: ', err)
          }        
    }
    render(){
        const user = getCurrentUser()
        return(<div>
            <p>Hello {user.username}</p>
            <p>Result: <label value={this.state.redisResult} /></p>
            <div style={styles.formContainer}>
                <input
                    onChange={this.handleUpdate}
                    placeholder='redisCommand'
                    name='redisCommand'
                    value={this.state.redisCommand}
                    style={styles.input}
                /> 
            </div>            
            <div style={styles.button} onClick={this.sendCommand}>
                    <span style={styles.buttonText}>Send Command</span>
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

export default ToDo 