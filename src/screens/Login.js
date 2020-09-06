import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import {signUp, logIn} from '../config/firebase';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            isRegisterForm: false,
            registerFormError: "",
            userName: "",
            userEmail: "",
            userPassword: "",
            userConfirmPassword: false,
            userZip: "",
            userAge: "",
            userTNC: false,
            showError: false,
            userLoginEmail: "",
            userLoginPassword: "",
            userStatus: 0,
        }
        this.handleForms = this.handleForms.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleUserEmail = this.handleUserEmail.bind(this);
        this.handleUserPassword = this.handleUserPassword.bind(this);
        this.handleUserConfirmPassword = this.handleUserConfirmPassword.bind(this);
        this.handleUserZip = this.handleUserZip.bind(this);
        this.handleUserAge = this.handleUserAge.bind(this);
        this.handleCreateAccountBtn = this.handleCreateAccountBtn.bind(this);
        this.handleUserTNC = this.handleUserTNC.bind(this);
        this.handleLoginNowBtn = this.handleLoginNowBtn.bind(this);
    }

    handleForms() {
        const { isRegisterForm } = this.state;
        if (isRegisterForm) {
            this.setState({ isRegisterForm: false });
        } else {
            this.setState({ isRegisterForm: true });
        }
    }

    handleUserName(e) {
        const userName = e;
        const userNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
        if (userName.match(userNameFormate)) {
            this.setState({
                showError: false,
                registerFormError: "",
                userName: userName,
            });
        } else {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid name.",
                userName: "",
            });
        }
    }

    handleUserEmail(e) {
        const userEmail = e;
        const userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (userEmail.match(userEmailFormate)) {
            this.setState({
                showError: false,
                registerFormError: "",
                userEmail: userEmail,
            });
        } else {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid email address.",
                userEmail: ""
            });
        }
    }

    handleUserPassword(e) {
        const userPassword = e;
        const userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        if (userPassword.match(userPasswordFormate)) {
            this.setState({
                showError: false,
                registerFormError: "",
                userPassword: userPassword,
            });
        } else {
            this.setState({
                showError: true,
                registerFormError: "Use alphanumeric, uppercase, lowercase & greater than 10 characters.",
                userPassword: "",
            });
        }
    }

    handleUserConfirmPassword(e) {
        const userConfirmPassword = e;
        const { userPassword } = this.state;
        if (userConfirmPassword.match(userPassword)) {
            this.setState({
                showError: false,
                registerFormError: "",
                userConfirmPassword: true,
            });
        } else {
            this.setState({
                showError: true,
                registerFormError: "Confirmation password not matched.",
                userConfirmPassword: false,
            });
        }
    }

    handleUserZip(e) {
        const userZip = e;
        const userZipFormate = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if (userZip.match(userZipFormate)) {
            this.setState({
                showError: false,
                registerFormError: "",
                userZip: userZip,
            });
        } else {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid zip code.",
                userZip: "",
            });
        }
    }


    handleUserAge(e) {
        const userAge = e;
        if (userAge > 0 && userAge < 101) {
            this.setState({
                showError: false,
                registerFormError: "",
                userAge: userAge,
            });
        } else {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid age.",
                userAge: "",
            });
        }
    }

    handleUserTNC() {
        const { userTNC } = this.state
        if (!userTNC) {
            this.setState({
                userTNC: true,
                showError: false,
                registerFormError: "",
            })
        } else {
            this.setState({
                userTNC: false,
                showError: true,
                registerFormError: "Please accept terms and conditions.",
            })
        }
    }

    async handleCreateAccountBtn() {
        const { userName, userEmail, userPassword, userConfirmPassword, userZip, userAge, userStatus, userTNC } = this.state;

        // const whiteSpaces = /^(?!\s*$)[-a-zA-Z0-9_:,.' ']{1,100}$/;
        const userNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
        const userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        const userZipFormate = /^[0-9]{5}(?:-[0-9]{4})?$/;

        if (!userName.match(userNameFormate)) {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid name.",
            });
        } else if (!userEmail.match(userEmailFormate)) {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid email address.",
                userEmail: ""
            });
        } else if (!userPassword.match(userPasswordFormate)) {
            this.setState({
                showError: true,
                registerFormError: "Use alphanumeric, uppercase, lowercase & greater than 10 characters.",
                userPassword: "",
            });
        } else if (!userConfirmPassword) {
            this.setState({
                showError: true,
                registerFormError: "Confirmation password not matched.",
                userConfirmPassword: false,
            });
        } else if (!userZip.match(userZipFormate)) {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid zip code.",
                userZip: "",
            });
        } else if (!(userAge > 0 && userAge < 101)) {
            this.setState({
                showError: true,
                registerFormError: "Please enter a valid age.",
                userAge: "",
            });
        } else if (!userTNC) {
            this.setState({
                userTNC: false,
                showError: true,
                registerFormError: "Please accept terms and conditions.",
            })
        } else {
            // console.log(userName, userEmail, userPassword, userConfirmPassword, userCity, userCountry, userGender, userAge, userProfileImage, userTNC)
            const userDetails = {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userZip: userZip,
                userAge: userAge,
                userStatus: userStatus,
            }
            try {
                const signUpReturn = await signUp(userDetails)
                // console.log(signUpReturn)
            }catch(error){
                console.log("Error in Sign up => ",error)
            }
        }
    }

    async handleLoginNowBtn(){
        const { userLoginEmail, userLoginPassword } = this.state;
        const userLoginDetails = {
            userLoginEmail: userLoginEmail,
            userLoginPassword: userLoginPassword,
            propsHistory: this.props.history,
        }
        try {
            const LoginReturn = await logIn(userLoginDetails)
            // console.log(LoginReturn)
        }catch(error){
            console.log("Error in Login => ",error)
        }
    }

    render() {
        const { isRegisterForm, showError, registerFormError, userProfileImageLable, userTNC, userGender } = this.state;
        return (
            <div>
                <div className="container-fluid register-cont1">
                    <div className="">
                        {/* <Navbar history={this.props.history} /> */}
                        <Navbar2 history={this.props.history} />
                        <div className="container register-cont1-text">
                            <h1 className="text-uppercase text-white text-center mb-4"><strong>User Login / Register</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-5 bg-light">
                    {isRegisterForm ?
                        <div className="col-lg-6 col-md-8 col-sm-12 mx-auto bg-white shadow p-4">
                            <h2 className="text-center mb-4">Create an Account</h2>
                            <form action="javascript:void(0)">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="userFullName">Full Name</label>
                                        <input type="text" className="form-control" id="userName" placeholder="Full Name" onKeyUp={(e) => this.handleUserName(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="userEmail">Email</label>
                                        <input type="email" className="form-control" id="userEmail" placeholder="Email" onKeyUp={(e) => this.handleUserEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="userPassword">Password</label>
                                        <input type="password" className="form-control" id="userPassword" placeholder="Password" onKeyUp={(e) => this.handleUserPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="userConfirmPassword">Confirm Password</label>
                                        <input type="password" className="form-control" id="userConfirmPassword" placeholder="Password" onKeyUp={(e) => this.handleUserConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="userZip">Zip</label>
                                        <input type="text" className="form-control" id="userZip" onKeyUp={(e) => this.handleUserZip(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label htmlFor="userAge">Age</label>
                                        <input type="number" className="form-control" id="userAge" onKeyUp={(e) => this.handleUserAge(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="userTNC" defaultChecked={userTNC} onChange={this.handleUserTNC} />
                                        <label className="custom-control-label" htmlFor="userTNC">Accept Terms and Conditions</label>
                                    </div>
                                </div>
                                <p className="text-danger">{showError ? registerFormError : null}</p>
                                <button type="submit" className="btn btn-warning text-uppercase mb-3" onClick={this.handleCreateAccountBtn}><b>Create an Account</b></button>
                            </form>
                            <p className="m-0">Already have an account? <span className="cursor-pointer text-warning" onClick={this.handleForms}>Login Here</span></p>
                        </div> :
                        <div className="col-lg-4 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
                            <h2 className="text-center mb-4">Login Your Account</h2>
                            <form action="javascript:void(0)">
                                <div className="form-group">
                                    <label htmlFor="userLoginEmail">Email</label>
                                    <input type="email" className="form-control" id="userLoginEmail" placeholder="Email" onChange={(e) => this.setState({userLoginEmail: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userLoginPassword">Password</label>
                                    <input type="password" className="form-control" id="userLoginPassword" placeholder="Password" onChange={(e) => this.setState({userLoginPassword: e.target.value})} />
                                </div>
                                <button type="submit" className="btn btn-warning text-uppercase mb-3" onClick={this.handleLoginNowBtn}><b>Login Now</b></button>
                            </form>
                            <p className="m-0">Don't have an account yet? <span className="cursor-pointer text-warning" onClick={this.handleForms}>Create an Account</span></p>
                        </div>
                    }
                </div>
                <Footer />
            </div>
        );
    }
}