import React, {useState} from 'react'
import moment from 'moment'

const CreateVacations = ({create}) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const today = new Date()

    const onSubmit = (ev) => {
        ev.preventDefault()
        create({startDate, endDate})
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="inputContainer">
                <span>Start Date </span>
                <input onChange={ev => setStartDate(ev.target.value)} type="text" name="start" placeholder={moment(today).format("MM/DD/YYYY")}/>
            </div>
            <div className="inputContainer">
                <span>End Date </span>
                <input onChange={ev => setEndDate(ev.target.value)} type="text" name="end" placeholder={moment(today).format("MM/DD/YYYY")}/>
            </div>
            <div>
                <button>Create</button>
            </div>
        </form>
    )
}

export default CreateVacations