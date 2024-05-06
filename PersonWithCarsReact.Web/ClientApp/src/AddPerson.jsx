import React from 'react';
import axios from 'axios';
import withRouter from './withRouter';

class AddPerson extends React.Component {

    state = {
        person: {}
    }

    onTextChange = e => {
        const copy = this.state.person
        copy[e.target.name] = e.target.value
        this.setState({ person: copy })
    }

    resetPerson = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }

    onSumbitClick = () => {
        axios.post('api/peopleCars/addPerson', this.state.person)
        this.resetPerson()
        this.props.navigate('/')
    }

    render() {

        const { firstName, lastName, age } = this.state.person

        return (
            <div className='container' style={{ marginTop: '60px' }}>
                <div style={{ minHeight: '1000px', paddingTop: '200px' }}>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 card-bg-light p-4'>
                            <h2>Add a New Person</h2>
                            <input type='text' className='form-control' name='firstName' placeholder='First Name' onChange={this.onTextChange} value={firstName}></input>
                            <br></br>
                            <input type='text' className='form-control' name='lastName' placeholder='Last Name' onChange={this.onTextChange} value={lastName}></input>
                            <br></br>
                            <input type='text' className='form-control' name='age' placeholder='Age' onChange={this.onTextChange} value={age}></input>
                            <br></br>
                            <button className='btn btn-primary btn-lg btn-block' onClick={this.onSumbitClick}>Sumbit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(AddPerson)