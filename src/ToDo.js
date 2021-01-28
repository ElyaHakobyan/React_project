import React, { PureComponent } from 'react'
import Task from './Task'
import AddTask from './AddTask'
import EditTaskModal from './EditTaskModal'
import { Container, Col, Row, Button, Modal } from 'react-bootstrap'
import idGenerator from './idGenerator'
import ConfirmDelete from './Modal'
import './ToDo.css'


class ToDo extends PureComponent {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        toggle: false,
        editTask: null,
        addModalToggle: false
        
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

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    toggleEditModal = (task) => {
        this.setState({
            editTask: task
        })
    }

    componentDidMount() {
        fetch("http://localhost:3001/task", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
            .then(res => res.json())
            .then(response => {

                this.setState({
                    tasks: response
                })
            })

    }

    handleMultipleDelete = () => {

        const body = {
            tasks: [...this.state.selectedTasks]
        }
        fetch("http://localhost:3001/task", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        )
            .then(res => res.json())
            .then(res => {
                let tasks = [...this.state.tasks]
                this.state.selectedTasks.forEach((id) => {
                    tasks = tasks.filter((task) => task._id !== id)
                })

                this.setState({
                    tasks: tasks,
                    selectedTasks: new Set(),
                    toggle: false
                })
            })
    }


    addTask = (data) => {
        const body = JSON.stringify(data)
        fetch("http://localhost:3001/task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        }
        )
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                const newTasks = [...this.state.tasks, response]

                this.setState({
                    tasks: newTasks,
                    addModalToggle: false
                })
            })
    }

    handleDelete = (id) => {
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
            .then(res => res.json())
            .then(response => {
                const newArr = this.state.tasks.filter((el) => el._id !== id)

                this.setState({
                    tasks: newArr
                })
            })
    }

    handleEdit = (task) => {
        this.setState({
            editTask: task
        })
    }

    f = (task) => {
        console.log(task)
        const body = JSON.stringify(task);
        fetch(`http://localhost:3001/task/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        }
        )
            .then(res => res.json())
            .then(response => {
                const changedItemIndex = this.state.tasks.findIndex((el) => el._id == task._id)
                const tasks = this.state.tasks
                tasks[changedItemIndex] = task


                this.setState({
                    tasks: tasks,
                    editTask: null
                })
            })
    }

    toggleAddModal = () => {
        this.setState({
            addModalToggle: !this.state.addModalToggle
        }
        )
    }

    render() {
        const { editTask } = this.state
        return (
            <>
                <div className='container'>
                    <Container className='mt-4'>
                        <Row className='justify-content-center'>
                            
                                <Button
                                    variant='primary'
                                    onClick={this.toggleAddModal}
                                    disabled={this.state.selectedTasks.size === 0 ? false : true}
                                >
                                    AddTask
                                </Button>
                          
                        </Row>
                        <Row className='justify-content-center'>
                            <Button
                                className='deleteSelected'
                                variant='danger'
                                onClick={this.toggleConfirm}
                                disabled={this.state.selectedTasks.size === 0 ? true : false}
                            >
                                Delete
                        </Button>
                        </Row>
                    </Container>
                    <Row className='justify-content-center'>
                        {
                            this.state.tasks.map((task, i) => {
                                return (
                                    <Col key={task._id}>
                                        <Task  
                                            data={task}
                                            onRemove={this.handleDelete}
                                            handleCheck={this.handleCheck}
                                            onEdit={() => this.toggleEditModal(task)}
                                        />
                                    </Col>
                                )
                            })

                        }
                    </Row>
                    <ConfirmDelete
                        count={this.state.selectedTasks.size}
                        toggle={this.state.toggle}
                        onClose={this.toggleConfirm}
                        delete={this.handleMultipleDelete}
                    />
                    {
                        !!this.state.editTask && <EditTaskModal
                            data={editTask}
                            onSave={(task) => this.f(task)}
                            onClose={() => this.toggleEditModal(null)} />
                    }
                    {
                    this.state.addModalToggle &&
                    <AddTask
                        onClose={this.toggleAddModal}
                        onAdd={this.addTask}
                        disabled={!!this.state.selectedTasks.size}
                    />
                }
                </div>
            </>
        )
    }
}

export default ToDo