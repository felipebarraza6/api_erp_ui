import React, { useContext, useEffect, useState } from 'react'
import { Card, Row, Col, 
        Form, Input, Select, 
        Button, Tag, notification, Modal } from 'antd'
import { GoogleCircleFilled, PlusSquareFilled } from '@ant-design/icons'
import { LiftingContext } from '../../containers/Lifting'
import Well from './Well'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input


const WellForm = ({init}) => {

    const [form] = Form.useForm()
    const { state, dispatch } = useContext(LiftingContext)
    const [coordinates, setCoordinates] = useState(null)    
    

    const onSetWell = (values) => {
        
        
            dispatch({
                type: 'ACTIVE_DEACTIVATE_ALERT_IMG',
                payload: {
                    status:false
                }
            })
            values = {
                ...values,
                photos: state.photos
            }
            
            form.resetFields()
            if(init){
                dispatch({
                    type: 'UPDATE_WELL',
                    payload: {
                        id: state.selected_well.id,
                        well: values
                    }
                })
                dispatch({
                    type: 'SET_CURRENT',
                    payload: {
                        current: '22'
                    }
                })
                form.resetFields()
                notification.success({message:'DATOS GUARDADOS CORRECTAMENTE'})
                console.log(state)

            } else {
                dispatch({
                    type: 'ADD_WELL',
                    payload: {
                        well: values
                    }
                })
                notification.success({message:'POZO AGREGADO CORRECTAMENTE'})
            }

            dispatch({
                type: 'SET_IMAGE',
                payload: {
                    list: []
                }
            })
        
        
    }

    const setWellDraft = (field, x) => {

        var val_obj = x.target.value

        
        dispatch({
            type:'ADD_ITEM_WELL_DRAFT',
            payload:{
            field:field,
                value:val_obj
            }
        })

    }

    useEffect(()=> {        
        const getGpsPosition = () => {
            navigator.geolocation.getCurrentPosition(
                async(position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })                
                    
                        var str_location =`LAT: ${position.coords.latitude} \n LON: ${position.coords.longitude}`
                        form.setFieldsValue({'address_exact': str_location})
                    
                },
                    (error) => { 
                        Modal.error({message: 'IMPOSBILE USAR MAPA EN ESTE NAVEGADOR'}) 
                        var str_location =`LAT: \n LON:`
                        form.setFieldsValue({'address_exact': str_location})
                    }
                )
        }
        
        if(!state.is_external && !init){
            getGpsPosition()
        }        

        if(state.selected_well){
            form.setFieldsValue({...state.selected_well})
        }else {
            form.resetFields()
        }
    }, [state.conunt_form])
    


    return(
        <Form  layout={'inline'} onFinish={onSetWell} form={form} className='my-select-container' initialValues={state.selected_well}> 
            <Card hoverable={true}                 
                style={styles.card1}>
                <Row>            
                    <Col xl={6} lg={6} xs={24} style={{marginBottom:window.innerWidth<800&&'5px'}}>
                        <Item name='name'  rules={[{required:true, message:'Campo boligatorio'}]}>  
                            <Input  placeholder='Nombre pozo' style={styles.input} />
                        </Item>
                    </Col>
                    <Col xl={6} lg={6} xs={24} style={{marginBottom:window.innerWidth<800&&'5px'}}>
                        <Item name='pickup_type' rules={[{required:true, message:'Campo boligatorio'}]}>
                            <Select placeholder='Tipo de captación' dropdownStyle={styles.input}>
                                <Option value='pozo'>Pozo</Option>
                                <Option value='puntera'>Puntera</Option>
                            </Select>
                        </Item>
                    </Col>
                    <Col xl={6} lg={6} xs={24} style={{marginBottom:window.innerWidth<800&&'5px'}}>                        
                        
                        <Item name='address_exact'>
                            <TextArea rows={3} placeholder={state.is_external ? 'Ingresa ubicación exacta': 'COORDENADAS'} style={styles.input} />                            
                        </Item>
                    </Col>
                    <Col xl={6} lg={6} xs={24}>
                        <Item name='link_location' >                
                            <TextArea rows={3} prefix={<GoogleCircleFilled />} placeholder='Ingresa URL ubicación' style={styles.input} />                
                        </Item>                            
                    </Col>
                </Row>                       
            </Card>
            <Col lg={10} xl={10} xs={24}>
                <Tag style={styles.titleTag}>Mediciones del pozo</Tag>
                <Item style={styles.inputWell} name='flow_granted_dga'rules={[{required:true, message:'Campo boligatorio'}]} >
                    <Input type='number' onChange={(value)=>setWellDraft('flow_granted_dga', value)} prefix={<Tag color='blue' style={styles.tag}>1</Tag>} suffix={<Tag color='blue' style={styles.tag}>Lt/SEG</Tag>} placeholder='Caudal otorgado' style={styles.input} />
                </Item>
                <Item style={styles.inputWell} name='pupm_depth' rules={[{required:true, message:'Campo boligatorio'}]}>
                    <Input type='number' onChange={(value)=>setWellDraft('pupm_depth', value)} prefix={<Tag color='blue' style={styles.tag}>2</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='Porfundidad de instalación bomba' style={styles.input} />
                </Item>
                <Item style={styles.inputWell} name='inside_diameter' rules={[{required:true, message:'Campo boligatorio'}]}>
                    <Input type='number' onChange={(value)=>setWellDraft('inside_diameter', value)} prefix={<Tag color='blue' style={styles.tag}>3</Tag>} suffix={<Tag color='blue' style={styles.tag}>MM/PULG</Tag>} placeholder='Diámetro interior' style={styles.input} />
                </Item>                            
                <Item style={styles.inputWell} name='outside_diameter' rules={[{required:true, message:'Campo boligatorio'}]}>
                    <Input type='number' onChange={(value)=>setWellDraft('outside_diameter', value)} prefix={<Tag color='blue' style={styles.tag}>4</Tag>} suffix={<Tag color='blue' style={styles.tag}>MM/PULG</Tag>} placeholder='Diámetro ducto salida bomba' style={styles.input} />
                </Item>                            
                <Item style={styles.inputWell} name='depth'>
                    <Input type='number' onChange={(value)=>setWellDraft('depth', value)} prefix={<Tag color='blue' style={styles.tag}>5</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='Profunfidad total' style={styles.input} />
                </Item>                                                                    
                <Item style={styles.inputWell} name='static_level'>
                    <Input type='number' onChange={(value)=>setWellDraft('static_level', value)} prefix={<Tag color='blue' style={styles.tag}>6</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='Nivel estático' style={styles.input} />
                </Item>                            
                <Item style={styles.inputWell} name='dynamic_level'>
                    <Input type='number' onChange={(value)=>setWellDraft('dynamic_level', value)} prefix={<Tag color='blue' style={styles.tag}>7</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='Nivel dinámico' style={styles.input} />
                </Item>                
                <Tag style={styles.titleTagInfo}>Información adiconal</Tag>
                <Item style={styles.inputWell} name='is_sensor_flow'>
                    <Select placeholder='¿Cuenta con sensor de flujo?' dropdownStyle={styles.input}>
                        <Option value={true}>SI</Option>
                        <Option value={false}>NO</Option>
                    </Select>
                </Item>
                <Item style={styles.inputWell} name='is_feasibility_electrical'>
                    <Select placeholder=' ¿Cuenta con factibilidad eléctrica 220v?' dropdownStyle={styles.input}>
                        <Option value={true}>SI</Option>
                        <Option value={false}>NO</Option>
                    </Select>
                </Item>
                <Item style={styles.inputWell} name='note' >
                    <TextArea rows={3} style={styles.input} placeholder='Describe cualquier observación necesaria' />
                </Item>
                                            
            </Col>
            <Col xl={14} lg={14} xs={24}>
                <Card style={styles.card2}>
                    <Well />
                </Card>
            </Col>
            <Col>
                <Item>
                    <Button icon={<><PlusSquareFilled /></>}  htmlType={'submit'} style={styles.btn} type='primary'>{init ? `Guardar cambios pozo "${state.selected_well.name.toUpperCase()}"`:'Crear'}</Button>
                </Item>
            </Col>                                    
            <Col>
                {!init && <Item>
                    <Button onClick={() => form.resetFields()} style={styles.btn}>Limpiar</Button>
                </Item>}
                
            </Col>
        </Form>)

}


const styles = {
    titleTag: {
        backgroundColor:'#1890ff', color:'white',
        borderRadius:'5px', fontSize:'15px', marginBottom:'10px'
    },
    titleTagInfo: {
        backgroundColor:'#1890ff', color:'white',
        borderRadius:'5px', fontSize:'15px', marginBottom:'10px'
    },
    title:{
        
    },
    tag:{
        borderRadius: '10px'
    },
    input: {
        borderRadius:'10px',
        color: '#001529' 
    },
    btn: {
        borderRadius:'10px',        
    },
    inputWell: {
        marginBottom:'10px'
    },
    card1: {
        marginBottom:'20px',
        borderRadius: '10px',
        width:'100%',
        icon: {
            color: 'white',
            marginRight:'5px'
        },               
    },
    card2: {
        marginBottom:'20px',
        borderRadius: '10px',
        width:'100%',        
        icon: {
            color: '#001529',
            marginRight:'5px'
        },               
        backgroundColor: '#001529'
    }
}


export default WellForm