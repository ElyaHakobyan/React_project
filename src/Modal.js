import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class ConfirmDelete extends Component {

    render() {
        return (
            <Modal show={this.props.toggle}  onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this {this.props.count} tasks?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onClose}>
                        Cancel
              </Button>
                    <Button variant="danger" onClick={this.props.delete}>
                        Delete
              </Button>
                </Modal.Footer>
            </Modal>
        )
    }


}

export default ConfirmDelete