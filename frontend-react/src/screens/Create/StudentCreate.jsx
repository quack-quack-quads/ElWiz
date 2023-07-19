import { useState } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Success from '../../components/Success/Success'
import { createStudentAPICall } from '../../services'
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from '../../store';

const StudentCreate = ()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [waiting, setWaiting] = useState(false)
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

    const students = useSelector(state => state.students);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token)

    const create = ()=>{
        setWaiting(true)
        createStudentAPICall(JSON.stringify({
            name : name, 
            email : email,
            phoneNumber : phone
        }), token).then((response)=>{
            if(response.status === 200){
                const newStudentList =[...students, response.data]
                dispatch(setStudents(newStudentList))
                setMode(true)
            }
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setWaiting(false)
        })
    }

    const [mode, setMode] = useState(false)

    if(mode) return <Success message={"Successfully created student"}/>
    return <CreateForm 
            fields={fields} 
            entity="Student"
            heading={"Create a new Student"}
            description={"Fill in the following details to enter a new student into the database."}
            submithandler={create}
            waiting={waiting}
        />
}

export default StudentCreate;