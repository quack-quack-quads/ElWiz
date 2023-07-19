import { useState } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Success from '../../components/Success/Success'
import { createElectiveAPICall } from '../../services'
import { setElectives } from "../../store";
import { useDispatch, useSelector } from "react-redux";


const ElectiveCreate = ()=>{
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const electives = useSelector(state => state.electives);
    const dispatch = useDispatch();

    const token = useSelector(state => state.token)

    const create = ()=>{
        createElectiveAPICall(JSON.stringify({
            code : code,
            name : name, 
            description : description
        }), token).then((response)=>{
            if(response.status === 200){
                const newElectiveList =[...electives, response.data]
                dispatch(setElectives(newElectiveList))
                setMode(true)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const [mode, setMode] = useState(false)

    const fields = [
        {
            label : "Elective Code",
            type :  "text",
            action : setCode
        },
        {   
            label : "Name",
            type :  "text",
            action : setName
        },
        {
            label : "description",
            type :  "text",
            action : setDescription
        }
    ]
    if(mode) return <Success message={"Successfully created elective"}/>
    return <CreateForm 
            fields={fields} 
            entity="Elective"
            heading={"Create a new Elective"}
            description={"Fill in the following details to enter a new elective into the database."}
            submithandler={create}
        />
}

export default ElectiveCreate;