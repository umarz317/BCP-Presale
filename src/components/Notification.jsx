import { useState } from "react";
import { Toast, ToastContainer, ToastHeader } from "react-bootstrap";
import {TiTick} from 'react-icons/ti'
import {MdOutlineClose} from 'react-icons/md'
import { useContext } from "react";
import { AppContext } from "../App";


const Notification = () => {

    const [show,setShow,success,setSuccess,message,setMessage] = useContext(AppContext)

    return(
        <ToastContainer position="top-center">
            <Toast show={show} onClose={()=>{setShow(!show)}} bg="dark" style={{marginTop:'20px'}}>
                <Toast.Header>
                    {
                        success?
                        <>
                        <TiTick style={{color:'green',width:'20px',height:'20px'}}/>
                        <strong className="me-auto"> Transaction Success!</strong>
                        </>
                        :
                        <>
                        <MdOutlineClose style={{color:'red',width:'20px',height:'20px'}}/>
                        <strong className="me-auto"> Transaction Failed!</strong>
                        </>
                    }
                </Toast.Header>
                <Toast.Body style={{color:'white'}}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );

}
export default Notification;