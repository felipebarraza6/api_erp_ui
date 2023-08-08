import React, { useEffect, useState } from "react";
import { Tooltip, Button, Modal } from "antd";
import { FileFilled } from "@ant-design/icons";
import UploadValueFile from "./UploadValueFile"
import api from "../../../api/endpoints";
import { useLocation } from 'react-router-dom'

const SingleElement = ({ element }) => {

  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [count, setCount] = useState(0)
  const getData = async() => {
    const rq = await api.projects.values_elements.list(location.pathname.slice(10), element.id).then((r)=> {
      setQuantity(r.data.count)
    })
  }
  
  const toggleModal = () => {
    if(open){
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  

  useEffect(()=> {
    getData()
  }, [count])

  return (
    <>
      <Modal style={{top:'10px'}} width={'1300px'} 
        title={<> {element.description}</>} visible={open} 
        onCancel={toggleModal} footer={[]} >
          <UploadValueFile element={element} countA={count} setCountA={setCount} />
      </Modal>
      <Tooltip title={element.description}>
        <Button
          style={{margin:'5px', borderRadius: "5px"}}
          icon={<FileFilled />}
          type="primary"
          onClick={toggleModal}>
          {element.name} <span style={{backgroundColor:'black', marginLeft:'10px', borderRadius:'5px', paddingLeft:'2px', paddingRight:'2px'}}>{quantity}</span>
        </Button>
      </Tooltip>
    </>
  );
};

export default SingleElement;

