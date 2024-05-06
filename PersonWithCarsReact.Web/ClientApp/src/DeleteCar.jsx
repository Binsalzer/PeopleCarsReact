import React from 'react';
import withRouter from './withRouter';
import axios from 'axios';
import CarRow from './CarRow';
import { Link } from 'react-router-dom';

class DeleteCar extends React.Component {

    state = {
        cars: [],
        searchText:''
    }


    componentDidMount = async () => {
        this.loadCars()
    }

    loadCars = async () => {
        const { data } = await axios.get(`/api/peopleCars/getcarsforperson?id=${this.props.params.id}`)
        this.setState({ cars: data })
    }

    onDeleteClick = async () => {
        await axios.post('/api/peopleCars/delete',  this.state.cars )
        this.props.navigate('/')
    }

    onTextChange = async e => {

        await this.setState({ searchText: e.target.value })
        this.updateSearchResults()
    }

    onClearClick = () => {
        this.setState({ searchText: '' })
        this.loadCars()
    }

    updateSearchResults = () => {
        const { cars, searchText } = this.state

        if (searchText === '') {
            this.loadCars()
        } else {
            let matches = []

            for (const c of cars) {
                if (c.make.toLowerCase().includes(searchText.toLowerCase()) || c.model.toLowerCase().includes(searchText.toLowerCase())) {
                    matches.push(c)
                }
            }
            this.setState({ cars: matches })
        }
    }

    render() {

        const {cars, searchText }=this.state

        return (
            <div className='container' style={{ marginTop: '60px' }}>
                <div style={{ backgroundColor: 'white', minHeight: '1000px', paddingTop: '10px' }}>
                    <div className='row'>
                        <div className='col-md-10'>
                            <input type='text' className='form-control form-control-lg' placeholder='Search Cars' value={searchText} onChange={this.onTextChange }></input>
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark btn-lg w-100' onClick={this.onClearClick }>Clear</button>
                        </div>
                    </div>
                    <div className='row-mt-5'>
                        <div className='col-md-12'>
                            <table className='table table-hover table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map(c => <CarRow
                                        key={c.id}
                                        car={c }
                                    />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3>Are you sure you want to delete all of these cars?</h3>
                        </div>
                        <div className='col-md-6' style={{ marginTop: '20px' }}>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                            <button className='btn btn-primary btn-lg w-100'>No</button>
                            </Link>
                        </div>
                        <div className='col-md-6' style={{ marginTop: '20px' }}>
                            <button className='btn btn-danger btn-lg w-100' onClick={this.onDeleteClick }>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(DeleteCar)