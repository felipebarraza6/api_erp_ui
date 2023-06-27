export const reducer = (state, action) =>{

    switch (action.type) {
        case 'SET_TYPE_LIFTING_EXTERNAL':
            return {
                ...state,
                is_external: true
            }    

        case 'SET_TYPE_LIFTING_INTERNAL':
            return {
                ...state,
                is_external: false
            }    
        
        case 'SET_CURRENT':
            return {
                    ...state,
                    steps: {
                        ...state.steps,
                        current: action.payload.current
                    }
                }   
            
        case 'SET_CLIENT':
            return {
                ...state,
                    client_external: {
                        ...state.client_external,
                        name_contact: action.payload.name_contact,
                        name_enterprise: action.payload.name_enterprise,
                        address_enterprise: action.payload.address_enterprise,
                        workload: action.payload.workload,
                        phone_contact: action.payload.phone_contact,
                        mail_contact: action.payload.mail_contact,
                        is_draft: true
                    }
                }   
        case 'SET_IMAGE': 
                return {
                    ...state,
                    photos: action.payload.list
                }    
        case 'ADD_WELL':
                return  {
                    ...state,
                    wells: [...state.wells, action.payload.well],
                    wellTemp: {}
                }     
        case 'RESET_SELECT_WELL':
            return {
                ...state,
                selected_well: null
            }
        case 'ADD_SELECT_WELL':            
            if(state.wells[action.payload.id.slice(1)]===undefined){

                } else {
                    return {
                        ...state,
                        selected_well: {...state.wells[action.payload.id.slice(1)], id:action.payload.id.slice(1)},
                        photos: state.wells[action.payload.id.slice(1)].photos,
                        conunt_form: state.conunt_form+1,
                        wellTemp: {...state.wells[action.payload.id.slice(1)], id:action.payload.id.slice(1)}
                         
                        
                    } 
                }
                if(action.payload.id){
                    return {
                    ...state,
                    selected_well: state.wells[action.payload.id.slice(1)],
                    conunt_form: state.conunt_form+1,
                    wellTemp: state.wells[action.payload.id.slice(1)]
                    
                    }    
                } else {
                    return {
                        ...state,
                        selected_well: null,
                        conunt_form: state.conunt_form+1,
                        wellTemp: {}             
                    }                        
            }     
                
                
        case 'UPDATE_WELL':                
                
                state.wells[action.payload.id] = action.payload.well
                return {
                    ...state, 
                    selected_well: null,
                    photos: [], 
                    wellTemp: {}              
                    
            }
        case 'ACTIVE_DEACTIVATE_ALERT_IMG':
                return {
                    ...state,
                    active_alert_img: action.payload.status 
            }

        case 'COUNT_FORM_SUM':
                return {
                    ...state,
                    conunt_form: state.conunt_form +1
            }
        case 'SET_CLIENT_API':
                return {
                    ...state,
                    client_api: action.payload.client
                }
        case 'ADD_ITEM_WELL_DRAFT':
                return {
                    ...state, 
                    wellTemp: {
                        ...state.wellTemp,
                        [action.payload.field]: action.payload.value
                    }
            }

        case 'CLEAR_VALUES_WELL_DRAFT':
                return {
                    ...state,
                    wellTemp: {}
                }
            case 'RESET_ALL_APP_INTERNAL':
                return {
                    is_external: false,
                    client_api: null,
                    client_external: {
                        id_client:null,
                        name_contact: null,
                        name_enterprise: null,
                        mail_contact: null,
                        phone_contact: null,
                        address_enterprise: null,
                        workload: null,
                        is_draft: false
                    },
                    wellTemp: {},
                    wells: [],
                    selected_well: null,
                    photos: [],
                    steps: {
                        current: '22',            
                    },
                    active_alert_img: false,
                    conunt_form: 0
                }

        default:
            return state
    }

}