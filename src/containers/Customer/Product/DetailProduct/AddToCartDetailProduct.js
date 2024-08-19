import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions'
import { ToastContainer, toast } from 'react-toastify';

import ImageGallery from "react-image-gallery";
import NumberFormat from 'react-number-format';

import './AddToCartDetailProduct.scss'

class AddToCartDetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            what_color: '',
            value_quantity: 1,
            detail_image: '',
            color: -1,
            check_color: -1,
            content_html: false,
            data_mark: ''


        }
    }

    async componentDidMount() {
        if (this.props.status_set === true) {
            this.setState({
                check_color: -1,

            })
        }
        if (this.props.data) {
            this.setState({
                data: this.props.data

            })
        }
        if (this.props.data_mark) {
            this.setState({
                data_mark: this.props.data_mark

            })
        }
        if (this.props.detail_image) {
            this.setState({
                detail_image: this.props.detail_image
            })
        }


    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.status_set !== this.props.status_set) {
            if (this.props.status_set === true) {
                this.setState({
                    check_color: -1,

                })
            }

        }
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data
            })
        }
        if (prevProps.data_mark !== this.props.data_mark) {
            this.setState({
                data_mark: this.props.data_mark
            })
        }
        if (prevProps.detail_image !== this.props.detail_image) {
            this.setState({
                detail_image: this.props.detail_image
            })
        }

    }
    HandlePlus = () => {
        let { value_quantity } = this.state;
        value_quantity = value_quantity + 1
        this.setState({
            value_quantity: value_quantity
        })
    }
    HandleMinus = () => {
        let { value_quantity } = this.state;
        value_quantity = value_quantity - 1
        if (value_quantity >= 1) {
            this.setState({
                value_quantity: value_quantity
            })
        }

    }
    monneywillpay = (price) => {
        let { value_quantity } = this.state;
        price = price * value_quantity;
        return price

    }




    HandleChangeEvent = (event, name) => {
        let CopyState = { ...this.state };
        CopyState[name] = event.target.value;
        this.setState({
            ...CopyState
        })
    }
    colorchange = (index) => {
        this.setState({
            color: index
        })
    }
    HandleClickHtml1 = () => {
        this.setState({
            content_html: false
        })
    }
    HandleClickHtml2 = () => {
        this.setState({
            content_html: true
        })
    }
    handlecontrollcolor = (data, index) => {


        this.props.HandleChangeImg(index, false)



        this.setState({
            check_color: index,
            what_color: data
        })


    }
    AddToCart = async (name) => {
        let { detail_image, check_color, data, value_quantity, what_color } = this.state;
        if (check_color === -1) {
            toast.error('Bạn hãy chọn màu sản phẩm')
        } else {
            console.log('detail_image', detail_image);
            console.log('userInfo', this.props.userInfo);
            console.log('name', data);
            console.log('price', data.price)
            let color = what_color.colorType;
            color = color.split("#");
            color = color[1];
            console.log('color', color)
            let total = data.price * value_quantity
            let image = new Buffer(detail_image.image, 'base64').toString('binary')
            await this.props.HandleAddToCartRedux({
                id_user: this.props.userInfo.id,
                id_product: data.id,
                name_product: data.name_product,
                image: image,
                color: color,
                quantity: value_quantity,
                price: data.price,
                total: total

            })
            if (name === 'CART') {
                this.props.HandleToCart()
            } else {
                this.props.HandleToCheckOut()

            }
        }

    }

    render() {

        let { value_quantity, data, check_color, data_mark } = this.state
        let data_color = data.color;

        // console.log(data)


        return (

            <>

                <div className='add-to-cart-what-new-container'>
                    <div className='add-to-cart-content-1'>
                        <div className='add-to-cart-content-1-name-product'>
                            {data.name_product}

                        </div>
                        <div className='add-to-cart-content-1-quantity'>
                            <div className='text'>
                                <p>Quantity</p>
                            </div>

                            <div className='quantity'>
                                <button className='plus' onClick={() => this.HandlePlus()}>+</button>
                                <input type='number' value={value_quantity}></input>
                                <button className='minus' onClick={() => this.HandleMinus()}>-</button>

                            </div>

                            <div className='price'>
                                <NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                            </div>
                        </div>
                    </div>
                    <div className='add-to-cart-content-2'>
                        <p>Color</p>
                        <div className='add-to-cart-content-2-color'>

                            {/* <div className='border-radius-color add-border' style={{ backgroundColor: items.colorType }} onClick={() => this.colorchange(index)}></div> */}
                            {data_color && data_color.length > 0 &&
                                data_color.map((items, index) => {
                                    return (
                                        <>
                                            <div className={check_color === index ? 'border-radius-color-new' : 'border-radius-color'} style={{ backgroundColor: items.colorType }} onClick={() => this.handlecontrollcolor(items, index)}></div>

                                        </>
                                    )
                                })
                            }





                        </div>

                        <button onClick={() => this.AddToCart('CART')}>
                            Thêm vào giỏ hàng
                        </button>
                        <button className='btn-mua' onClick={() => this.AddToCart('BUYNOW')}>
                            Mua Ngay
                        </button>
                        <div className='content-detail'>

                            <div className={this.state.content_html === false ? 'describe-product' : 'describe-product active'} onClick={() => this.HandleClickHtml1()} >
                                CHI TIẾT SẢN PHẨM
                            </div>
                            <div className={this.state.content_html === true ? 'guarantee-product' : 'guarantee-product active'} onClick={() => this.HandleClickHtml2()}>
                                CHÍNH SÁCH ĐỔI TRẢ
                            </div>
                        </div>
                        {
                            this.state.content_html === false ?
                                <div className='content-html' >
                                    <div className="normal" dangerouslySetInnerHTML={{ __html: data_mark }}>

                                    </div>
                                </div>
                                :
                                <div className='content-html'>
                                    <div className='normal'>
                                        <ul className='ul_html'>
                                            <li>
                                                <p>Với những trường hợp do lỗi sản xuất, bạn có thể 1 đổi 1 trong 7 ngày.</p>
                                            </li>
                                            <li>
                                                <p>
                                                    LESAC miễn phí bảo hành trong khoảng 7-30 ngày kể từ ngày nhận hàng.
                                                    Đặc biệt, LESAC có hỗ trợ bảo hành cho đơn hàng mua sau 30 ngày  </p>                                          </li>
                                        </ul>
                                    </div>
                                </div>
                        }




                    </div>
                </div>



            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo



    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),

        HandleAddToCartRedux: (data) => dispatch(actions.AddToCartRedux(data))



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartDetailProduct);