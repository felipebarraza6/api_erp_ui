import React, { useEffect, useState} from 'react'
import { Typography, Col, Row,
          Table, Tag, Card, Badge } from "antd";
import api from '../../api/endpoints_telemetry'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
const { Title } = Typography

const Home = () => {

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const getData = async(page) => {
    const rq1 = await api.wells.list(page).then((r)=>{
      setData(r.results)
      setTotal(r.count)
    })

    console.log(rq1)
  }

  

  useEffect(() => {
    getData(page)
  }, [page]);

  return(<Row>
    <Col span={24}>
      <Title level={3}>Puntos de captacion activos ({total})</Title>
    </Col>
    <Col span={24}>
      <Table rowKey='id' pagination={{total:total, onChange:(page)=>setPage(page)}} bordered size={'small'} dataSource={data}
      expandable={{
        expandedRowRender: (record) => <Row align={'middle'}>
          <Col span={8}>
            <Card style={{margin:'5px'}} title='Credenciales Ikolu' hoverable>
              <b>usuario:</b> {record.user.email} <br/>
              <b>clave:</b> {record.user.txt_password} <br/><br/>
              <b>último inicio de sesión:</b> {record.user.last_login && record.user.last_login.slice(0,10)} {record.user.last_login && record.user.last_login.slice(11,16)}
            </Card>
          </Col>
          <Col span={8} >
            <Card style={{margin:'5px'}} title='Caracteristicas del pozo' hoverable>
              <b>Profundidad de pozo:</b> {record.d1} <br/>
              <b>Posicionamiento de bomba:</b> {record.d2} <br/>
              <b>Posicionamiento del sensor de nivel:</b> {record.d3}<br/>
              <b>Diámetro ducto de salida bomba:</b> {record.d4}<br/>
              <b>Diámetro flujometro:</b> {record.d5}
            </Card>
          </Col>
          <Col span={8} >
            <Card style={{margin:'5px'}} title='Variables' hoverable>
              {record.is_prom_flow ? <Tag style={{marginBottom:'10px'}} color='blue-inverse'>Cudal Promedio</Tag>:<Tag style={{marginBottom:'10px'}} color='blue'>Caudal Instantaneo</Tag>}<br/>
              {record.variables.map((variable)=><Tag color='geekblue-inverse'>{variable.type_variable}: {variable.str_variable}</Tag>)}
            </Card>
          </Col>
        </Row>,
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      columns={[
        { title:'Nombre', dataIndex:'title' },
        { title:'Estandar', dataIndex:'standard' },
        { title:'Pulsos', dataIndex:'scale' },
        { title:'Proveedor', dataIndex:'is_thethings', render: (is_thethings)=>is_thethings ? 'The Things': 'Novus'},
        { title:'Fecha ultimo dato', dataIndex:'last_data', render: (last_data)=><Tag>{last_data.date_time_medition && last_data.date_time_medition.slice(0,10)} {last_data.date_time_medition && last_data.date_time_medition.slice(11,16)}</Tag>},
        { title:'Caudal', dataIndex:'last_data', render: (last_data)=> 
          <Tag color={last_data.flow>=0?'blue':'red'}>{last_data.flow}</Tag>  },
        { title:'Nivel', dataIndex:'last_data', render: (last_data)=> 
          <Tag color={last_data.nivel>=0?'blue':'red'}>{last_data.nivel}</Tag>  },
        { title:'Acumulado', dataIndex:'last_data', render: (last_data)=> 
          <Tag color='blue'>{last_data.total}</Tag>  },
          { title:'Habilitado DGA', render: (well)=> 
        well.is_send_dga ? <> <Tag icon={<CheckCircleFilled />} color='green'>{well.code_dga_site}</Tag></>:<CloseCircleFilled style={{color:'red'}} />  },
          { title:'Envio DGA', dataIndex:'last_data', render: (last_data)=> 
          last_data.is_send_dga ? <><Badge status='success' style={{marginRight:'5px'}} /> Activo</>:<><Badge style={{marginRight:'5px'}} status='error' /> Sin conexion</>  },
          
      ]} />
    </Col>
  </Row>)
}


export default Home