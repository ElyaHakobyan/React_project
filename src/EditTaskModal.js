import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './EditTaskModal.css'

class EditTaskModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props.data
        }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleSave = () => {
        const task = this.state;
        this.props.onSave(task)
    }

    render() {
        const editTask = this.props.data;
        return (
            <Modal show={true} onHide={this.props.onClose}>
                <Modal.Header>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text'
                        className='input'
                        value={this.state.text}
                        onChange={(event) => this.handleChange(event)}

                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                </Button>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Cancel
                </Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default EditTaskModal
