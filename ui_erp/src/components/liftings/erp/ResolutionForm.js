import React, { useState, useEffect } from 'react'
import { Row, Col, Form, 
        Button, Input, Select, 
        DatePicker, message, Tag } from 'antd'

import { SaveFilled } from '@ant-design/icons'

import moment from 'moment'
import api from '../../../api/endpoints'



const ResolutionForm = ({ well }) => {

    var todayDate = moment(new Date).format('YYYY-MM-DD')

    console.log(todayDate)

    const [form] = Form.useForm() 
    const [dateInstalationMedition, setDateInstalationMedition] = useState('')
    const [dateInstalatioTransmision, setDateInstalationTransmision] = useState('')
    const [viewBtn, setViewBtn] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [initialValues, setInitialValues] = useState(null)
    const [count, setCount] = useState(0)

    const onChangeDate = (date) => {        
        if(date){
            setDisabledBtn(false)
        }
    }

    const onChangeSelectStandar = (value) =>{        
        if(value==='mayor'){                   
            const date_medition = moment(form.getFieldValue('daily_publication_date'))
            const date_transmision = moment(form.getFieldValue('daily_publication_date'))
            date_medition.add(4, 'months')
            date_transmision.add(5, 'months')            
            setDateInstalationMedition(moment(date_medition).format('YYYY-MM-DD'))
            setDateInstalationTransmision(moment(date_transmision).format('YYYY-MM-DD'))
        }
        if(value==='medio'){                   
            const date_medition = moment(form.getFieldValue('daily_publication_date'))
            const date_transmision = moment(form.getFieldValue('daily_publication_date'))
            date_medition.add(10, 'months')
            date_transmision.add(12, 'months')            
            setDateInstalationMedition(moment(date_medition).format('YYYY-MM-DD'))
            setDateInstalationTransmision(moment(date_transmision).format('YYYY-MM-DD'))
        }
        if(value==='menor'){                   
            const date_medition = moment(form.getFieldValue('daily_publication_date'))
            const date_transmision = moment(form.getFieldValue('daily_publication_date'))
            date_medition.add(20, 'months')
            date_transmision.add(26, 'months')            
            setDateInstalationMedition(moment(date_medition).format('YYYY-MM-DD'))
            setDateInstalationTransmision(moment(date_transmision).format('YYYY-MM-DD'))
        }
        if(value==='muy_pequeno'){                   
            const date_medition = moment(form.getFieldValue('daily_publication_date'))
            const date_transmision = moment(form.getFieldValue('daily_publication_date'))
            date_medition.add(24, 'months')
            date_transmision.add(30, 'months')            
            setDateInstalationMedition(moment(date_medition).format('YYYY-MM-DD'))
            setDateInstalationTransmision(moment(date_transmision).format('YYYY-MM-DD'))
        }
    }

    const onFinish = async(values) => {
        values = {
            ...values,
            initial_transmission_term: dateInstalationMedition,
            term_installation_measurement: dateInstalatioTransmision,
            well: well,
            daily_publication_date: moment(values.daily_publication_date).format('YYYY-MM-DD')
        }
        if(!initialValues){
            const rq = await api.liftings.wells.resolution_info.create(values).then((r)=>{
                message.success({content:'Información de resolución cargada!'})
            })
        } else {
            const rq = await api.liftings.wells.resolution_info.update(values, initialValues.id).then((r)=>{
                message.success({content:'Información guardada correctamente!'})
            })            
        }
        setCount(count+1)
        
        
    }

    const getWellInfo = async(well) => {
        const rq = await api.liftings.wells.resolution_info.retrieve(well).then((r)=>{
            if(r.data.count>0){
                setViewBtn(true)
                setDisabledBtn(false)
                setInitialValues(r.data.results[0])
                form.setFieldsValue({
                    dga_resolution: r.data.results[0].dga_resolution,
                    shac: r.data.results[0].shac,
                    daily_publication_date: moment(r.data.results[0].daily_publication_date),
                    dga_standard: r.data.results[0].dga_standard,                    
                })
                setDateInstalationMedition(moment(r.data.results[0].initial_transmission_term).format('YYYY-MM-DD'))
                setDateInstalationTransmision(moment(r.data.results[0].term_installation_measurement).format('YYYY-MM-DD'))
                
            }
        })
    }

    useEffect(()=>{

        getWellInfo(well)

    }, [count])



    return(<Row className='my-select-container'>        
        <Col>        
            <Form onFinish={onFinish} layout='vertical' form={form} >
                <Row>
                    <Col span={12} style={{paddingRight:'5px'}}>
                <Form.Item name='dga_resolution' label='Nº Resolución DGA Regional'>                    
                    <Input style={{...styles.input}} placeholder='Resolución DGA' />
                </Form.Item>                
                </Col>
                <Col span={12} style={{paddingLeft:'5px'}}>
                <Form.Item name='shac' label='SHAC'>
                    <Input style={{...styles.input}} placeholder='SHAC' />
                </Form.Item>
                </Col>
                <Col span={12} style={{paddingRight:'5px'}}>
                <Form.Item name='daily_publication_date' label='Publicación Diario Oficial'>                    
                    <DatePicker onChange={onChangeDate} style={{...styles.input, width:'100%'}} placeholder='Fecha publicación Diario Oficial' />
                </Form.Item>
                </Col>
                <Col span={12} style={{paddingLeft:'5px'}}>
                <Form.Item name='dga_standard' label='Estándar DGA'>
                    <Select onSelect={()=>setViewBtn(true)} onChange={onChangeSelectStandar} disabled={disabledBtn} dropdownStyle={styles.input} style={{...styles.input}} placeholder='Estándar DGA'>                        
                        <Select.Option value='mayor'>Mayor</Select.Option>
                        <Select.Option value='medio'>Medio</Select.Option>
                        <Select.Option value='menor'>Menor</Select.Option>
                        <Select.Option value='muy_pequeno'>Caudales muy pequeños</Select.Option>
                    </Select>
                </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item style={{marginTop:'20px'}}>

                    <p >
                    Plazo instalación sistema de medición: <b> {dateInstalationMedition && 
                        <Tag color={dateInstalationMedition>todayDate ? 'green':'red'}>{dateInstalationMedition}</Tag>}
                        
                        </b> <br/><br/>
                    Plazo comenzar transmisión: <b>
                        {dateInstalationMedition &&  
                        <Tag color={dateInstalatioTransmision>todayDate ? 'green':'red'}>{dateInstalatioTransmision}</Tag>
                        }</b>
                    </p>                    
                </Form.Item>
                </Col>         
                <Col span={24} style={{marginTop:'-20px'}}>
                {viewBtn &&  
                    <Form.Item>                    
                        <Button htmlType='submit' style={styles.btn} type='primary' icon={<SaveFilled />}>
                            {initialValues ? 'Guardar':'Crear'}</Button>                        
                    </Form.Item>} 
                    </Col>       
                    </Row>            
            </Form>
        </Col>
    </Row>)

}

const styles = {
    input: {
        borderRadius:'10px',
        margin: '5px',
        
    },
    btn: {
        borderRadius: '10px'
    }
}

export default ResolutionForm