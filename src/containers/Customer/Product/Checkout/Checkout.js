import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Checkout.scss'
import HomeHeader from '../../HomeHeader';
import * as actions from "../../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import { PatientBookingAppointmentService, GetNameColorByHex } from '../../../../services/userServices'
import LesacOnme from '../../LesacOnme';
import HomeBottom from '../../HomeBottom';
import NumberFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: '',
            length_array: '',
            color: '',
            data_checkout_by_id_user: '',
            data_product_by_categories: '',
            name_color: '',
            value_quantity: 1,
            choose_ship: false,

            full_name: '',
            city: '',
            state: '',
            full_address: '',
            phonenumber: '',
            email: '',
            note: '',
            ship: '',
            isShowingLoading: false



        }
    }

    async componentDidMount() {
        await this.props.HandleShowAllDataCartByUserIdRedux(this.props.userInfo.id)
        this.setState({
            data_checkout_by_id_user: this.props.all_data_cart_by_user_id
        })
        let arr_color = [];
        if (this.props.all_data_cart_by_user_id && this.props.all_data_cart_by_user_id.length > 0) {
            this.props.all_data_cart_by_user_id.map(async (items) => {
                let color = items.color.split("#");
                color = color[1];
                let res = await GetNameColorByHex(color);
                let new_color = ''
                if (res && res.data) {

                    new_color = res.data.name_color.valueVi;
                    arr_color.push(new_color)
                    this.setState({
                        color: arr_color
                    })
                }
            })
        }
        await this.TotalSum()



    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.all_data_cart_by_user_id !== this.props.all_data_cart_by_user_id) {

            this.setState({
                data_checkout_by_id_user: this.props.all_data_cart_by_user_id,
            })
            let arr_color = [];
            let array = []

            if (this.props.all_data_cart_by_user_id && this.props.all_data_cart_by_user_id.length > 0) {
                this.props.all_data_cart_by_user_id.map(async (items) => {
                    let color = items.color.split("#");
                    color = color[1];
                    let res = await GetNameColorByHex(color);
                    let new_color = ''
                    if (res && res.data) {

                        new_color = res.data.name_color.valueVi;
                        arr_color.push(new_color)
                        this.setState({
                            color: arr_color
                        })
                    }
                })
            }

            await this.TotalSum()
        }

    }
    TotalSum = async () => {

        let { data_checkout_by_id_user } = this.state
        let total_new = +'';

        for (let i = 0; i < data_checkout_by_id_user.length; i++) {

            total_new += data_checkout_by_id_user[i].total
        }
        this.setState({
            total: total_new
        })


    }
    ClickGoToCart = () => {
        this.props.history.push(`/cart`)
    }
    ChooseShip = async (status) => {
        let { choose_ship } = this.state
        this.setState({
            choose_ship: !choose_ship,


        })
        if (status === 'chon') {
            toast.success('Đã chọn cách thức thanh toán');
            this.setState({
                ship: 'COD'
            })
        }
        else {
            toast.error('Đã huỷ cách thức thanh toán')
            this.setState({
                ship: ''
            })
        }

    }
    oneChangeInput = (event, name) => {
        let Copysate = this.state;
        Copysate[name] = event.target.value;
        this.setState({
            ...Copysate
        })
    }
    GoOut = () => {
        this.props.history.push(`/home`)

    }
    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    CheckOutButton = async () => {
        let { data_checkout_by_id_user, total, full_name, city, state, full_address, phonenumber, email, note, ship, color, value_quantity } = this.state
        let array = [];

        if (data_checkout_by_id_user && data_checkout_by_id_user.length > 0) {
            this.setState({
                isShowingLoading: true
            })
            data_checkout_by_id_user.map(async (items, index) => {
                let url = new Buffer(items.image, 'base64').toString('binary')

                let obj = {}


                obj.image = url
                obj.email = email
                obj.phonenumber = phonenumber
                obj.full_name = full_name
                obj.city = city
                obj.state = state
                obj.full_address = full_address
                obj.note = note
                obj.ship = ship
                obj.id_user = this.props.userInfo.id
                obj.id_product = items.id_product
                obj.name_product = items.name_product
                obj.price = items.price
                obj.number = items.quantity
                obj.color = color[index]
                obj.total = total

                array.push(obj)
            })
            console.log('data', array)
            let res = await PatientBookingAppointmentService({
                data_checkout: array
            })
            if (res && res.errCode === 1) {
                this.setState({
                    // isOpen: false,
                    isShowingLoading: false
                })
                toast.error('Bạn điền thiếu thông tin !')
            }
            if (res && res.errCode === 0) {
                this.setState({
                    // isOpen: false,
                    isShowingLoading: false
                })
                toast.success('Thành cônng, chúng tôi sẽ gửi mail xác nhận cho bạn trong ít phút !');
                this.GoOut();

            }
        }


    }
    GoToProductHomePage = () => {
        this.props.history.push(`/product`)

    }
    ToHomePage = () => {
        this.props.history.push(`/home`)

    }
    render() {

        // console.log('data_checkout_by_id_user', data_checkout_by_id_user)
        let { choose_ship, full_name, city, state, full_address, phonenumber, email, note, color, isShowingLoading, total } = this.state
        let { data_checkout_by_id_user, } = this.state
        console.log('data_checkout_by_id_user', data_checkout_by_id_user);
        console.log('total', total)

        return (
            <>

                <LoadingOverlay
                    active={isShowingLoading}
                    styles={{
                        wrapper: {
                        }
                    }}
                    spinner
                    text='Loading your content...'
                />

                <div className='checkout-container'>

                    <div className='header'>

                        <HomeHeader
                            HandleGetAllProductId={this.HandleGetAllProductId}
                            ClickGoTocheckout={this.ClickGoTocheckout}
                            ClickGoToCart={this.ClickGoToCart}
                            GoToProductHomePage={this.GoToProductHomePage}
                            ToHomePage={this.ToHomePage}



                        />
                    </div>
                    <div className='checkout-thin-1'>
                    </div>
                    <div className='checkout-display'>
                        <div className='checkout-display-left-container'>
                            <div className='checkout-header'>
                                <ul className='nav'>
                                    <li className='trc'>
                                        Trang chủ
                                    </li>
                                    <li>
                                        |
                                    </li>
                                    <li className='sau'>
                                        Shopping checkout
                                    </li>
                                </ul>
                            </div>


                            <div className='form-total-header'>
                                <h1>
                                    Delivery - Check out
                                </h1>

                            </div>
                            <div className='container'>
                                <div >

                                    <div className='form-group col-12'>
                                        <input className='form-control hvt' type='text' onChange={(event) => this.oneChangeInput(event, 'full_name')} value={full_name} placeholder='Tên đầy đủ'></input>
                                    </div>

                                    <div className='delivery-address'>
                                        <div className='p'>
                                            DELIVERY ADDRESS:
                                        </div>
                                        <div className='get-flex'>
                                            <div className='form-group col-6'>

                                                <input className='form-control dd' type='text' onChange={(event) => this.oneChangeInput(event, 'city')} value={city} placeholder='Thành phố'></input>
                                            </div>
                                            <div className='form-group col-6 '>

                                                <input className='form-control dd' type='text' onChange={(event) => this.oneChangeInput(event, 'state')} value={state} placeholder='Quận/Huyện'></input>

                                            </div>
                                        </div>




                                        <div className='form-group col-12'>


                                            <input className='form-control ddf' type='text' onChange={(event) => this.oneChangeInput(event, 'full_address')} value={full_address} placeholder='Địa chỉ chi tiết'></input>

                                        </div>
                                    </div>
                                    <div className='delivery-contact'>
                                        <div className='p'>
                                            CONTACT:
                                        </div>
                                        <div className='get-flex'>
                                            <div className='form-group col-6'>

                                                <input className='form-control dd' type='text' onChange={(event) => this.oneChangeInput(event, 'phonenumber')} value={phonenumber} placeholder='Số điện thoại'></input>
                                            </div>
                                            <div className='form-group col-6 '>

                                                <input className='form-control dd' type='email' onChange={(event) => this.oneChangeInput(event, 'email')} value={email} placeholder='Email'></input>

                                            </div>
                                        </div>

                                    </div>
                                    <div className='note-pay'>
                                        <div className='form-group col-6'>

                                            <textarea rows="4" cols="40" placeholder='note' onChange={(event) => this.oneChangeInput(event, 'note')} value={note} />
                                        </div>
                                        {
                                            choose_ship === false
                                                ?
                                                <div className='cod' onClick={() => this.ChooseShip('chon')}>
                                                    COD Shipping
                                                </div>
                                                :
                                                <div className='cod active' onClick={() => this.ChooseShip('huy')}>
                                                    COD Shipping
                                                </div>
                                        }


                                    </div>

                                    <div>

                                    </div>
                                </div>
                            </div>





                            {/* <div className='cuoi'>
                                Continue Shopping
                            </div> */}


                        </div>
                        <div className='total-checkout-display-group'>
                            <div className='total-table-container'>
                                <div className='content-total'>
                                    <p className='content-p'>
                                        Summary
                                    </p>
                                    <div className='thin-total'>

                                    </div>

                                </div>
                                <div className='detail-total'>
                                    {
                                        data_checkout_by_id_user && data_checkout_by_id_user.length > 0
                                        && data_checkout_by_id_user.map((items, index) => {
                                            return (
                                                <>
                                                    <div className='content-1-container'>
                                                        <div className='content-1'>
                                                            <p className='content-1-left'>
                                                                {items.name_product} - {color[index]}
                                                            </p>
                                                            <p className='content-1-right'>
                                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={'VND'} />

                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    <div className='thin-total'></div>

                                    <div className='content-2'>

                                        <p className='content-2-left' >
                                            Subtotal
                                        </p>
                                        {data_checkout_by_id_user && data_checkout_by_id_user.length > 0
                                            &&
                                            <p className='content-2-right' style={{ float: 'right' }}>
                                                <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                            </p>
                                        }

                                    </div>
                                    <div className='content-2'>

                                        <p className='content-2-left' >
                                            Shipping fee
                                        </p>

                                        <p className='content-2-right' style={{ float: 'right' }}>
                                            0 VND
                                        </p>
                                    </div>
                                    <div className='thin-total'></div>
                                </div>
                                <div className='subtotal'>
                                    <div className='subtotal-1'>
                                        <span className='subtotal-1-left'>
                                            Subtotal
                                        </span>
                                        {
                                            data_checkout_by_id_user && data_checkout_by_id_user.length > 0
                                            &&
                                            <span className='subtotal-1-right'>
                                                <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={'VND'} />


                                            </span>
                                        }

                                    </div>
                                </div>
                                <button className='btn-total' onClick={() => this.CheckOutButton()}>
                                    ĐẶT HÀNG
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='checkout-thin-2'></div>
                    <LesacOnme
                    />
                    <HomeBottom />
                </div>
                <div className='checkout-container-2'>

                    <div className='header'>

                        <HomeHeader
                            HandleGetAllProductId={this.HandleGetAllProductId}
                            ClickGoTocheckout={this.ClickGoTocheckout}
                            ClickGoToCart={this.ClickGoToCart}
                            GoToProductHomePage={this.GoToProductHomePage}
                            ToHomePage={this.ToHomePage}



                        />
                    </div>
                    <div className='checkout-thin-1'>
                    </div>
                    <div className='checkout-display'>
                        <div className='checkout-display-left-container'>
                            <div className='checkout-header'>
                                <ul className='nav'>
                                    <li className='trc'>
                                        Trang chủ
                                    </li>
                                    <li>
                                        |
                                    </li>
                                    <li className='sau'>
                                        Shopping checkout
                                    </li>
                                </ul>
                            </div>


                            <div className='form-total-header'>
                                <h1>
                                    Delivery - Check out
                                </h1>

                            </div>
                            <div className='container'>
                                <div className='ctn-checkout'>

                                    <div className='form-group col-12'>
                                        <input className='form-control hvt' type='text' onChange={(event) => this.oneChangeInput(event, 'full_name')} value={full_name} placeholder='Tên đầy đủ'></input>
                                    </div>

                                    <div className='delivery-address'>
                                        <div className='p'>
                                            DELIVERY ADDRESS:
                                        </div>
                                        <div className='get-flex'>
                                            <div className='form-group col-6'>

                                                <input className='form-control dd' type='text' onChange={(event) => this.oneChangeInput(event, 'city')} value={city} placeholder='Thành phố'></input>
                                            </div>
                                            <div className='form-group col-6 '>

                                                <input className='form-control dd' type='text' onChange={(event) => this.oneChangeInput(event, 'state')} value={state} placeholder='Quận/Huyện'></input>

                                            </div>
                                        </div>




                                        <div className='form-group col-12'>


                                            <input className='form-control ddf' type='text' onChange={(event) => this.oneChangeInput(event, 'full_address')} value={full_address} placeholder='Địa chỉ chi tiết'></input>

                                        </div>
                                    </div>
                                    <div className='delivery-contact'>
                                        <div className='p'>
                                            CONTACT:
                                        </div>
                                        <div className='get-flex'>
                                            <div className='form-group col-6'>

                                                <input className='form-control dd' type='text' onChange={(event) => this.oneChangeInput(event, 'phonenumber')} value={phonenumber} placeholder='Số điện thoại'></input>
                                            </div>
                                            <div className='form-group col-6 '>

                                                <input className='form-control dd' type='email' onChange={(event) => this.oneChangeInput(event, 'email')} value={email} placeholder='Email'></input>

                                            </div>
                                        </div>

                                    </div>
                                    <div className='note-pay'>
                                        <div className='form-group col-6'>

                                            <textarea rows="4" cols="40" placeholder='note' onChange={(event) => this.oneChangeInput(event, 'note')} value={note} />
                                        </div>
                                        {
                                            choose_ship === false
                                                ?
                                                <div className='cod' onClick={() => this.ChooseShip('chon')}>
                                                    COD Shipping
                                                </div>
                                                :
                                                <div className='cod active' onClick={() => this.ChooseShip('huy')}>
                                                    COD Shipping
                                                </div>
                                        }


                                    </div>

                                    <div>

                                    </div>
                                </div>
                            </div>





                            {/* <div className='cuoi'>
                                Continue Shopping
                            </div> */}


                        </div>
                        <div className='total-checkout-display-group'>
                            <div className='total-table-container-checkout'>
                                <div className='content-total'>
                                    <p className='content-p'>
                                        Summary
                                    </p>
                                    <div className='thin-total'>

                                    </div>

                                </div>

                                <div className='subtotal'>
                                    <div className='subtotal-1'>
                                        <span className='subtotal-1-left'>
                                            Subtotal
                                        </span>
                                        {
                                            data_checkout_by_id_user && data_checkout_by_id_user.length > 0
                                            &&
                                            <span className='subtotal-1-right'>
                                                <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' VND'} />


                                            </span>
                                        }

                                    </div>
                                    <button className='btn-total' onClick={() => this.CheckOutButton()}>
                                        ĐẶT HÀNG
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <LesacOnme
                    />
                    <div className='checkout_hbt'>
                        <HomeBottom />

                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        all_data_cart_by_user_id: state.admin.all_data_cart_by_user_id


        // all_data_Product: state.admin.all_data_Product

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleShowAllDataCartByUserIdRedux: (id) => dispatch(actions.ShowAllDataCartByUserIdRedux(id)),

        HandlePatientBookingAppointmentRedux: (data) => dispatch(actions.PatientBookingAppointmentRedux(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
