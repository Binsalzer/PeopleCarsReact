import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PersonTable from './PersonTable';

class Home extends React.Component {

    state = {
        people: [],
        searchText: ''
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
        this.setState({ person: copy })
    }

    onSearchTextChange = async e => {

        await this.setState({ searchText: e.target.value })
        this.updateSearchResults()
    }

    onClearClick = () => {
        this.setState({ searchText: '' })
        this.loadPeople()
    }

    updateSearchResults = () => {
        const { people, searchText } = this.state

        if (searchText === '') {
            this.loadPeople()
        } else {
            let matches = []


            for (const p of people) {
                if (p.firstName.toLowerCase().includes(searchText.toLowerCase()) || p.lastName.toLowerCase().includes(searchText.toLowerCase())) {
                    matches.push(p)
                }
            }
            this.setState({people:matches})
        }
    }

    render() {

        const { people, searchText } = this.state

        return (
            <div className='container' style={{ marginTop: '60px' }}>
                <div style={{ backgroundColor: 'white', minHeight: '1000px', paddingTop: '10px' }}>
                    <div className='row'>
                        <div className='col-md-10'>
                            <input type='text' className='form-control form-control-lg' placeholder='Search People' value={searchText} onChange={this.onSearchTextChange}></input>
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark btn-lg w-100' onClick={this.onClearClick}>Clear</button>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-md-12' style={{ marginBottom: '20px' }}>
                            <Link to='/addperson' style={{ textDecoration: 'none' }}>
                                <button className='btn btn-success btn-lg w-100'>Add Person</button>
                            </Link>
                        </div>
                    </div>
                    <PersonTable people={people} />
                </div>
            </div>
        )
    }
}


export default Home