import React, { useState } from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import axios from 'axios'


import './AuthPage.scss'



export default function AuthPage() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({...form,  [event.target.name]: event.target.value})
        console.log(form);
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form, }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))
        } catch (error) {
            console.error(error)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form, }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <BrowserRouter>
        <Switch>
            <>
            <div className="container">
                <div className="auth-page">
                    <Route path="/login">
                    <h3>Sign in</h3>
                        <form className='form form-login' onSubmit={e => e.preventDefault()}>
                            <div className="row">
                            <div className="input-field col s12">
                                    <input
                                        id='email'
                                        type="email" 
                                        name='email'
                                        className='validate'
                                        onChange={changeHandler}    
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        id='password'
                                        type="password" 
                                        name='password'
                                        className='validate'  
                                        onChange={changeHandler}  
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <button
                                    className='wawes-effect wawes-light btn green'
                                    onClick={loginHandler}
                                >
                                    Sign in
                                </button>

                                <Link to="/registration" className="btn-outline btn-reg">New to ToDo App? Create an account</Link>
                            </div>
                        </form>
                    </Route>

                    <Route path="/registration">
                    <h3>Sign up</h3>
                        <form className='form form-login' onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        id='email'
                                        type="email" 
                                        name='email'
                                        className='validate'
                                        onChange={changeHandler}     
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <input 
                                        id='password'
                                        type="password" 
                                        name='password'
                                        className='validate'
                                        onChange={changeHandler}     
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                </div>
                            <div className="row">
                                <button
                                    className='wawes-effect wawes-light btn green'
                                    onClick={registerHandler}
                                >
                                    Registration
                                </button>
                                <Link to="/login" className="btn-outline btn-reg">Already have an account? Sign in</Link>
                            </div>
                        </form>
                    </Route>
                </div>
            </div>
            </>
        </Switch>
    </BrowserRouter>

  )
}
