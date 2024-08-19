import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Login.scss'
import { ToastContainer } from 'react-toastify';
import { HandleLogin } from '../../services/userServices'
import * as actions from '../../store/actions'





class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            check: false,
            check_error: false,
            password: '',
            username: '',
            error_title: ''
        }


    }


    componentDidMount() {

    }

    SeeThePassWord = () => {
        this.setState({
            check: !this.state.check
        })
    }
    OneChangeInput = (event, name) => {
        let CopyState = { ...this.state };
        CopyState[name] = event.target.value;
        this.setState({
            ...CopyState
        })
    }
    OneClickLogin = async () => {
        let email = this.state.username;
        let password = this.state.password
        let res = await HandleLogin({
            email: email,
            password: password

        })
        if (res && res.data) {
            if (res.data.errCode !== 0) {
                this.setState({
                    error_title: res.data.message,
                    check_error: !this.state.check_error
                })

            } if (res.data.errCode === 0) {

                await this.props.HandleUserLoginSuccess(res.data.user)
                this.setState({
                    error_title: '',
                    username: '',
                    password: ''
                })
            }

        }
    }
    render() {
        return (
            <>
                <div id="back">
                    <div class="backRight"></div>
                    <div class="backLeft"></div>
                </div>

                <div id="slideBox">
                    <div class="topLayer">

                        <div class="right">
                            <div class="content">
                                <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>
                                <div>
                                    <div class="form-group">
                                        <label for="username" class="form-label">Username</label>
                                        <input type="text" value={this.state.username} onChange={(event) => this.OneChangeInput(event, 'username')} />
                                    </div>
                                    {this.state.check === false ?
                                        <div class="form-group">
                                            <label for="username" class="form-label">Password</label>
                                            <input type="password" value={this.state.password} onChange={(event) => this.OneChangeInput(event, 'password')} />
                                            <i class="fas fa-eye-slash" style={{ cursor: 'pointer' }} onClick={() => this.SeeThePassWord()}></i>

                                        </div>
                                        :
                                        <div class="form-group">
                                            <label for="username" class="form-label">Password</label>
                                            <input type="text" value={this.state.password} onChange={(event) => this.OneChangeInput(event, 'password')} />
                                            <i class="fas fa-eye" style={{ cursor: 'pointer' }} onClick={() => this.SeeThePassWord()}></i>

                                        </div>
                                    }






                                    <button id="login" type="submit" onClick={() => this.OneClickLogin()}>Login</button>
                                    {this.state.check_error === true &&
                                        <div className='error-title'>

                                            {this.state.error_title}

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        HandleUserLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);