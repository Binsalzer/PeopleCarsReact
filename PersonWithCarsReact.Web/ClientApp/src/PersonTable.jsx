import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';

class PersonTable extends React.Component {

    state = {
        people: []
    }

    loadPeople = async () => {
        const response = await axios.get('api/peopleCars/getall')
        this.setState({ people: response.data })
    }

    componentDidMount = () => {
        this.loadPeople()
    }

    onTextChange = e => {
        const copy = this.state.person
        copy[e.target.name] = e.target.value
        this.setState({person: copy})
    }


    render() {
        const { people } = this.props
        return (
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(p => <PersonRow
                        key={p.id}
                        person={p}
                    />)}
                </tbody>
            </table>
        )
    }
}


export default PersonTable