import React from 'react';

class CarRow extends React.Component {
    render() {

        const { make, model, year } = this.props.car

        return (
            <tr>
                <td>{make}</td>
                <td>{model}</td>
                <td>{year}</td>
            </tr>
        )
    }
}



export default CarRow