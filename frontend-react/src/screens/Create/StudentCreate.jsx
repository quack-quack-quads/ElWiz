import { useState } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'

const StudentCreate = ()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const fields = [
        {   
            label : "Name",
            type :  "text",
            action : setName
        },
        {
            label : "Email",
            type :  "email",
            action : setEmail
        },
        {
            label : "Phone Number",
            type :  "text",
            action : setPhone
        }
    ]
    return <CreateForm 
            fields={fields} 
            entity="Student"
            heading={"Create a new Student"}
            description={"Fill in the following details to enter a new student into the database."}
        />
}

export default StudentCreate;