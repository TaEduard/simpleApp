import React, { Component } from 'react'
import { create } from 'apisauce'

const baseURL = process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:8080'

export default class DataDisplay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gotData: false,
      data: []
    }
  }
  async componentDidMount() {
    const api = create({ baseURL })
    const { ok, problem, data } = await api.get(`/data`)
    if (ok) {
      this.setState({ data: data.data, gotData: true })
    } else {
      console.log(problem)
    }
  }

  renderData() {
    const data = [...this.state.data]
    if (this.state.gotData) {
      if (data.length > 0) {
        return (<div>{data.map(entry => { return (<div key={entry.id}>{`${entry.id} : ${entry.Data}`}</div>) })}</div>)
      }
    }
    return (<div className='middle' >No data in mysql.</div>)
  }

  render() {

    return (
      <>
        {this.renderData()}
      </>
    )
  }

}

