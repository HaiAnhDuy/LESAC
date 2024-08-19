import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TotalTable.scss'
import NumberFormat from 'react-number-format';

import * as actions from "../../../../../store/actions";
import { toast } from 'react-toastify';





class TotalTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

            total: '',



        }
    }

    async componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let id = this.props.match.params.id;
        //     this.setState({
        //         id: id
        //     })
        // }
        if (this.props.total) {
            this.setState({
                total: this.props.total
            })
        }





    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.total !== this.props.total) {

            this.setState({
                total: this.props.total,
            })


        }



    }
    ClickToCheckout = () => {
        let { data } = this.props;
        if (data && data.length > 0) {
            this.props.ClickGoToCheckOut()
        } else {
            toast.error('Vui lòng lấp đầy giỏ hàng !')
        }
    }


    render() {
        let { total } = this.state
        // console.log('data_cart_by_id_user', data_cart_by_id_user)
        return (
            <>
                <div className='total-table-container'>
                    <div className='content-total'>
                        <p className='content-p'>
                            Summary
                        </p>
                        <div className='thin-total'>

                        </div>

                    </div>
                    <div className='detail-total'>
                        <div className='content-1'>
                            <p className='content-1-left'>
                                Subtotal
                            </p>
                            <p className='content-1-right'>
                                {
                                    !total
                                        ?
                                        0 + ' ' + 'VND'
                                        :
                                        <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                }                            </p>
                        </div>
                        <div className='content-2'>
                            <p className='content-2-left' >
                                Sale
                            </p>
                            <p className='content-2-right' style={{ float: 'right' }}>
                                0 VND
                            </p>
                        </div>
                        <div className='thin-total'>

                        </div>
                    </div>
                    <div className='subtotal'>
                        <div className='subtotal-1'>
                            <span className='subtotal-1-left'>
                                Subtotal
                            </span>
                            <span className='subtotal-1-right'>
                                {
                                    !total
                                        ?
                                        0 + ' ' + 'VND'
                                        :
                                        <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                }
                            </span>
                        </div>
                    </div>
                    <button className='btn-total' onClick={() => this.ClickToCheckout()}>
                        Check out
                    </button>
                </div>
                <div className='total-table-container-2'>
                    <div className='content-total'>
                        <p className='content-p'>
                            Summary
                        </p>
                        <div className='thin-total'>

                        </div>

                    </div>
                    <div className='detail-total'>
                        <div className='content-1'>
                            <p className='content-1-left'>
                                Subtotal
                            </p>
                            <p className='content-1-right'>
                                {
                                    !total
                                        ?
                                        0 + ' ' + 'VND'
                                        :
                                        <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                }                            </p>
                        </div>
                        <div className='content-2'>
                            <p className='content-2-left' >
                                Sale
                            </p>
                            <p className='content-2-right' style={{ float: 'right' }}>
                                0 VND
                            </p>
                        </div>
                        <div className='thin-total'>

                        </div>
                    </div>
                    <div className='subtotal'>
                        <div className='subtotal-1'>
                            <span className='subtotal-1-left'>
                                Subtotal
                            </span>
                            <span className='subtotal-1-right'>
                                {
                                    !total
                                        ?
                                        0 + ' ' + 'VND'
                                        :
                                        <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                }
                            </span>
                        </div>
                    </div>
                    <button className='btn-total' onClick={() => this.ClickToCheckout()}>
                        Check out
                    </button>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,


        // all_data_Product: state.admin.all_data_Product

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalTable);
