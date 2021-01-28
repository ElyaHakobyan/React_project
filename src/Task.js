import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import  PropTypes from 'prop-types'
import './Task.css'

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
        const { checked } = this.state

        return (
            <Card
                className={checked ? 'task' : ''}
                key={task._id}
                style={{ width: '18rem' }}
            >
                <Card.Body>
                    <input type='checkbox' onClick={this.onCheck} />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.description}
                    </Card.Text>
                    <Button
                        onClick={() => this.props.onRemove(task._id)}
                        variant='danger'
                        disabled={this.state.checked}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => this.props.onEdit(task)}
                        disabled={this.state.checked}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Card.Body>
            </Card>
        )
    }

}

export default Task

Task.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}