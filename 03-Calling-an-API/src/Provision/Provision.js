import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { PROVISION_API_URL } from './../constants';
import axios from 'axios';

class Provision extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      appName: ''
    };
  }

  handleChange(e) {
    this.setState({ appName: e.target.value });
  }

  componentWillMount() {
    this.setState({ message: '' });
  }
  provisionApp() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${PROVISION_API_URL}/apps?appname=${this.state.appName}`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  listApps() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${PROVISION_API_URL}/apps/`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return (
      <div className="container">
        <h1>Developer Center - Application Management</h1>
        {
          !isAuthenticated() &&
            <p>Log in to call a private (secured) server endpoint.</p>
        }
        <form>
          <FormGroup
            controlId="appNameForm"
          >
            <ControlLabel>Provision a new application</ControlLabel>
            <FormControl
              type="text"
              value={this.state.appName}
              placeholder="Enter name for application"
              onChange={this.handleChange}
            />
          </FormGroup>
        </form>
        <Button bsStyle="primary" onClick={this.provisionApp.bind(this)}>Provision New App</Button>
        <br/><br/>
        {
          isAuthenticated() && (
              <Button bsStyle="primary" onClick={this.listApps.bind(this)}>
                List Apps
              </Button>
            )
        }
        <h2>{message}</h2>
      </div>
    );
  }
}

export default Provision;
