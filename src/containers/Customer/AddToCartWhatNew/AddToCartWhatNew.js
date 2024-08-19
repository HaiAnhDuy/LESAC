import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import ImageGallery from "react-image-gallery";
import NumberFormat from 'react-number-format';

import './AddToCartWhatNew.scss'
import { toast } from 'react-toastify';

class AddToCartWhatNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            value_quantity: 1,
            color: -1,
            type: ''


        }
    }

    async componentDidMount() {
        if (this.props.data) {
            this.setState({
                data: this.props.data
            })
        }



    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data
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
        console.log('index', index)
        this.setState({
            color: index
        })
    }
    AddToCart = async () => {
        let { data, color, value_quantity } = this.state;
        if (color !== -1) {
            let name_product = data.name_product
            let id_product = data.id
            let quantity = value_quantity;
            let price = data.price
            let total = this.monneywillpay(price)
            let data_image = data.image;
            let data_color = data.color

            let image_new = new Buffer(data_image[color].image, 'base64').toString('binary')

            let colo_new = data_color[color].colorType
            colo_new = colo_new.split("#");
            colo_new = colo_new[1];
            await this.props.HandleAddToCartRedux({
                id_user: this.props.userInfo.id,
                id_product: id_product,
                name_product: name_product,
                image: image_new,
                color: colo_new,
                quantity: quantity,
                price: price,
                total: total

            })
            this.props.HandleToCart()
        } else {
            toast.error('Hãy chọn màu sản phẩm')
        }


    }


    render() {

        let { value_quantity, data } = this.state
        let data_color = data.color;

        console.log('data', data)


        return (

            <>

                <div className='add-to-cart-what-new-container'>
                    <div className='add-to-cart-content-1'>
                        <div className='add-to-cart-content-1-name-product'>
                            {data.name_product
                            }


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
                                <NumberFormat value={this.monneywillpay(data.price)} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                            </div>
                        </div>
                    </div>
                    <div className='add-to-cart-content-2'>
                        <p>Color</p>
                        <div className='add-to-cart-content-2-color'>
                            {data_color && data_color.length > 0 &&
                                data_color.map((items, index) => {
                                    return (
                                        <>
                                            {
                                                this.state.color === index
                                                    ?
                                                    <div className='border-radius-color add-border' style={{ backgroundColor: items.colorType }} onClick={() => this.colorchange(index)}></div>
                                                    :
                                                    <div className='border-radius-color' style={{ backgroundColor: items.colorType }} onClick={() => this.colorchange(index)}></div>


                                            }

                                        </>
                                    )

                                })

                            }
                        </div>
                        <button className='btn-whatnew' onClick={() => { this.AddToCart() }}>
                            Thêm vào giỏ hàng
                        </button>
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

        // HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        HandleAddToCartRedux: (data) => dispatch(actions.AddToCartRedux(data))



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartWhatNew);