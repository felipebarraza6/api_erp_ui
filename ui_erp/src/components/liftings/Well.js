
import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Card, Button, Alert, Tag, Tooltip, Typography, Upload } from 'antd'
import well_img from '../../build/images/re_well.png'
import { LiftingContext } from '../../containers/Lifting'
import { FileImageOutlined, PlusCircleFilled } from '@ant-design/icons'

const { Paragraph } = Typography

const Well = () => {

    const { state, dispatch } = useContext(LiftingContext)
    const [fileList, setFileList] = useState(state.photos)
    const [dataWell, setDataWell] = useState({})

    const props = {
        onRemove: (file) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          setFileList(newFileList)
          dispatch({
            type:'SET_IMAGE',
            payload: {
                list:newFileList
            }
          })
        },
        beforeUpload: (file) => {   
        setFileList([...fileList, file])   
          dispatch({
            type:'SET_IMAGE',
            payload: {
                list: [...fileList, file]
            }
          })
          return false
        },        
    }

    useEffect(()=> {
        if(state.photos.length==0){
            setFileList([])            
        } else {
            setFileList(state.photos)
        }

    },[state.photos, state.wellDraft])
    


    return(<Row justify='start' style={styles.row}>    
        <Col lg={6} xl={6} xs={24} >
        {window.innerWidth > 800 ? 
        <Tooltip overlayStyle={{backgroundColor:'#1890ff'}} title={<>
                <Paragraph style={{color:'white'}}>
                    Debes ingresar como minímo las siguientes fotos: 
                </Paragraph>
                <Paragraph style={{color:'white'}}>
                    1) Foto general del pozo.
                </Paragraph>
                <Paragraph style={{color:'white'}}>
                    2) Foto del lugar de emplazamiento del pozo.
                </Paragraph>
                <Paragraph style={{color:'white'}}>
                    3) Foto del detalle del ducto de salida del pozo.
                </Paragraph>            
            </>}>
            <Card hoverable={true} style={styles.card} >                        
            
            <Tag color={'blue'} style={styles.tag}><FileImageOutlined/> FOTOS {state.photos.length}</Tag>
            {state.photos.length===0&state.active_alert_img===true?
                <Paragraph style={{borderRadius:'6px', color:'rgb(194, 24, 7, 76)',backgroundColor:'rgb(194, 24, 7, 0.1)',border:'1px solid red', padding:'5px'}}>DEBES INGRESAR AL MENOS UNA IMÁGEN PARA CONTINUAR</Paragraph>:
                ''}
                <Upload {...props} fileList={fileList} >
                    <Button size='small' type='primary' icon={<PlusCircleFilled />} style={styles.btn}>Agregar</Button>            
                </Upload>
            </Card>
            </Tooltip>:
            <Card hoverable={true} style={styles.card} >      
            <Paragraph style={{color:'#262626'}}>
                   <b> Debes ingresar como minímo las siguientes fotos: </b>
                </Paragraph>
                <Paragraph style={{color:'#262626'}}>
                    1) Foto general del pozo.
                </Paragraph>
                <Paragraph style={{color:'#262626'}}>
                    2) Foto del lugar de emplazamiento del pozo.
                </Paragraph>
                <Paragraph style={{color:'#262626'}}>
                    3) Foto del detalle del ducto de salida del pozo.
                </Paragraph>                              
            <Tag color={'blue'} style={styles.tag}><FileImageOutlined/> FOTOS {state.photos.length}</Tag>
            {state.photos.length===0&state.active_alert_img===true?
                <Paragraph style={{borderRadius:'6px', color:'rgb(194, 24, 7, 76)',backgroundColor:'rgb(194, 24, 7, 0.1)',border:'1px solid red', padding:'5px'}}>DEBES INGRESAR AL MENOS UNA IMÁGEN PARA CONTINUAR</Paragraph>:
                ''}
                <Upload {...props} fileList={fileList} previewFile={false} >
                    <Button size='small' type='primary' icon={<PlusCircleFilled />} style={styles.btn}>Agregar</Button>            
                </Upload>
            </Card>
            }            
        </Col>
        {window.innerWidth > 800 && 
        <Col span={16} >
            <Row style={styles.colWell}>
                <Col span={24}>
                    <Tag color='blue' style={{...styles.tagsWell.tag1}}> 1) {state.wellTemp && state.wellTemp.flow_granted_dga} <b>Lt/SEG</b></Tag>
                    <Tag color='blue' style={{...styles.tagsWell.tag2}}> 2) {state.wellTemp && state.wellTemp.pupm_depth} <b>Mt</b></Tag>
                    <Tag color='blue' style={{...styles.tagsWell.tag3}}> 3) {state.wellTemp && state.wellTemp.inside_diameter} <b>MM/PULG</b></Tag>
                    <Tag color='blue' style={{...styles.tagsWell.tag4}}> 4) {state.wellTemp && state.wellTemp.outside_diameter} <b>MM/PULG</b></Tag>
                    <Tag color='blue' style={{...styles.tagsWell.tag5}}> 5) {state.wellTemp && state.wellTemp.depth} <b>Mt</b></Tag>
                    <Tag color='blue' style={{...styles.tagsWell.tag6}}> 6) {state.wellTemp && state.wellTemp.static_level} <b>Mt</b></Tag>
                    <Tag color='blue' style={{...styles.tagsWell.tag7}}> 7) {state.wellTemp && state.wellTemp.dynamic_level} <b>Mt</b></Tag>
                </Col>
            </Row>
        </Col>}
    </Row>)

}

const styles = {
    tagsWell: {
        tag1: {
            marginTop:'100px',marginLeft:'20px', position:'absolute', borderRadius:'10px'
        },
        tag2: {
            marginTop:'400px',marginLeft:'280px', position:'absolute', borderRadius:'10px'
        },
        tag3: {
            marginTop:'160px',marginLeft:'270px', position:'absolute', borderRadius:'10px'
        },
        tag4: {
            marginTop:'90px',marginLeft:'260px', position:'absolute', borderRadius:'10px'
        },
        tag5: {
            marginTop:'290px',marginLeft:'130px', position:'absolute', borderRadius:'10px'
        },
        tag6: {
            marginTop:'290px',marginLeft:'250px', position:'absolute', borderRadius:'10px'
        },
        tag7: {
            marginTop:'340px',marginLeft:'250px', position:'absolute', borderRadius:'10px'
        }
    },
    colWell: {
        backgroundImage:`url(${well_img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '500px'
        
        },

    card: {
        borderRadius:'10px',
        width:window.innerWidth<800 && '100%',
        marginLeft: window.innerWidth > 800 && '-35px',
        marginTop: window.innerWidth > 800 && '-40px', 
        backgroundColor:'white',
        border:'1px solid #white'       
    },
    row: {
        height: window.innerWidth > 800 ? '69vh':  '70vh'
    },
    btn: {
        borderRadius:'5px',   
        marginTop:'10px',        
        marginBottom:'10px',        
    },
    tag: {
        fontSize:'16px',
        borderRadius:'5px',        
        padding:'5px',
        marginBottom:'10px',
        
    },
    tagImage: {
        fontSize:'13px',
        borderRadius:'5px',                
        marginBottom: '6px'
    }
}


export default Well