import React, { useEffect, useState } from 'react'
import { Button, Table, Popconfirm, notification, Modal, Form, Input } from 'antd'
import api from '../../api/endpoints'
import { EditFilled, DeleteFilled, ArrowLeftOutlined, SaveFilled } from '@ant-design/icons'

const ListDepartaments = ({ count, setCount }) => {

    const [deparments, setDeparments] = useState([])
    const [visible, setVisible] = useState(false)
    const [oldData, setOldData] = useState({})

    const [form] = Form.useForm()

    const getData = async() => {
        const rq = await api.projects.company_deparments.list().then((r)=> {
            setDeparments(r.data.results)
        })
    }

    const deleteDeparment = async(id) => {
        const rq = await api.projects.company_deparments.delete(id).then((r)=> {
            notification.success({message:'DEPARTAMENTO ELIMINADO'})
            setCount(count+1)
            
        })
    }

    const updateDeparment = async()=> {
        const rq = await api.projects.company_deparments.update(oldData, oldData.id).then((r)=> {
            setCount(count+1)
            setVisible(false)
            form.resetFields()
        })
    }

    useEffect(()=> {
        getData()
    }, [count])

    return(<>
        <Modal visible={visible} onCancel={()=>setVisible(false)} title='Actualizar registro' 
            footer = {[
                <Button icon={<SaveFilled />} type='primary' style={styles.btn} onClick={updateDeparment}>Actualizar datos</Button>,
                <Button icon={<ArrowLeftOutlined />} style={styles.btn} onClick={()=>setVisible(false)}>Volver</Button>
            ]}
            >
            <Form layout='vertical' form={form} >
                <Form.Item label='Nombre' name='name'>
                    {oldData.name}
                    <Input prefix='Nuevo nombre: ' onChange={(e)=>setOldData({...oldData, name: e.target.value })} />
                </Form.Item>
                <Form.Item label='Descripcion: '>
                    {oldData.description}<br/>
                    <u>Nueva descripcion</u>
                    <Input.TextArea onChange={(e)=>setOldData({...oldData, description: e.target.value })}  rows={3} />
                </Form.Item>                
            </Form>
        </Modal>
        <Table dataSource={deparments} columns = {[
        {
            title: 'Nombre', dataIndex:'name'
        },
        {
            title: 'Descripcion', dataIndex: 'description'
        }, 
        {
            render: (x) => {
                return(<>
                    <Button size='small' icon={<EditFilled />} style={styles.btn} onClick={()=> {
                        setVisible(true)
                        setOldData(x)
                    }}>Editar</Button>
                    <Popconfirm title={'Estas seguro de eliminar?'} onConfirm={()=> deleteDeparment(x.id)}>
                        <Button size='small' type={'primary'} icon={<DeleteFilled />} danger style={styles.btn}>Eliminar</Button>
                    </Popconfirm>
                    </>)
            }
        }
    ]} /></>)
}


const styles = {
    btn: {
        borderRadius: '10px',
        margin: '5px'
    },
    modal: {
        borderRadius: '20px'
    }
}


export default ListDepartaments