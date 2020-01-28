import React from 'react'
import moment from 'moment'

const Vacations = ({vacations, destroy}) => {

    return (
        <div className="vacationsList">
            <ul>
                {
                    vacations.map(vacation => {
                        return (
                            <li key={vacation.id}>
                                <form onSubmit={(ev) => {
                                    ev.preventDefault()
                                    destroy(vacation)
                                }}>
                                    <p>Start Date: {moment(vacation.startDate).format('dddd MM/DD/YYYY')}</p>
                                    <p>End Date: {moment(vacation.EndDate).format('dddd MM/DD/YYYY')}</p>
                                    <button>Delete</button>
                                </form>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Vacations