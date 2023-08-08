import React, {useContext, useState} from 'react'
import { Form, Typography, Input, 
    Upload, Button, Spin, notification } from 'antd'
    import {
        UploadOutlined,
        LoadingOutlined,
      } from "@ant-design/icons";
import api from '../../../api/endpoints';
import { AuthContext } from '../../../App';
import { useLocation } from "react-router-dom"
const { Title } = Typography
const { TextArea } = Input

const FormUpload = ({ properties, element, count, setCount, countA, setCountA }) => {
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const {state} = useContext(AuthContext)

    const props = {
        onRemove: (file) => {
         form.setFieldValue({
            file: file
         }) 
        },
        beforeUpload: (file) => {   
          form.setFieldValue({
            file: file
         }) 
          return false
        },        
    }

    const onFinish = async(values) => {
      setLoading(true)
      values = {
        ...values, 
        file: values.file.file,
        type_element: element.id,
        code: values.code ? values.code:'',
        user: state.user.id,
        project: location.pathname.slice(10)
      }

      var list=[]
      Object.entries(values).forEach(([key, value]) => {
        list.push({'key':key, 'value':value})
      })
      
      const rq = api.projects.values_elements.create(list).then((r)=>{        
        setLoading(false)
        form.resetFields()
        notification.success({message:'Archivo subido correctamente!'})
        setCountA(count+1)
        setCount(count+1)
      }).catch((e)=>{
        console.log(e)
        setLoading(false)
      })
    }

    return(<Form form={form} onFinish={onFinish} layout="vertical">
    <Title level={4} style={{borderRadius:'7px', textAlign:'center', color:'white',backgroundColor: properties && properties.color
        }}
    >Formulario de carga</Title>
    <Form.Item name='name' rules={[{required: true, message: 'Debes ingresar el nombre'}]}>
      <Input prefix="Nombre: " />
    </Form.Item>
    <Form.Item name='note'>
      <TextArea placeholder="agregar nota" rows={3}  />
    </Form.Item>
    <Form.Item name='code'>
      <Input prefix="Código archivo: " />
    </Form.Item>
    <Form.Item name='file' rules={[{required: true, message: 'Debes seleccionar tu archivo'}]}>
      <Upload
        {...props}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        maxCount={1}
        showUploadList={true}>
        Seleccionar archivo
      </Upload>
    </Form.Item>
    <Form.Item>
      {loading && 
        <LoadingOutlined style={{color:properties&&properties.color, fontSize:'20px'}} />}
    </Form.Item>
    <Form.Item>
      <Button
        type="primary"
        size="small"
        htmlType='submit'
        icon={<UploadOutlined />}
        style={{ marginRight: '10px' }}>
        Subir archivo
      </Button>
      <Button  size='small' onClick={()=>form.resetFields()}>Limpiar</Button>
    </Form.Item>
  </Form>)
}


export default FormUpload
