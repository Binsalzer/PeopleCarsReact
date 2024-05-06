import React from 'react';
import withRouter from './withRouter';
import axios from 'axios';


class AddCar extends React.Component {

    state = {
        person: {},
        car: {
            make: '',
            model: '',
            year: '',
        }
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`/api/peopleCars/getbyid?id=${this.props.params.id}`)
        this.setState({ person: data })
    }


    onTextChange = e => {
        const copy = this.state.car
        copy[e.target.name] = e.target.value
        this.setState({ car: copy })
    }

    onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addcar', { ...this.state.car, personId: this.props.params.id });
        this.props.navigate('/');
    }

    render() {

        const { firstName, lastName } = this.state.person
        const {make, model, year }=this.state.car

        return (
            <div className='container' style={{ marginTop: '60px' }}>
                <div style={{ minHeight: '1000px', paddingTop: '200px' }}>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 card bg-light p-4'>
                            <h2>Add a Car for {firstName} {lastName}</h2>
                            <input type='text' className='form-control' name='make' placeholder='Make' value={make} onChange={this.onTextChange}></input>
                            <br></br>
                            <input type='text' className='form-control' name='model' placeholder='Model' value={model} onChange={this.onTextChange}></input>
                            <br></br>
                            <input type='text' className='form-control' name='year' placeholder='Year' value={year} onChange={this.onTextChange}></input>
                            <br></br>
                            <button className='btn btn-primary btn-lg btn-block' onClick={this.onSubmitClick }>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(AddCar)