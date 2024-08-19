import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Policy.scss'
import * as actions from "../../store/actions";


// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
class Policy extends Component {



    render() {

        return (
            <>
                <div className='policy-container-2'>
                    <div className='elenment-policy-1'>
                        <div className='policy-title'>
                            HỖ TRỢ PHÍ SHIP
                        </div>
                        <div className='policy-content'>
                            Mua 02 sản phẩm bất kì giảm 30.000đ/ đơn <br></br>
                            Mua 01 sản phẩm túi + 01 sản phẩm ví giảm 20.000đ/ đơn<br></br>
                            Mua 02 sản phẩm ví giảm 10.000đ/ đơn
                        </div>
                    </div>
                    <div className='elenment-policy-2'>
                        <div className='policy-title'>
                            BẢO HÀNH
                        </div>
                        <div className='policy-content'>
                            Khách hàng có thể 1 đổi 1 trong 7 ngày <br></br>
                            (Với những lỗi do nhà sản xuất)
                        </div>
                    </div>
                    <div className='elenment-policy-3'>
                        <div className='policy-title'>
                            HÌNH THỨC THANH TOÁN
                        </div>
                        <div className='policy-content'>
                            Thanh toán khi nhận hàng và chuyển khoản
                        </div>
                    </div>
                </div>
                <div className='policy-container'>
                    <div className='elenment-policy-1'>
                        <div className='policy-title'>
                            HỖ TRỢ PHÍ SHIP
                        </div>
                        <div className='policy-content'>
                            Mua 02 sản phẩm bất kì giảm 30.000đ/ đơn <br></br>
                            Mua 01 sản phẩm túi + 01 sản phẩm ví giảm 20.000đ/ đơn<br></br>
                            Mua 02 sản phẩm ví giảm 10.000đ/ đơn
                        </div>
                    </div>
                    <div className='elenment-policy-2'>
                        <div className='policy-title'>
                            BẢO HÀNH
                        </div>
                        <div className='policy-content'>
                            Khách hàng có thể 1 đổi 1 trong 7 ngày <br></br>
                            (Với những lỗi do nhà sản xuất)
                        </div>
                    </div>
                    <div className='elenment-policy-3'>
                        <div className='policy-title'>
                            HÌNH THỨC THANH TOÁN
                        </div>
                        <div className='policy-content'>
                            Thanh toán khi nhận hàng và chuyển khoản
                        </div>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
