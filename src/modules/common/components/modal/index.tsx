import React from "react";
import Modal from 'react-bootstrap/Modal';
import { useModalContext } from "@/lib/context/modal-context";

interface Props {

}

const Index = (props: Props) => {
    let { showModal, setShowModal, configModal } = useModalContext();

    return <Modal dialogClassName={"modal-" + (configModal.width ? configModal.width:30) +"w "} centered backdrop="static" show={showModal} onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton className={configModal.title ? "" : "pb-0"}>
                    <Modal.Title>{configModal.title}</Modal.Title>
                </Modal.Header>   
                {configModal.body ? 
                    <Modal.Body className={configModal.title ? "" : "pt-0"}>
                        {configModal.body}
                    </Modal.Body>
                    :<></>}
                {configModal.footer ? <Modal.Footer>{configModal.footer}</Modal.Footer>:<></>}
            </Modal>;
}
export default Index