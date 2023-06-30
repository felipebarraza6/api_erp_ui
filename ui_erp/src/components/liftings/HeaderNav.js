import React, { useContext, useEffect, useState } from 'react'
import { Menu, Row, Col, Modal,
        Button, Typography, Select, notification } from 'antd'
import { LiftingContext } from '../../containers/Lifting'
import { UserOutlined, OrderedListOutlined, CloudUploadOutlined, CloudDownloadOutlined,
    PlusCircleFilled, EditFilled, ArrowLeftOutlined, LoadingOutlined, SaveFilled } from '@ant-design/icons'
import imgsmart from '../../build/images/logo-white.png'
import api from '../../api/endpoints'

const { Title, Paragraph } = Typography

const HeaderNav = () => {

    const { state, dispatch } = useContext(LiftingContext)
    const [visible, setVisible] = useState(false)    
    const [loadSend, setLoadSend] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [clients, setClients] = useState([])
    const [count, setCount] = useState(0)
    var is_external = state.is_external
    var wells = state.wells

    const changeMenu = (x) => {
        if(x.key==='22'){
            dispatch({
                    type: 'RESET_SELECT_WELL',                    
                })
            dispatch({
                type: 'SET_IMAGE',
                payload: { list:[] }
            })
            dispatch({
                type: 'SET_CURRENT',
                payload: { current:x.key }
            })
            dispatch({
                type: 'CLEAR_VALUES_WELL_DRAFT'
            })

        } else if(x.key==='F3'){
            setVisible(true)
        } else if(x.key==='P2'){
            setCount(count+1)
        } else {
        
            dispatch({
                type: 'SET_CURRENT',
                payload: { current:x.key }                
            })
            dispatch({
                type: 'ADD_SELECT_WELL',
                payload: { id: x.key }
            })                
        }            
        
    } 
    
    const onSaveMyDevice = async() => {
        var liftingsLocalStorage = JSON.parse(localStorage.getItem('liftings')) || [];
        // Agregar un nuevo elemento a la lista
        liftingsLocalStorage.push(JSON.stringify({
            client: state.client_api,            
            client_data: clients.find((objeto) => {                
                return objeto['id'] === state.client_api
            }),
            wells: state.wells
        }))        
        localStorage.setItem('liftings', JSON.stringify(liftingsLocalStorage))
        
        notification.success({message:'Información guardada correctamente!'})  
        setVisible(false)
        dispatch({
            type:'RESET_ALL_APP_INTERNAL'
        })
    }

    const onSendApi = async()=> {
        setLoadSend(true)
        setDisabledBtn(true)
        var data = {}                

        if(state.is_external) {
            data = { 
                external_client:  await api.external_clients.create(state.client_external).then(r => r.data.id),                
                is_external: state.is_external
            }
            const rq = await api.liftings.create(data).then(async(r)=>{            
                state.wells.map(async(object)=>{
                    const rq_well = await api.liftings.wells.create({
                        lifting: r.data.uuid,
                        is_dga: true,
                        ...object
                    }).then(async(res)=>{       
                        object.photos.map(async(photo)=> {
                            var rq_photo = await api.liftings.wells.photo({file: photo, id:res.data.id}).then((response)=>{
                                notification.success({message:'Información enviada correctamente!'})
                                setTimeout(function() {
                                    window.location.assign('https://smarthydro.cl')
                                }, 4000)
                            })                            
                        })                                                
                    })
                })
            })
        } else {
            data = { 
                client: state.client_api,                
                is_external: state.is_external
            }            
            const rq = await api.liftings.create(data).then(async(r)=>{            
                state.wells.map(async(object)=>{
                    const rq_well = await api.liftings.wells.create({
                        lifting: r.data.uuid,
                        is_dga: true,
                        ...object
                    }).then(async(res)=>{  
                        if(object.photos.length>0){
                            object.photos.map(async(photo)=> {
                                var rq_photo = await api.liftings.wells.photo({file: photo, id:res.data.id}).then((response)=>{
                                    notification.success({message:'Información enviada correctamente!'})  
                                    setVisible(false)
                                    dispatch({
                                        type:'RESET_ALL_APP_INTERNAL'
                                    })
                                })                            
                            })                                
                        } else {
                            notification.success({message:'Información enviada correctamente!'})  
                            dispatch({
                                type:'RESET_ALL_APP_INTERNAL'
                            })
                            setVisible(false)
                        }     
                                        
                    })
                })
            })
        }       
    }

    const onSelectClient = (value) => {
        dispatch({
                type: 'SET_CLIENT_API',
                payload: {
                    client: value
                }
            })
        setDisabledBtn(false)
    }

    const getClients = async() => {
        const rq = await api.enterprises.get_total_enterprises().then((r)=>{
            setClients(r.enterprises_actives.data.results)
        })
    }
        
    useEffect(()=> {
        if(!state.is_external){
            setDisabledBtn(true)
            getClients()
            
        }

    }, [state.steps.current, count])

    return(<Row justify='center'>
        <Modal title={!loadSend && <Title level={4} style={{textAlign:'center'}}>¿Estas seguro de finalizar el proceso de levantamiento de información?</Title>} visible={visible} footer={[]} onCancel={()=>setVisible(false)}>
            <Row justify='space-around' align='middle'  className='my-select-container'>
                <Col span={24} style={{textAlign:'center'}}>
                    {loadSend && <>
                        <Title level={3}>Tus datos ingresados estan siendo procesados...</Title>
                        <Paragraph>En cuanto recibamos tu informacion nos pondremos en contacto a la brevedad...</Paragraph>
                        <LoadingOutlined style={{fontSize:'25px', marginTop:'20px', marginBottom:'35px'}} /><>
                        </>
                    </>}
                    {!state.is_external && <>{!state.client_api &&
                        <Select style={{marginTop:'20px', marginBottom:'50px',width:'400px'}} onSelect={onSelectClient} placeholder='Selecciona un cliente...'>                            
                            {clients.map((client)=> 
                                <Select.Option value={client.id}>{client.name}</Select.Option>
                            )}
                        </Select>}
                    </>}
                </Col>
                <Col>
                    <Button disabled={disabledBtn} style={styles.btn} type='primary' icon={<CloudUploadOutlined />} onClick={onSendApi} size='large'>FINALIZAR</Button>                    
                </Col>
                {!is_external && <Col>
                    <Button disabled={disabledBtn} style={styles.btn} type='primary' icon={<CloudDownloadOutlined />} onClick={onSaveMyDevice} size='large'>GUARDAR EN MI EQUIPO</Button>                    
                </Col>}
                {!loadSend &&                  
                    <Col style={{marginTop:!is_external &&'10px'}} ><Button icon={<ArrowLeftOutlined />} style={styles.btn} size='large' danger onClick={()=>setVisible(false)} >CANCELAR</Button></Col>}
                
            </Row>
        </Modal>
        <Col>        
            <Menu selectedKeys={state.steps.current} defaultOpenKeys={['P2']} onClick={changeMenu} theme='dark' mode='inline' style={styles.menu} title='a'>
                <img src={imgsmart} width={'85%'} style={{paddingLeft:'20px', paddingTop:'20px',marginBottom:'40px'}} />
                {is_external &&
                    <Menu.Item key={state.client_external ? 'C1':'CE'}>{!state.client_external.is_draft ? 
                        <UserOutlined/>:<EditFilled />} Cliente</Menu.Item>} 
                <Menu.Item key='22' disabled={state.is_external && !state.client_external.is_draft ? true:false}><PlusCircleFilled/> Nuevo pozo</Menu.Item>               
                <Menu.SubMenu key='P2' disabled={state.is_external && !state.client_external.is_draft ? true:false} title={<><OrderedListOutlined/> Editar Pozos({state.wells.length})</>}> 
                    
                    {state.wells.map((x, index)=><Menu.Item key={`E${index}`}><EditFilled />{x.name}</Menu.Item>)}
                </Menu.SubMenu>
                {!state.is_external && <Menu.Item key='LS'>
                    <SaveFilled /> (
                        {JSON.parse(localStorage.getItem('liftings')) ?  JSON.parse(localStorage.getItem('liftings')).length: '0'}                                                
                        )
                </Menu.Item>}
                <Menu.Item disabled={state.wells.length >0?false:true} key='F3'><CloudUploadOutlined/> Finalizar</Menu.Item>               
                                                                
            </Menu>
        </Col>
    </Row>)
}

const styles = {
    menu: {
        borderRadius: '10px',
        paddingTop: '10px',
        paddingBottom: '10px',
        width:'200px',
        height:'90vh'
    },
    btn: {
        borderRadius: '10px',        
    }
}


export default HeaderNav