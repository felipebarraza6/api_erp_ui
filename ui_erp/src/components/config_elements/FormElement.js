import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Card, notification } from 'antd'
import api from '../../api/endpoints'
import { FilePdfOutlined, FileExcelOutlined, 
        FileWordOutlined, FileImageOutlined,
        FilePptOutlined } from '@ant-design/icons'

const { Option } = Select

const FormElement = ({ count, setCount, selectElement, setSelectElement }) => {

    const [form] = Form.useForm()
    const [deparments, setDeparments] = useState([])

    const [updateForm, setUpdateForm] = useState(false)

    const onCreate = async(values) => {
        if(values.type==='is_file'){
            values = {
                ...values,
                is_file:true,
                is_info:false
            }
        } else {
            values = {
                ...values,
                is_file:false,
                is_info:true
            }
        }
        
        if(selectElement){
          console.log(selectElement)
            const rq = await api.projects.types_elements.update(selectElement.id, values).then((r)=> {
              notification.success({message:'Entrada actualizada correctamente'})
              setSelectElement(null)
              setCount(count+1)
              form.resetFields()
            })
        }else {
            const rq = await api.projects.types_elements.create(values).then((r)=> {
            console.log(r)
            setCount(count+1)
            form.resetFields()
            notification.success({message:'Entrada creada correctamente!'})
        })

        }

        
    }

    const getDeparments = async() => {
        const rq = await api.projects.company_deparments.list().then((r)=> {
            setDeparments(r.data.results)
            console.log(r)
        })
    }

    useEffect(()=> {
        getDeparments()
        if(selectElement){
            setUpdateForm(true)
            setTimeout(() => {
                setUpdateForm(false)
              }, 1000);
        }
    }, [selectElement])

    return(<Card hoverable bordered>
        {!updateForm && 
        <Form initialValues={selectElement} form={form} onFinish={onCreate} layout='vertical' style={{padding:'10px'}}>
        <Form.Item label='Nombre elemento' name='name' rules={[{required:true, message:'Ingresa el nombre...'}]}>
            <Input />
        </Form.Item>
        <Form.Item label='Descripción' name='description' >
            <Input.TextArea rows={3} />
        </Form.Item>   
        <Form.Item label='Departamento' name='deparment' rules={[{required:true, message:'Selecciona una opcion...'}]}>
            <Select placeholder='Debes seleccionar un departamento'>
                {deparments.map((deparment)=><Option value={deparment.id}>{deparment.name}</Option>)}
            </Select>
        </Form.Item>  
        <Form.Item label='Posicion' rules={[{required:true, message:'Ingresa su posición'}]} name='position'>
          <Input type='number' /> 
        </Form.Item>
        <Form.Item>
            <Button htmlType='submit' type='primary' style={{marginRight:'10px'}}>Guardar</Button>
            <Button onClick={()=>form.resetFields()}>Limpiar</Button>
        </Form.Item></Form> }
    </Card>)

}


export default FormElement
