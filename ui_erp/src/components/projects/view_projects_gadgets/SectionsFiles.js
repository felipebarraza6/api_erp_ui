import React, { useState, useEffect } from 'react'
import api from '../../../api/endpoints'
import { Button, Tooltip, Descriptions } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import SingleElement from './SingleElement'

const SectionFiles = ({ elements }) => {

  console.log(elements)

    
    return(<>
        {elements && 
            
            elements.map((element)=> {
                return(<SingleElement element={element} />)
            })
        }
    </>)

}


export default SectionFiles
