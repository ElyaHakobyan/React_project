import React, { Component } from 'react'
import Task from './Task'
import { Container, Col, Row, InputGroup, FormControl, Button, Card } from 'react-bootstrap'
import idGenerator from './idGenerator'

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
        selectedTasks: new Set()
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleCheck = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks)

        if (selectedTasks.has(id)) {
            selectedTasks.delete(id)
        } else {
            selectedTasks.add(id)
        }

        this.setState({
            selectedTasks
        })
    }

    handleMultipleDelete = () => {
        let tasks = [...this.state.tasks]
        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)
        })

        this.setState({
            tasks: tasks,
            selectedTasks: new Set()
        })
    }

    addTask = () => {
        const { inputValue } = this.state;
        if (!inputValue) {
            return;
        }
        const todoItem = {
            text: inputValue,
            _id: idGenerator()
        }
        const newTasks = [todoItem, ...this.state.tasks]

        this.setState({
            tasks: newTasks,
            inputValue: '',
        })
    }

    handleDelete = (id) => {
        console.log(id)
        const newArr = this.state.tasks.filter((el) => el._id !== id)

        this.setState({
            tasks: newArr
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask()
        }
    }

    render() {
        return (
            <div className='container'>
                <Container className='mt-4'>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder='Add task here'
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={this.addTask} disabled={!this.state.inputValue}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Button
                            onClick={this.handleMultipleDelete}
                            disabled={this.state.selectedTasks.size === 0 ? true : false}
                            variant='danger'
                        >
                            Delete
                        </Button>
                    </Row>
                </Container>
                <Row className='justify-content-center'>
                    {
                        this.state.tasks.map((task, i) => {
                            return <Task data={task} onRemove={this.handleDelete} handleCheck={this.handleCheck}/>
                           {/* <Card key={i} style={{ width: '18rem' }} className='justify-content-center'>
                                 <Card.Body>
                                    <input type='checkbox' onClick={() => this.handleCheck(task._id)} />
                                    <Card.Title>{task.text}</Card.Title>
                                    <Card.Text>
                                        {task.text}

                                    </Card.Text>
                                    <Button
                                        onClick={() => this.handleDelete(task._id)}
                                        variant='danger'
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Card.Body>
                            </Card> */}
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default ToDo