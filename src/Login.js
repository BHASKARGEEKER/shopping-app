import React, { createRef } from 'react';
import axios from 'axios';

export default class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.emailRef = createRef(); //reference
    }

    componentDidMount(){
        this.emailRef.current.focus();
    }

    handleAttributeChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleLogin = () => {
        const { email, password } = this.state;

        axios({
            url: 'https://api.backendless.com/0986D2D2-BEEF-EA36-FF6E-BA4F295A1900/FF14D960-83CB-4063-B9E1-3A69EB2A1F9D/users/login',
            method: 'POST',
            data: {
                login: email,
                password: password
            }
        }).then((response) => {
            sessionStorage.setItem('user-session-token', response.data["user-token"])
            window.location.href = '/'
        }).catch((err) => {
            console.log(err)
        })
    }


    render(){
        return(
            <React.Fragment>
                <h1>Login Form</h1>
                <div style={{width: '500px', margin: 'auto', marginTop: '100px'}}>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">

                          <input
                            ref={this.emailRef}
                            type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={(event) => { this.handleAttributeChange('email', event.target.value) }}
                        />

                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">

                         <input
                            type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={(event) => { this.handleAttributeChange('password', event.target.value) }}
                        />

                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10">
                          <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                        </div>
                        <div className="col-sm-10" style={{textAlign: 'center'}}>
                            <a href="/signup">Don't have  account? Singup here</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 