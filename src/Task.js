import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Task extends Component {
    state = {
        checked: false
    }

    onCheck = () => {
        this.setState({
            checked: !this.state.checked
        })

        this.props.handleCheck(this.props.data._id)
    }
    render() {
        const task = this.props.data

        return (
            <Card style={{ width: '18rem' }} className={this.state.checked}>
                <Card.Body>
                    <input type='checkbox' onClick={this.onCheck} />
                    <Card.Title>{task.text}</Card.Title>
                    <Card.Text>
                        {task.text}

                    </Card.Text>
                    <Button
                        onClick={() => this.props.onRemove(task._id)}
                        variant='danger'
                        disabled={this.state.checked}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Card.Body>
            </Card>
        )
    }

}

export default Task