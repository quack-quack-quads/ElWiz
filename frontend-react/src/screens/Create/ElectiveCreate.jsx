import { useState } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Success from '../../components/Success/Success'

const ElectiveCreate = ()=>{
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
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
    return <CreateForm 
            fields={fields} 
            entity="Elective"
            heading={"Create a new Elective"}
            description={"Fill in the following details to enter a new elective into the database."}
        />
}

export default ElectiveCreate;