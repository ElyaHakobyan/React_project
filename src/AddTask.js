import React, { Component } from 'react'
import { FormControl, Button, Modal, Form } from 'react-bootstrap'


class AddTask extends Component {

    state = {
        title: '',
        description: ''
    }

    handleChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        })
    }

    addTask = () => {
        const { title, description } = this.state
        if (!title) {
            return;
        }

        const task = { title: title, description: description}
        this.props.onAdd(task)

        this.setState({
            title: ''
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask()
        }
    }

    render() {
        const { disabled, onClose } = this.props
        return (
            <>
                <Modal
                    show={true}
                    onHide={onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW TASK</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder='Add task here'
                            value={this.state.title}
                            onChange={(e) => this.handleChange(e, 'title')}
                            onKeyDown={(event) => this.handleKeyDown(event)}
                            disabled={disabled}
                        />
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={(e) => this.handleChange(e, 'description')} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={this.addTask}
                            disabled={!this.state.title}
                        >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default AddTask