import React, { useState, useEffect } from 'react'
import api from '../../../api/endpoints'
import { Table, Button, Modal, Select,
          Tooltip, Card, Descriptions,
          Row, Col, Collapse, notification } from 'antd'
import ResolutionForm from './ResolutionForm'
import { UserOutlined, CloudDownloadOutlined, EyeFilled, FileImageFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Option } = Select
const ExternalLiftings = () => {

    
    const [list, setList] = useState(null)
    const [enterprises, setEnterprises] = useState([])
    const [count, setCount] = useState(0)
    
    async function getData(){
      const rq = await api.liftings.list_external().then((r)=> {       
       setList(r.data.results)
      })
      const rq2 = await api.enterprises.get_total_enterprises().then((r)=>{
        setEnterprises(r.enterprises_actives.data.results)
      })
      
    }
    
    function modalRetrieveClient(client) {
      Modal.info({ 
        width: 750,
        icon:<UserOutlined />,
        okText: 'Volver',
        title: client.name_enterprise,
        content: <Descriptions bordered layout='horizontal' style={{marginTop:'50px'}} size='middle'>
                  <Descriptions.Item label='Nombre contacto' span={3}>
                    <b>{client.name_contact}</b>
                  </Descriptions.Item>            
                  <Descriptions.Item label='Teléfono' span={3}>
                    <b>{client.phone_contact}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Email' span={3}>
                    <b>{client.mail_contact}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Cargo contacto' span={3}>
                    <b>{client.workload}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Nombre empresa' span={3}>
                    <b>{client.name_enterprise}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Dirección empresa' span={3}>
                    <b>{client.address_enterprise}</b>
                  </Descriptions.Item>                  
          </Descriptions>
      })
    }
    
    function modalDataWells(wells) {
      Modal.info({
        width: '100%',  
        icon:<></>,    
        style: {top:0},
        okText:'Volver',  
        content: <Row justify='center' align='middle'>
          {wells.map((x)=> {
            return(<>
            <Col span={12} style={{padding:'5px'}}>
                <Card width={'700px'} bordered hoverable title={x.name} style={{border:'1px solid black', borderRadius:'10px'}}>
                <Collapse defaultActiveKey={'2'} style={{borderRadius:'10px'}}>
                  <Collapse.Panel key='1' header='Datos generales'>
                    <Descriptions size='small' bordered>
                    <Descriptions.Item span={4} label={<>Tipo captación</>}>
                    {x.pickup_type}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Dirección</>}>
                    {x.address_exact}
                  </Descriptions.Item>
                  {x.link_location && 
                    <Descriptions.Item span={3} label={<>Link ubicación</>} >
                        <a href={x.link_location} target='__blank'>Ver link</a>
                    </Descriptions.Item>
                  }
                    </Descriptions>
                  </Collapse.Panel>
                  <Collapse.Panel key='2' header='Datos del pozo'>
                    <Descriptions size='small' bordered>
                    <Descriptions.Item span={3} label={<>Caudal otorgado</>}>
                    {x.flow_granted_dga && parseFloat(x.flow_granted_dga).toFixed(2) } <span style={styles.span}>(Lt/SEG)</span>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Profundida instalación bomba</>}>                    
                    {x.pupm_depth && parseFloat(x.pupm_depth).toFixed(2)} <span style={styles.span}>(Mt)</span>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Diámetro interior pozo</>}>                    
                    {x.inside_diameter && parseFloat(x.inside_diameter).toFixed(2)} <span style={styles.span}>(MM/PULG)</span>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Diámetro exterior ducto salida bomba</>}>                    
                    {x.outside_diameter && parseFloat(x.outside_diameter).toFixed(2)} <span style={styles.span}>(MM/PULG)</span>
                  </Descriptions.Item>                  
                  <Descriptions.Item span={3} label={<>Profundida total del pozo</>}>
                  {x.depth && parseFloat(x.depth).toFixed(2)} <span style={styles.span}>(Mt)</span>                    
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Nivel estático </>}>
                    {x.static_level && parseFloat(x.static_level).toFixed(2)} <span style={styles.span}>(Mt)</span>                     
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Nivel dinámico</>}>                    
                    {x.dynamic_level && parseFloat(x.dynamic_level).toFixed(2)} <span style={styles.span}>(Mt)</span> 
                  </Descriptions.Item>                                                     
                  <Descriptions.Item span={3} label={<>Cuenta con flujometro? </>}>
                    {x.is_sensor_flow ? 'SI':'NO'}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Cuenta con factibilidad electrica? </>}>
                    {x.is_feasibility_electrical ? 'SI':'NO'}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label={<>Nota</>}>
                    <Button type='primary' size='small' style={{borderRadius:'5px'}} onClick={()=>Modal.info({content:<>{x.note}</>})}>Leer nota</Button>
                  </Descriptions.Item>
                    </Descriptions>
                    <Row justify='center' style={{marginTop:'15px'}}>
                {x.photos.map((file)=>
                    <Col span={8} style={{paddingRight:'3px', paddingLeft:'3px'}}>
                <Tooltip title='Has click para abrir la imagén!'>
                    <a icon={<FileImageFilled/>} type='ghost' style={{margin:'5px', marginTop:'20px'}} onClick={()=>window.open(`http://localhost:8000/${file.photo}`)}>                        
                        <img src={`http://localhost:8000/${file.photo}`} style={{width:'100%', borderRadius:'10px', }} />
                    </a></Tooltip></Col>)}</Row>
                  </Collapse.Panel>
                  <Collapse.Panel key='3' header='Resolución'>                    
                    <ResolutionForm well={x.id} />
                  </Collapse.Panel>
                </Collapse>
               
                
              </Card></Col></>)
          })}
        </Row>
      })
    }

    const onSelectClient = async(uuid, value) => {            
      const rq = await api.liftings.update(uuid, { client: value }).then((r)=>{
        if(value===null){
          notification.success({message:'Levantamiento sin cliente!'})  
        } else {
          notification.success({message:'Cliente asignado correctamente!'})  
        }        
        setCount(count+1)
      })
    }
    

    useEffect(() => {
      getData()
    }, [count])

    return(<>
    <a href="/liftings/external" target='__blank'><Button style={{marginBottom:'10px', borderRadius:'5px'}} type='primary' >Nuevo levantamiento externo</Button></a>
    <Table bordered
        columns = {[          
          {
            title: 'Contacto',
            render: (x)=> <>              
              {x.external_client.name_enterprise && <>              
              {x.external_client.name_enterprise.length < 8 ? 
               <Button 
               type='primary'
               ghost
               style={{textAlign:'left'}}
               block
               icon={<EyeFilled style={{marginRight:'5px'}} />}
               onClick={()=>modalRetrieveClient(x.external_client)}>
                  {x.external_client.name_enterprise}                                 
             </Button>:<Tooltip color={'#f50'} title={x.external_client.name_enterprise}><Button 
               type='primary'
               ghost
               style={{textAlign:'left'}}
               block
               icon={<EyeFilled style={{marginRight:'5px'}} />}
               onClick={()=>modalRetrieveClient(x.external_client)}>
                  {x.external_client.name_enterprise.slice(0,20)}...                                 
             </Button></Tooltip>
              }       </>}        
            </>
          },
          {
            title: 'Pozos',
            render: (x) => <>
            {x.external_client.name_enterprise && <>
              <Button 
                type='primary'
                ghost
                block
                icon={<EyeFilled />}
                onClick={()=> modalDataWells(x.wells)}>
                 {x.wells.length} {x.wells.length === 1 ? 'Pozo':'Pozos'}
              </Button></>}
            </>
          },
          {
            title: 'Fecha creación',
            render: (x) => {
              var date = new Date(x.created)
              var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' }
             return (<>
             {x.external_client.name_enterprise && <>
              {date.toLocaleDateString('es-ES', options).toUpperCase()}
              </>}
              </>)
            }
          },   
          {
            title: 'Cliente',
            render:(x)=><><Select style={styles.select} defaultValue={x.client ? x.client.id:null} onSelect={(value=>onSelectClient(x.uuid, value))} placeholder='Asignar a cliente'>              
              <Option value={null}>Levantamiento sin cliente</Option>
              {enterprises.map((enterprise)=><Option value={enterprise.id}>{enterprise.name}</Option>)}
            </Select>            
            </>
          }                          
        ]}
        dataSource={list}></Table></>)
}

const styles = {
  select: {
    minWidth:'250px'
  },
  span:{
    backgroundColor: '#1890ff',
    color: 'white',
    paddingRight:'3px',
    paddingLeft:'3px',
    paddingTop:'4px',
    paddingBottom:'4px',
    borderRadius:'4px',
    fontSize:'10px'
  }
}


export default ExternalLiftings
