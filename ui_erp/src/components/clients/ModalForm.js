import React, { useState, useEffect } from 'react'

import { Modal, Form, Input, Select, Alert, Button, notification } from 'antd'
import api from '../../api/endpoints'
const { Option } = Select

const ModalForm = ({visible, onCreate, onCancel, enterprise, error }) => {

    const [form] = Form.useForm()
    const [listPersons, setListPersons] = useState([])
    const [newCharget, setNewCharge] = useState(null)
    const [count, setCount] = useState(0)

    const [other, setOther] = useState({
      other_charge:false
    })
    
    const getData = async() => {
      const rq = await api.worklands.list().then((r)=> {
        setListPersons(r.data.results)
      })
    }

    useEffect(()=> {
      getData()
    }, [count])

    return(
      <React.Fragment>
        <Modal
            visible={visible}
            title={enterprise ? `Nueva persona en ${enterprise.name}`: `Editar persona` }
            okText ="Guardar"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={() => {
                form
                  .validateFields()
                  .then(values => {
                    form.resetFields();
                    onCreate(values);
                  })
                  .catch(info => {
                    console.log('Validate Failed:', info);
                  });
              }}
        >
          {error && <Alert style={{marginBottom:'5px'}} message="Error" description={error.email} type='error' />}
            <Form
            form={form}
            layout="vertical"
            name="FormPerson"            
            >
              <Form.Item name="name" label="Nombre" rules={[
                {
                  required:true,
                  message:'Porfavor ingresa el nombre'
                }
              ]}>
                <Input />

              </Form.Item>

            
              <Form.Item name="charge" label="Cargo" rules={[
                {
                  required:true,
                  message:'Porfavor ingresa el cargo'
                }
              ]}>
                {other.other_charge ? <>
                  <Input onChange={(e)=>setNewCharge(e.target.value)} placeholder="Escribe el cargo" />
                  <Button onClick={async()=>{
                      const rq = api.worklands.create({name:newCharget}).then((r)=>{
                        notification.success({message:'CARGO CREADO CORRECTAMENTE'})
                        setOther(false)
                        setCount(count+1)                        
                        form.setFieldsValue({'charge':newCharget})
                      }
                      )
                  }} size='small' style={{marginTop:'10px'}} type='primary' icon={'+'}>Crear cargo</Button>
                  </>:
                  <Select placeholder="Selecciona un cargo" onSelect={(value)=> {
                    if(value===''){
                      setOther({
                        other_charge:true                        
                      })
                      value = null
                    }
                  }} >
                    {listPersons.map((p)=> <>
                      <Option value={p.name}>
                        {p.name} <Button style={{float:'right', marginTop:'2px'}} type='primary' danger size='small' onClick={async()=>{
                            const rq = await api.worklands.delete(p.id).then((r)=>{
                              notification.success({message:'CARGO ELIMINAD'})
                              form.setFieldsValue({'charge':''})
                              setCount(count+1)
                            })
                        }}>Eliminar</Button>
                        </Option></>)}                                                         
                    <Option value={''}>Crear un nuevo cargo</Option>
                  </Select>
                }
                

              </Form.Item>

              <Form.Item name="phone_number" label="Telefono" rules={[{ required: false, message: 'Ingresa el telefono'}]}>
                <Input name="phone_number" type="text" maxLength={9} />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ type:"email", required: true, message: 'Ingresa el correo electrónico'}]}>
                  <Input name="email" type="email" />
              </Form.Item>

            </Form>
        </Modal>
        </React.Fragment>
    )

}

export default ModalForm