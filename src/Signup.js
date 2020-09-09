import React from 'react';
import axios from  'axios';
import { Redirect,Link } from "react-router-dom"; 
export default class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            error: ''
        }
    }
    handleAttributeChange = (key, value) => {
        this.setState({
            [key]: value
        })
    } 

    handleSubmit = () => {
        const {name, email, password, passwordConfirmation} = this.state;
        if(password == passwordConfirmation){
            axios({
                url: `https://api.backendless.com/0986D2D2-BEEF-EA36-FF6E-BA4F295A1900/FF14D960-83CB-4063-B9E1-3A69EB2A1F9D/users/register`,
                method: 'POST',
                data: {
                    name: name,
                    email: email,
                    password: password
                }

            }).then((Response) => {

                   window.localStorage.href = '/login'

                
            }).catch((err) => {
                console.log(err)
            })
        } else { 
            this.setState({
                error: 'password not matching'
            })
        }

    }
    render(){
        return(
            <React.Fragment>
                <h1> Signup Form </h1>
                <div style={{width: '700px', margin: 'auto', marginTop: '100px'}}>
                <div className="form-group row">
                   <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                   <div className="col-sm-10">
                   <input
                    type="text" 
                    className="form-control" 
                    value={this.state.name}
                    onChange={(event) => {this.handleAttributeChange('name', event.target.value) }}
                    />
                   </div>
                </div>

            <div className="form-group row">
                   <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                   <div className="col-sm-10">
                   <input 
                   type="email" 
                   className="form-control"
                   value={this.state.email}
                   onChange={(event) => { this.handleAttributeChange('email', event.target.value) }} /> 
              </div>
             </div>

             <div className="form-group row">
                  <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                  <input
                   type="password"
                   className="form-control" 
                   value={this.state.password}
                   onChange={(event) => { this.handleAttributeChange('password', event.target.value) }} />
             </div>
            </div>

            <div className="form-group row">
                  <label for="inputPassword3" className="col-sm-2 col-form-label">passwordConfirmation</label>
                  <div className="col-sm-10">
                  <input 
                  type="password" 
                  className="form-control" 
                  value={this.state.passwordConfirmation}
                  onChange={(event) => { this.handleAttributeChange('passwordConfirmation', event.target.value) }} />
              </div>
            </div>

            {
                this.state.error && <p className= 'text-danger'>{this.state.error}</p>
            }
            
            <div className="form-group row">
            <div className="col-sm-10">
               <button className="btn btn-primary" onClick={this.handleSubmit}>Sign up</button>
    </div>
    <div className="col-sm-10" style={{textAlign: 'center'}}>
        <Link to="/login">Already have account? Login here</Link>
        </div>
      </div>      
  </div>
  </React.Fragment>
        )
    }
}
