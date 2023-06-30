
import React, {useEffect, useState} from 'react'
import { Table, Button, Popconfirm, notification } from 'antd'
import api from '../../api/endpoints'
import { EditOutlined, ProfileOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const ListProjects = ({count, setSelectClient, setCount}) => {

    const [list, setList] = useState([])

    const getData = async()=>{
        const rq = api.projects.project.list().then((r)=> {
            setList(r.data.results)
        })
    }

    useEffect(()=> {
        getData()
    }, [count])

    const processSelectClient = (x) => {
        x = {
            ...x,
            client: x.client.id
        }
        setSelectClient(x)
    }

    const onDeleteProject = async(id) => {
        const rq = await api.projects.project.delete(id).then((r)=> {
            notification.error({message:'PROYECTO ELIMINADO CORRECTAMENTE'})
            setCount(count+1)
        })
    }

    const columns = [        
        {title: 'Cliente', render:(x)=> x.client.name},
        {title:'Servicio', dataIndex:'name', key:'name'},
        {title:'FECHA', dataIndex:'created', render:(x)=><>{x.slice(0,10)} H{x.slice(11,19)}</>},
        {title:'Codigo', dataIndex:'code_internal', key:'code_internal'},
        {render:(x)=> <>
            <Button onClick={()=>processSelectClient(x)} icon={<EditOutlined />} style={styles.btn} size='small' type='primary'>Editar</Button>
            <Link to={`/projects/${x.id}`}>
            <Button  icon={<ProfileOutlined />} style={{...styles.btn, backgroundColor: '#d48806', borderColor:'#d48806'}} size='small' type='primary'>Ver proyecto</Button>
            </Link>
            <Popconfirm onConfirm={()=>onDeleteProject(x.id)} title='¿Seguro que quieres eliminar este proyecto y toda información relacionada con el?'>
                <Button icon={<DeleteOutlined />} style={styles.btn} size='small' type='primary' danger>Eliminar</Button>
            </Popconfirm>
        </>}
    ]

    return(<Table size={'small'} dataSource={list} columns={columns} bordered title={()=>'Listado proyectos'} />
        
    )

}


const styles = {
    btn: {
        margin:'5px'
    }
}


export default ListProjects