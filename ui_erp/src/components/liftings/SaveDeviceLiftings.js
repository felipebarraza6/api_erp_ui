import React from 'react'
import { Row, Col, Typography,Card, Button, Collapse, notification } from 'antd'
import api from '../../api/endpoints'

const { Title } = Typography

const SaveDerviceLiftings = () => {

    const liftings = JSON.parse(localStorage.getItem('liftings'))

    const processWElls = (wells) => {
        const re_format_key = (key)=> {
            var str_return = `${key}`
            if(key==='name '){
                str_return='nombre'
            } else if(key==='address_exact'){
                str_return='coordenadas'
            } else if(key==='flow_granted_dga'){
                str_return='caudal otorgado'
            } else if(key==='pupm_depth'){
                str_return='profundidad instalacion bomba'
            } else if(key==='inside_diameter'){
                str_return='diametro interno'
            } else if(key==='outside_diameter'){
                str_return='diametro externo'
            }else if(key==='pickup_type'){
                str_return='tipo de captacion'                                    
            } else if(key==='depth'){
                str_return='profundidad'                                    
            } else if(key==='static_level'){
                str_return='nivel estatico'                                    
            } else if(key==='dynamic_level'){
                str_return='nivel dinamico'                                    
            } else if(key==='is_sensor_flow'){
                str_return='tiene sensor de flujo'                                    
            } else if(key==='is_feasibility_electrical'){
                str_return='tiene factibilidad electrica'                                    
            } else if(key==='note'){
                str_return='nota'                                    
            } else if(key==='name'){
                str_return='nombre'                                    
            } else if(key==='photos'){
                str_return='fotos'                                    
            }                                                                                                                  
            else {
                str_return=`${key}`
            }

            return(str_return)
        }

        var list_view_g = []

        wells.forEach(function(obj2){
            var list_view = []
            Object.keys(obj2).forEach(function(clave) {                
                var valor = obj2[clave];  
                if(clave!=='photos'){
                    list_view.push(`${re_format_key(clave)}: ${valor}`)
                } else {
                    list_view.push(`${re_format_key(clave)}: ${valor.length}`)
                }                          
            })
            list_view_g.push(list_view)
        })

       return (<Collapse style={{borderRadius:'10px'}} >
            {list_view_g.map((e)=> <Collapse.Panel header={e[0].slice(7).toLowerCase()}>{e.map((e, index )=>index!==0 &&<div>{e}</div>)}</Collapse.Panel>)}            
            </Collapse>)
       
         
    }

    const deleteLifting = (index) => {
        // Obtener la lista del localStorage
        var lista = JSON.parse(localStorage.getItem('liftings'));

        // Verificar si la lista existe y tiene elementos
        if (lista && lista.length > 0) {
        var posicion = index; // Posición del elemento a eliminar (por ejemplo, el tercer elemento)

        // Verificar si la posición es válida
        if (posicion >= 0 && posicion < lista.length) {
            // Eliminar el elemento del array
            lista.splice(posicion, 1);

            // Guardar el array modificado en el localStorage
            localStorage.setItem('liftings', JSON.stringify(lista));

            console.log('Elemento eliminado correctamente.');
            notification.success({message:'Levantamiento eliminado correctamente!'})
            window.location.reload()
        } else {
            console.log('La posición especificada es inválida.');
        }
        } else {
        console.log('La lista no existe o está vacía.');
        }

    }

    const sendData = async(data, index) => {
        data = JSON.parse(data)
        console.log(data)
        data = { 
            ...data,
            client: data.client,                
            is_external: false
        }
        const rq = await api.liftings.create(data).then(async(r)=>{            
            data.wells.map(async(object)=>{                
                const rq_well = await api.liftings.wells.create({
                    lifting: r.data.uuid,
                    is_dga: true,
                    ...object
                }).then(async(res)=>{  
                    notification.success({message:'Información enviada correctamente!'})
                                deleteLifting(index)  
                    if(object.photos.length>0){
                        object.photos.map(async(photo)=> {
                            console.log(photo)
                            var rq_photo = await api.liftings.wells.photo({file: photo, id:res.data.id}).then((response)=>{
                                notification.success({message:'Información enviada correctamente!'})
                                deleteLifting(index)  
                               
                            })                            
                        })                                
                    } else {
                        notification.success({message:'Información enviada correctamente!'})  
                        deleteLifting(index)
                       
                    }     
                                    
                })
            })
        })
    }

    return(<Row>
        <Col span={24}>
            <Title level={3}>Levantamientos realizados sin subir a plataforma</Title>
        </Col>
        {liftings.map((lifint, index)=>{
            var json_parse_lifting = JSON.parse(lifint)
            return(<Col xl={6} lg={6} xs={24} style={{marginRight:'10px'}} ><Card title={json_parse_lifting.client_data.name} hoverable style={styles.card} extra={<><u>POZOS</u>: <b>{json_parse_lifting.wells.length}</b></>}>
                <Row justify='center'>                    
                    <Col span={24}>
                        <center><Button style={styles.btn} onClick={()=>sendData(lifint, index)} type='primary'>Subir levantamiento</Button></center>
                    </Col>
                    <Col span={24}>
                        <center><Button style={styles.btn} onClick={()=>deleteLifting(index)} danger>Eliminar</Button></center>
                    </Col>         
                    <Col span={24} style={{marginTop:'20px'}}>
                       {processWElls(json_parse_lifting.wells)} 

                        
                    </Col>       
                </Row>
            </Card></Col>)
        })}
        
    </Row>)

}

const styles = {
    btn: {
        borderRadius:'5px',
        marginTop:'5px',
        marginBottom:'5px'
    },
    card:{
        width:'100%',
        borderRadius:'10px'
    }
}

export default SaveDerviceLiftings