import React, { useState, useEffect } from 'react'

import { Steps, Button, Form, Input, Select,
        DatePicker, Spin, InputNumber, notification } from 'antd'

import { BuildOutlined, PhoneOutlined, MailOutlined, AimOutlined,
    ArrowRightOutlined, ArrowLeftOutlined, RocketOutlined, BuildTwoTone, 
    PushpinOutlined, ReconciliationOutlined, EditOutlined, IdcardOutlined, 
    DeleteFilled }
    from '@ant-design/icons'

//Actions    
import { updateEnterprise } from '../../actions/enterprises'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/es_ES'
import api from '../../api/endpoints'

//Resources
import geography from '../../resources/geography' 

const { Step } = Steps
const { Option } = Select

const FormSteps = (attr) =>{   
    
    const loading = attr.loading
    const [count, setCount] = useState(0)

    const [isOther, setIsOther] = useState(false)
    const [economicActivities, setEconomicActivities] = useState(null)

    const layout = {
        labelCol: { span:6 }
    }
  
    const submitForm = async(values) =>{       
        setGeo({
            ...geo,
            region: null,
            province: null,
            commune:null
        })

        if(values.date_jurisdiction){
            values = {
                ...values,
                'date_jurisdiction':moment(values.date_jurisdiction).format('YYYY-MM-DD')
            }
        }
      
      if(isOther){
        const rq = await api.enterprises.create_economic({'name':values.category}).then((r)=> {
          getData()
          setIsOther(false)
        })
      }
       updateEnterprise(attr.dispatch, attr.enterprise.id, values)
    }

    const [stepsEnterprise, setStepsEnterprise] = useState({
        current: 0
    })
    
    const [geo, setGeo] = useState({
        status:false,
        region: null,
        province: null,
        commune:null
    })

    const filterRegion = (value, index) =>{
        
        const searchIndex = index.key

        const query =geography.map((data) => {
            if(data.region === value){
                setGeo({...geo, province:data.provincias, region: searchIndex})
            }

            return value
        })

        return query        
    }
    
    const filterProvince = (value) =>{        
        const query = geography[geo.region].provincias[value]
        setGeo({
            ...geo,
            commune: query
        })
    }
    
    const current = stepsEnterprise.current

    const next = () => {
        
        const current = stepsEnterprise.current +1
        setStepsEnterprise({
            current: current
        })    
         
    }

    const prev = () =>{
        const current = stepsEnterprise.current - 1             
        setStepsEnterprise({
            current: current
        })   
    }

    let formData = {
        ...attr.enterprise,         
    }

    if(formData.date_jurisdiction){
        formData = {
            ...attr.enterprise,
            'date_jurisdiction':moment(attr.date_jurisdiction)         
        }
    }

    const getData = async() => {
      const rq = await api.enterprises.list_economic().then((res)=> {
        setEconomicActivities(res.data.results)
      }) 
    }

    const delteEconomic = async(id)=>{
      const rq = await api.enterprises.delete_economic(id).then((r)=> {
        notification.success({message:'Actividad eliminada correctamente'})
        setCount(count+1)
      })
    }

    useEffect(()=> {
      getData()
    }, [count])


    return(   
        <>         
        
        <Steps 
            current={stepsEnterprise.current} 
            style={{marginTop:'20px'}}
            type="navigation"
            size="small"
            >
            {attr.enterprise ? 
            <Step title={attr.enterprise.name} icon={<BuildTwoTone/>} />
            :
            <Step title="General" icon={<BuildTwoTone/>} />
            }
            
            
            <Step title="Ubicación" icon={<PushpinOutlined />}>                
            </Step>            
            <Step title="Datos" icon={<ReconciliationOutlined />}>                
            </Step>
                             
        </Steps>    

        <div className="steps-content"> 
        
        {loading? <Spin/> : <>
                        
            <Form
                {...layout}                
                onFinish = { submitForm }
                name="update_enterprise"
                layout="vertical"
                initialValues= {formData}
            >
                {attr.enterprise ? <>
                {current === 0 &&              
                    <>                
                    {attr.loading ? <Spin />:
                    <>                    
                         <Form.Item name="name" rules={[{ required: true, message: 'Ingresa el nombre de la empresa'}]}>
                            <Input name="name" maxLength={1200}  prefix={<BuildOutlined/>} type="text" placeholder={'Nombre'}  />
                        </Form.Item>
                        
                        <Form.Item name="rut" >
                            <Input name="rut" maxLength={20}  prefix={<IdcardOutlined/>} type="text" placeholder={'Rut'}  />
                        </Form.Item>
                                            
                        
                        <Form.Item name="phone_number" >
                            <Input name="phone_number" prefix={<><PhoneOutlined/></>} type="text" placeholder="Telefono" />
                        </Form.Item>
                        
                        <Form.Item name="email" >
                            <Input name="email" prefix={<MailOutlined />} type="email" placeholder="Email"/>
                        </Form.Item>
                    
                    </>
                    }
                        
                        
                    </>                           
                }
               {current === 1 &&
                    <>  
                        <Form.Item label="Región" name="region" rules={[{ required: false, message: 'Selecciona una región'}]} >                            
                            
                            <Select placeholder={"Seleccionar región"} onSelect={(value, index)=> filterRegion(value, index)}>                                
                            {geography.map((option, index)=> (
                                
                            <Option key={index} value ={option.region}> {option.region_number} - {option.region}({option.region_iso_3166_2})</Option>
                                
                            ))}
                            </Select>
                            
                            
                        </Form.Item>
                                
                        
                        <Form.Item label="Provincia" name="province" rules={[{ required: false, message: 'Selecciona una provincia'}]}>
                                
                                {geo.province ? 

                                <Select placeholder="Provincias" onSelect={(key, value) =>filterProvince(value.key)}>                                
                                    {geo.province.map((item, index) => 
                                      <Option key={index} value={item.name} >{item.name}</Option>                                                                        
                                    )}
                                </Select>
                                : 
                                <Select placeholder="Provincia" disabled ></Select>
                                
                                }
                            
                           
                        </Form.Item>                                                   
                        <Form.Item label="Comuna" name="commune" rules={[{ required: false, message: 'Selecciona una comuna'}]}>
                        
                            {geo.commune ?
                            <Select placeholder="Comuna" >  
                               {geo.commune.comunas.map(item =>
                                <Option key={item.code} value={item.name}>{item.name}</Option>
                               )}
                            </Select>
                            
                            :
                            <Select disabled placeholder="Comuna"></Select>
                            }
                            
                        </Form.Item>                    
                      
                        <Form.Item name="address_exact" rules={[{ required: false, message: 'Ingresa la direccion'}]}>
                            <Input type='text' prefix={<AimOutlined />} placeholder="Ingresa la dirección exacta"/>
                        </Form.Item>             
                    </>
               }
               {current === 2 && 
                    <>
                        {attr.enterprise.type_client === 'Planta APR' &&
                            <>
                            <Form.Item label="Tipo Organización" name="administered" rules={[{ required: false, message: 'Selecciona una opcion'}]}>                                
                                <Select placeholder="Administrado por" >
                                    <Option value="Comite" >Comite</Option>
                                    <Option value="Cooperativa">Cooperativa</Option>
                                </Select>                            
                            </Form.Item>
                            <Form.Item name="amount_regularized" label="Cantidad de pozos">
                                <InputNumber style={{width:'100%'}} placeholder="Numero de pozos"/>
                            </Form.Item>
                            <Form.Item name="date_jurisdiction">
                                <DatePicker locale={locale} size={'large'} style={{width:'100%'}} placeholder="Fecha de Constitución"/>
                            </Form.Item>
                            </> 
                        }
                        
                            <>
                            <Form.Item name="amount_regularized" label="Cantidad de pozos">
                                <InputNumber style={{width:'100%'}} placeholder="Numero de pozos"/>
                            </Form.Item>
                            <Form.Item name="flow_rates" label="Cantidad de pozos regularizados">
                                <Input style={{width:'100%'}} placeholder="Numero de pozos regularizados"/>
                            </Form.Item>
                            <Form.Item label="Actividad economica" name="category" rules={[{ required: false, message: 'Selecciona una opcion'}]}>                                
                              {isOther ? <Input />:
                                <Select onSelect={(value)=>value === 'Otro' ? setIsOther(true):setIsOther(false)} placeholder="Selecciona una opción" >
                                {economicActivities.map((x)=><><Option value={x.name}>{x.name} <Button style={{zIndex:'4'}} shape='circle' size='small' danger onClick={()=>delteEconomic(x.id)}><DeleteFilled /></Button></Option></>)}                                      
                                  <Option value="Otro">Otro</Option>
                                </Select>}                  
                            </Form.Item>
                            </>
                            
                    </>
               }
                
               </>
                
                :
                <div style={{paddingTop:'100px', paddingBottom:'180px'}}>
                    Selecciona una empresay has click en (<EditOutlined style={{color:'#1890ff'}} />) para editar y revisar sus datos    
                </div>   
                             
                }

<div className="steps-action">           
        {attr.enterprise ? <>
            {stepsEnterprise.current > 0 && <Button  type="primary" shape="circle" icon={<ArrowLeftOutlined/>} className="margin-btn-steps" onClick={() => prev() }></Button>}

            {stepsEnterprise.current === 0  && <Button type="primary" shape="circle" icon={<ArrowRightOutlined/>} className="margin-btn-steps" onClick={() => next() }></Button>}  

            {stepsEnterprise.current === 1  && <Button type="primary" shape="circle" icon={<ArrowRightOutlined/>} className="margin-btn-steps" onClick={() => next() }></Button>}  
            

            {stepsEnterprise.current & attr.enterprise.type_client ==='Planta APR' ? <Button type="primary" shape="circle" icon={<ArrowRightOutlined/>} className="margin-btn-steps" onClick={() => next() }></Button>: ''}

            {stepsEnterprise.current === 0 ? <Button type="primary" htmlType="submit" className="margin-btn-steps" icon={<RocketOutlined style={{ marginRight:'10px', fontSize:'20px' }}/>} >GUARDAR</Button>:
                                            <Button type="primary" htmlType="submit" className="margin-btn-steps" icon={<RocketOutlined style={{ marginRight:'10px', fontSize:'20px' }}/>} >GUARDAR</Button>                                                    
                                    
        }
        </> : <>
            <Button shape="circle" icon={<ArrowLeftOutlined/>} className="margin-btn-steps" type="disabled"></Button>
            <Button shape="circle" icon={<ArrowRightOutlined/>} className="margin-btn-steps" type="disabled"></Button>
            <Button type="primary" className="margin-btn-steps" disabled icon={<RocketOutlined style={{ marginRight:'10px', fontSize:'20px' }}/>} >GUARDAR</Button>                                                    
        </>}
            </div>
            
        </Form>

            </>
        }
        </div>
           
        </>
        
    )
}

export default FormSteps
