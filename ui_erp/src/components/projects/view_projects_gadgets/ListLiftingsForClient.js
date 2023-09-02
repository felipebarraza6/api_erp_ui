import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Typography, Button, notification } from 'antd'
import api from '../../../api/endpoints'
import PreviewLifting from './PreviewLifting'


const ListLiftingsForClient = ({id_client, dataProject, count, setCount}) => {

    const [listLiftings, setListLiftings] = useState([])
    const [selectUuid, setUuid] = useState(null)

    const getData = async() => {
        const rq = api.liftings.list_general(id_client).then((r)=>{
            console.log(r)
            setListLiftings(r.data.results)
        })
    }

    const updateLifting = async()=>{
        const rq = await api.projects.project.update(dataProject.id, { lifting:selectUuid }).then((r)=> {
            notification.success({message:'LEVANTAMIENTO ENLAZADO!'})
            setCount(count+1)
        })
    }

    const cleanLifting = async()=>{
        const rq = await api.projects.project.update(dataProject.id, { lifting:null }).then((r)=> {
            notification.success({message:'LEVANTAMIENTO ELIMINADO!'})
            setUuid(null)
            setCount(count+1)
        })
    }

    useEffect(()=>{
        if(dataProject.lifting){
            setUuid(dataProject.lifting)
            getData()
        } else {
            getData()
        }
        
    }, [])

    return(<Row>
        <Col span={12}>
            <Typography.Title level={5}>Selecciona un levantamiento para ver su información</Typography.Title>
            
           <Select defaultValue={dataProject.lifting?selectUuid:null} onSelect={(x)=>setUuid(x)} style={{width:'100%'}} placeholder='Selecciona un levantamiento'>
                {listLiftings.map((e)=> {

                 return(<Select.Option value={e.uuid} >
                            FECHA: <b>{e.created.slice(0,10)}</b> <b>{e.external_client ? `/ CONTACTO: ${e.external_client.name_contact.toUpperCase()}`:`/ CLIENTE: ${e.client.name}`}</b>
                 </Select.Option>)
                }
                )}                
            </Select>
            {selectUuid && <>
                {!dataProject.lifting ? <Button onClick={updateLifting} style={{marginTop:'20px'}} type='primary'>Enlazar levantamiento</Button>:
                <Button onClick={cleanLifting} style={{marginTop:'20px'}} type='primary'>Limpiar selección</Button> 
                }
                </>}
        </Col>
        <Col span={12}>
            {selectUuid && 
            <PreviewLifting uuid={selectUuid} />}
        </Col>
    </Row>)
}


export default ListLiftingsForClient