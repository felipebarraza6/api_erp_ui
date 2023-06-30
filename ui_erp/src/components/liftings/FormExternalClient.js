import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Row, 
        Col, Button, Select,
        notification, Card } from 'antd'
import { SaveFilled, ClearOutlined, PlusCircleOutlined, LeftCircleFilled } from '@ant-design/icons'
import { LiftingContext } from '../../containers/Lifting'
import api from '../../api/endpoints'

const { Option } = Select

const FormExternalClient = () => {

    const [form] = Form.useForm()
    const [workloads, setWorloads] = useState([])
    const [worklandNew, setWorklandNew] = useState(null)
    const [count, setCount] = useState(0)
    const [openSelect, setOpenSelect] = useState(false)
    const { state, dispatch } = useContext(LiftingContext)

    const [isOther, setIsOther] = useState(false)

    const onFinish = (values) => {
        dispatch({
            type: 'SET_CLIENT',
            payload: {
                name_enterprise: values.name_enterprise,
                address_enterprise: values.address_enterprise,
                name_contact: values.name_contact,
                workload: values.workload,
                mail_contact: values.mail_contact,
                phone_contact: values.phone_contact,                
            }
        })
        dispatch({
            type: 'SET_CURRENT',
            payload: {
                current: '22'
            }
        })
        form.resetFields()
        notification.success({message: 'Cliente guardado correctamente!'})
    }

    const pairSelect = (value) => {
        if(value===''){
            setIsOther(true)
        }
    }

    const getWorkloads = async()=> {
        const rq = await api.worklands.list().then((r)=>setWorloads(r.data.results))
    }

    const createOption = async() => {        
        const rq = await api.worklands.create({'name':worklandNew}).then((r)=> {
            notification.success({message:'Cargo de trabajo creado correctamente'})
            setCount(count+1)
            setIsOther(false)
            setOpenSelect(true)
            form.setFieldsValue({'workload':worklandNew})
        })
    }

    useEffect(()=> {
        getWorkloads()
    }, [count])



    return(<Row justify='center' className='my-select-container'>
        <Col span={24}>
            <Card hoverable={true} style={{borderRadius:'20px'}}>
            <Form style={styles.containerForm} layout='vertical' form={form} onFinish={onFinish} initialValues={state.client_external} >
                <Row>
                    <Col style={styles.col} xl={12} lg={12} xs={24}>
                        <Form.Item label='Nombre empresa' name='name_enterprise' rules={[{required:true, message:'Campo obligatorio' }]}>
                            <Input style={styles.input} placeholder='Smart Hydro' />
                        </Form.Item>
                    </Col>
                    <Col style={styles.col} xl={12} lg={12} xs={24}>
                        <Form.Item label='Dirección Empresa' name='address_enterprise' rules={[{required:true, message:'Campo obligatorio'}]}>
                            <Input style={styles.input} placeholder='Region, comuna, sector' />
                        </Form.Item>
                    </Col>
                    <Col style={styles.col} xl={12} lg={12} xs={24}>
                        <Form.Item label='Nombre contacto' name='name_contact' rules={[{required:true, message:'Campo obligatorio'}]}>
                            <Input style={styles.input} placeholder='Nombre Apellido' />
                        </Form.Item>
                    </Col>
                    <Col style={styles.col} xl={12} lg={12} xs={24}>
                        <Form.Item label='Cargo contacto(selecciona una opción)' name='workload' rules={[{required:true, message:'Campo obligatorio'}]}>     
                            {!isOther ? 
                            <Select defaultOpen={openSelect} onSelect={pairSelect} bordered={true} placeholder='Selecciona una opción...' dropdownStyle={styles.input}>                                
                                <Option style={styles.optionNewWorkload} value=''>Crear un nuevo cargo (+)</Option>
                                {workloads.map((e)=><Option key={e.id} value={e.name}>{e.name}</Option>)}                                                                
                                
                            </Select>:<><Input style={styles.input} onChange={(e)=>setWorklandNew(e.target.value)} 
                            placeholder='Describe tu cargo...' 
                            suffix={<>
                                <Button onClick={createOption} type='primary'  size='small' icon={<PlusCircleOutlined />} style={styles.btn}>{window.innerWidth > 800 ? 'Guardar':''}</Button>
                                <Button size='small' style={styles.btn} icon={<LeftCircleFilled />} onClick={()=>setIsOther(false)}>{window.innerWidth > 800 ? 'Todos los cargos':''} </Button></>} /></>}
                        </Form.Item>
                    </Col>
                    <Col style={styles.col} xl={12} lg={12} xs={24}>
                        <Form.Item label='Correo' name='mail_contact' rules={[
                                {required:true, message:'Campo obligatorio'},
                                {type:'email', message:'Ingresa un correo valido'}
                            ]}>
                            <Input style={styles.input} placeholder='correo@dominio.cl' />
                        </Form.Item>
                    </Col>
                    <Col style={styles.col} xl={12} lg={12} xs={24}>
                        <Form.Item label='Telefóno' name='phone_contact' rules={[{required:true, message:'Campo obligatorio'}]}>
                            <Input prefix={'+56 9'} style={styles.input} placeholder='1234 5678' />
                        </Form.Item>
                    </Col>                    
                    <Col  xl={7} lg={7} xs={24} style={styles.col} >                
                        <Form.Item>
                            <Button icon={<SaveFilled />}  htmlType='submit' style={styles.btn} type='primary'>Guardar</Button>
                            <Button icon={<ClearOutlined />} style={styles.btn} onClick={()=>form.resetFields()} >Limpiar</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            </Card>
        </Col>
    </Row>)
}

const styles = {
    containerForm: {
        padding: '50px'
    },
    input: {
        borderRadius: '10px'
    },
    btn:{
        marginRight:'10px',
        borderRadius:'10px'
    },
    col: {
        paddingRight:'5px',
        paddingLeft:'5px'
    },
    optionNewWorkload: {
        backgroundColor: '#1890ff',
        color:'white'
    }
}

export default FormExternalClient