import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const {alerts} = alertContext;
    return (
        //if there is an alert in the alerts context
        alerts.length > 0 && alerts.map(alert => (
            <div key = {alert.id} className = {`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle'/> {alert.msg}
            </div>
        ))
    )
}

export default Alerts