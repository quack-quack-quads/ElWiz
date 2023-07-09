import './Success.scss'
import wizard from '../../assets/wizard.png'
import {IoIosCloudDone} from 'react-icons/io'

const Success = ({message})=>{
    return <div className="Success d-flex flex-column align-items-center justify-content-center primary-container">
        <img src={wizard} alt="" className='wizard'/>
        <IoIosCloudDone size={80} className='done m-3'/>
        <div className="message">{message}</div>
    </div>
}

export default Success;