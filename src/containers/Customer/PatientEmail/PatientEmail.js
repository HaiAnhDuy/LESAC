import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { VetifyEmailAppointmentService } from '../../../services/userServices'
import HomeHeader from '../HomeHeader';

import { toast } from 'react-toastify';
import './PatientEmail.scss'




class PatientEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {

            check: '',
            reload: true

        }
    }

    async componentDidMount() {
        let location = this.props.location
        if (location && location.search) {
            let urlParams = new URLSearchParams(location.search);
            let token = urlParams.get('token');
            let id_user = urlParams.get('id_user');


            let res = await VetifyEmailAppointmentService({
                token: token,
                id_user: id_user
            })
            if (res && res.errCode === 0) {
                this.setState({
                    check: true
                })
            }
            else {
                this.setState({
                    check: false
                })
            }

        }
    }
    componentDidUpdate(prevProps, prevState) {



    }
    Success = () => {
        return (
            <>
                <div className='succsess'>
                    bạn đã đặt hàng thành công !
                </div>
                <div className='img-suc'>

                </div>
                <div className='btn-patient-email'>
                    <button onClick={() => this.ToHomePage()}>
                        Trang chủ
                    </button>
                </div>
            </>
        )
    }

    False = () => {
        return (
            <>
                <div className='false'>
                    bạn đã đặt hàng thất bại
                </div>
                <div className='btn-patient-email'>
                    <button onClick={() => this.ToHomePage()}>
                        Trang chủ
                    </button>
                </div>
            </>
        )
    }
    ClickGoToCart = () => {
        this.props.history.push(`/cart`)
    }
    GoToProductHomePage = () => {
        this.props.history.push(`/product`)

    }
    ToHomePage = () => {
        this.props.history.push(`/home`)

    }
    render() {
        let { check, reload } = this.state

        return (

            <>
                <HomeHeader
                    reload={reload}
                    ClickGoToCart={this.ClickGoToCart}
                    GoToProductHomePage={this.GoToProductHomePage}
                    ToHomePage={this.ToHomePage}

                />
                {check === true ?
                    this.Success()
                    :
                    this.False()
                }
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // HanldeGetPatientEmailById: (id) => dispatch(actions.GetPatientEmailById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientEmail);
