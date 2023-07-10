import React, { useContext, useEffect, useState } from 'react'
import { Card, Row, Col, 
        Form, Input, Select, Affix, 
        Button, Tag, notification, Modal } from 'antd'
import { GoogleCircleFilled, PlusSquareFilled, CloudUploadOutlined } from '@ant-design/icons'
import { LiftingContext } from '../../containers/Lifting'
import Well from './Well'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input


const WellForm = ({init}) => {

    const [form] = Form.useForm()
    const { state, dispatch } = useContext(LiftingContext)
    const [visible, setVisible] = useState(false)
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
            }

            dispatch({
                type: 'SET_IMAGE',
                payload: {
                    list: []
                }
            })
        
        
    }

    const setModalView = (values) => {
        
        Modal.confirm({
            title:'Estas correcta la información ingresada del pozo?',
            okText: init ? 'Si, actualizar información':'Si, subir información',
            cancelText: 'No, continuar editando',   
            width:'600px',                     
            onOk: () => {
                    onSetWell(values)                
                    let secondsToGo = 15;
                    const modal = Modal.success({
                        title: 'Pozo ingresado correctamente',                        
                        content: 
                        <p>Se limpiará el formulario para ingresar un nuevo pozo o pincha en <b>FINALIZAR 
                            <CloudUploadOutlined /></b> para terminar el proceso, esta ventana se cerrará en {secondsToGo} segundos.</p>                        
                    });
                    const timer = setInterval(() => {
                      secondsToGo -= 1;
                      modal.update({
                        content: 
                        <p>Se limpiara el formulario para ingresar un nuevo pozo o pincha en <b>FINALIZAR <CloudUploadOutlined /></b> para terminar el proceso, está ventana de cerrara en {secondsToGo} segundos.</p>                        
                      });
                    }, 1000);
                    setTimeout(() => {
                      clearInterval(timer);
                      modal.destroy();
                    }, secondsToGo * 1000);
                  
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

    const okNext = () => {

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
        <Form  layout={'vertical'} onFinish={setModalView} form={form} className='my-select-container' initialValues={state.selected_well}>             
            <Card hoverable={true}                 
                style={styles.card1}>
                <Row>            
                    <Col xl={6} lg={6} xs={24} style={{marginBottom:window.innerWidth<800&&'5px'}}>
                        <Item name='name' label='Nombre pozo' rules={[{required:true, message:'Campo boligatorio'}]}>  
                            <Input  placeholder='Nombre pozo' style={styles.input} />
                        </Item>
                    </Col>
                    <Col xl={6} lg={6} xs={24} style={{marginBottom:window.innerWidth<800&&'5px'}}>
                        <Item name='pickup_type' label='Tipo de captación' rules={[{required:true, message:'Campo boligatorio'}]}>
                            <Select placeholder='Tipo de captación' dropdownStyle={styles.input} style={{width:'90%'}}>
                                <Option value='pozo'>Pozo</Option>
                                <Option value='puntera'>Puntera</Option>
                            </Select>
                        </Item>
                    </Col>
                    <Col xl={6} lg={6} xs={24} style={{marginBottom:window.innerWidth<800&&'5px'}}>                        
                        
                        <Item label='Dirección' rules={[{required:state.is_external ? true:false, message:'Campo boligatorio'}]} name='address_exact'>
                            <TextArea rows={3} placeholder={state.is_external ? 'Ingresa dirección; Región, comuna, sector': 'COORDENADAS'} style={styles.input} />                            
                        </Item>
                    </Col>
                    <Col xl={6} lg={6} xs={24}>                        
                        <Item label='Link ubicación' name='link_location' >                              
                            <TextArea rows={3}  placeholder='Pega aquí la URL de la ubicación del pozo (Google Maps.)' style={styles.input} />                
                        </Item>                
                        <Button onClick={()=>window.open('https://www.google.com/maps')} size='small' type='primary' style={{marginTop:'5px', borderRadius:'5px', marginLeft:window.innerWidth>800 && '85px'}} icon={<GoogleCircleFilled />}>Ir a Google Maps</Button>                                        
                    </Col>
                </Row>                       
            </Card>
      <Row>
            <Col lg={10} xl={10} xs={24}>
                <Tag style={styles.titleTag}>Mediciones del pozo</Tag>
                <Item label={'Caudal otorgado'} style={styles.inputWell} name='flow_granted_dga'rules={[{required:true, message:'Campo boligatorio'}]} >
                    <Input type='number' onChange={(value)=>setWellDraft('flow_granted_dga', value)} prefix={<><Tag color='blue' style={styles.tag}>1</Tag></>} suffix={<><Tag color='blue' style={styles.tag}>Lt/SEG</Tag></>} placeholder={'LITROS'} style={styles.input} />
                </Item>
                <Item label={'Profunfidad instalación bomba'} style={styles.inputWell} name='pupm_depth' rules={[{required:true, message:'Campo boligatorio'}]}>
                    <Input type='number' onChange={(value)=>setWellDraft('pupm_depth', value)} prefix={<Tag color='blue' style={styles.tag}>2</Tag>} suffix={<><Tag color='blue' style={styles.tag}>Mt</Tag></>} placeholder='METROS' style={styles.input} />
                </Item>
                <Item label={'Describe interior pozo'} style={styles.inputWell} name='inside_diameter' rules={[{required:true, message:'Campo boligatorio'}]}>
                    <Input type='number' onChange={(value)=>setWellDraft('inside_diameter', value)} prefix={<Tag color='blue' style={styles.tag}>3</Tag>} suffix={<><Tag color='blue' style={styles.tag}>MM/PULG</Tag></>} placeholder='MILIMETROS/PULGADAS' style={styles.input} />
                </Item>                            
                <Item label={'Diámetro ducto salida bomba'} style={styles.inputWell} name='outside_diameter' rules={[{required:true, message:'Campo boligatorio'}]}>
                    <Input type='number' onChange={(value)=>setWellDraft('outside_diameter', value)} prefix={<Tag color='blue' style={styles.tag}>4</Tag>} suffix={<><Tag color='blue' style={styles.tag}>MM/PULG</Tag></>} placeholder='MILIMETROS/PULGADAS' style={styles.input} />
                </Item>                            
                <Item label={'Profunfidad total pozo'} style={styles.inputWell} name='depth'>
                    <Input type='number' onChange={(value)=>setWellDraft('depth', value)} prefix={<Tag color='blue' style={styles.tag}>5</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='METROS' style={styles.input} />
                </Item>                                                                    
                  <Item label='Nivel estático' style={styles.inputWell} name='static_level'>
                    <Input   type='number' onChange={(value)=>setWellDraft('static_level', value)} prefix={<Tag color='blue' style={styles.tag}>6</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='METROS' style={styles.input} />
                </Item>                            
                <Item label='Nivel dinámico' style={styles.inputWell} name='dynamic_level'>
                    <Input type='number' onChange={(value)=>setWellDraft('dynamic_level', value)} prefix={<Tag color='blue' style={styles.tag}>7</Tag>} suffix={<Tag color='blue' style={styles.tag}>Mt</Tag>} placeholder='METROS' style={styles.input} />
                </Item>                
                <Tag style={styles.titleTagInfo}>Información adiconal</Tag>
                <Item style={styles.inputWell} name='is_sensor_flow'>
                    <Select placeholder='¿Cuenta con sensor de flujo?' style={styles.input} dropdownStyle={styles.input}>
                        <Option value={true}>SI</Option>
                        <Option value={false}>NO</Option>
                    </Select>
                </Item>
                <Item style={styles.inputWell} name='is_feasibility_electrical'>
                    <Select placeholder=' ¿Cuenta con factibilidad eléctrica 220v?' style={styles.input} dropdownStyle={styles.input}>
                        <Option value={true}>SI</Option>
                        <Option value={false}>NO</Option>
                    </Select>
                </Item>
                <Item style={styles.inputWell} name='note' >
                    <TextArea rows={3} style={styles.input} placeholder='Describe cualquier observación necesaria' />
                </Item>
                                            
            </Col>
            <Col xl={14} lg={14} xs={24}><Affix>
                <Card style={styles.card2}>
                    <Well />
                </Card></Affix>
            </Col>
            <Col>
                <Item>
                    <Button icon={<></>}  htmlType={'submit'} style={styles.btn} type='primary'>{init ? `Guardar cambios pozo "${state.selected_well.name.toUpperCase()}"`:'Aceptar'}</Button>
                </Item>
            </Col>                                    
            <Col>
                {!init && <Item>
                    <Button onClick={() => form.resetFields()} style={styles.btn}>Limpiar</Button>
                </Item>}
                
            </Col>
</Row>
        </Form>)

}


const styles = {
    input2: {
        borderRadius:'10px',
        color: '#001529',
        height:'73px' 
    },
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
        color: '#001529',
        width:'90%',
    },
    btn: {
        borderRadius:'10px',        
        marginRight: '10px'
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
