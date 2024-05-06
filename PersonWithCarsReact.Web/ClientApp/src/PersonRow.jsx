import React from 'react';
import { Link } from 'react-router-dom';

class PersonRow extends React.Component {
    render() {

        const { id, firstName, lastName, age, cars } = this.props.person

        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>{cars.length}</td>
                <td>
                    <Link to={`/addcar/${id}`}>
                        <button className='btn btn-primary'>Add Car</button>
                    </Link>
                </td>
                <td>
                    <Link to={`/deletecar/${id}`}>
                        <button className='btn btn-danger'>Delete Car</button>
                    </Link>
                </td>
            </tr>
        )
    }
}



export default PersonRow