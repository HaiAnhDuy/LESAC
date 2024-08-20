import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WhatNew.scss'
import * as actions from "../../store/actions";
import NumberFormat from 'react-number-format';

import { GetDataProductNew, GetDataImageProductByIdProduct } from '../../services/userServices'
import ModalCartWhatNew from './ModalCartWhatNew/ModalCartWhatNew';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};
class WhatNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: -1,
            data_product_new: '',
            id_image_color: '',
            arr_img: '',
            arr_color: '',
            check_image: -1,
            code_check: '',
            length_arr: '',
            url_to_modal: '',
            url_2: '',
            isOpen: false,
            data: ''



        }
    }
    async componentDidMount() {
        let res = await GetDataProductNew();
        if (res && res.data && res.data.data_product_new) {
            this.setState({
                data_product_new: res.data.data_product_new,
            })
        }




    }
    handleMouseOver = (e) => {
        // console.log(e.target.id)

        this.setState({
            check: !this.state.check
        })
    }
    // handleMouseOut = (id) => {

    //     this.setState({
    //         check: false
    //     })
    hideCartHandler = () => {
        this.setState({
            check: -1
        }, console.log(this.state.check)
        )
    }
    showCartHandler = (index) => {
        this.setState({
            check: index
        })
    }
    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }
    Test_2 = (data1, data2) => {
        this.setState({
            url_to_modal: data1,
            // check_image: data2
        })
    }

    ChangeOutPutCss = (index) => {
        return `content-display-child ${this.state.check === index ? 'border-display' : ''}`
    }
    OneClickColorProduct = (index2, code, length, index1) => {
        console.log(index1, index2)
        let { data_product_new } = this.state;
        console.log(data_product_new)
        let data_image = data_product_new[index1].image[index2].image
        this.setState({
            check_image: index2,
            code_check: code,
            length_arr: length,
            url_to_modal: data_image
        })
    }
    OpenModalCartNew = (data) => {
        // console.log(data)
        let { code_check } = this.state;
        if (data.id !== code_check) {
            let data_image = data.image[0].image

            this.setState({
                url_to_modal: data_image
            })
        }
        this.setState({
            isOpen: !this.state.isOpen,
            data: data
        })
    }
    SetState2 = (data) => {
        let { check_image, data_product_new } = this.state;
        console.log(data, check_image);
        this.setState({
            url_to_modal: data_product_new[data].image[check_image].image
        })

    }
    HandleToCartWhatNew = () => {
        this.props.ClickGoToCart()
    }
    CheckSliderProduct = (data) => {
        console.log('data', data);
        this.props.ClickFromSliderToProductDetail(data.id)
    }
    render() {
        let { check, numbers, data_product_new, check_image, code_check, length_arr } = this.state;
        let url_2 = ''

        // console.log(data_product_new)

        return (
            <>

                <div className='WhatNew-container'>

                    <div className='Whatnew-banner'>
                        <div className='Whatnew-banner-content'>
                            <div className='title'>
                                KINH ĐÔ
                            </div>
                            <div className='title-child'>
                                Đồng hành cùng Kinh Đô đăng ký ngay ngày hôm nay để có thể nhận được những mãu sản phẩm mới nhất cùng với vô vàn quà tặng hấp dẫn
                            </div>
                            <button className='btn-banner'>ĐĂNG KÝ</button>
                        </div>
                    </div>
                    <div className='Whatnew-content'>
                        <div className='content-title'>
                            có gì mới?
                        </div>
                        <div className='content-display'>

                            <div className='display-container'>



                                {data_product_new && data_product_new.length > 0 &&
                                    data_product_new.map((items, index) => {
                                        let arr = items.image
                                        let arr_color = items.color;
                                        // arr_color = arr_color[0]
                                        let url = ''
                                        let ind1 = '';
                                        if (arr[0].id_product === code_check && arr.length === arr_color.length) {
                                            url_2 = new Buffer(arr[check_image].image, 'base64').toString('binary');
                                            // this.SetState2(index)
                                            // arr.map((items) => {
                                            //     url_2 = new Buffer(items.image, 'base64').toString('binary');
                                            //     // console.log(items)

                                            // })
                                            // console.log(arr[check_image])

                                        }
                                        else {
                                            url_2 = new Buffer(arr[0].image, 'base64').toString('binary')

                                        }
                                        // let number = OneClickColorProduct()
                                        if (arr && arr.length > 0) {
                                            url = new Buffer(arr[0].image, 'base64').toString('binary')

                                        }

                                        return (
                                            <>
                                                <div id={items} className={this.ChangeOutPutCss(index)} onMouseEnter={() => this.showCartHandler(index)} onMouseLeave={this.hideCartHandler} >
                                                    {check_image === -1 ?


                                                        <div key={index} className='content-display-product' style={{ backgroundImage: `url(${url})` }}>

                                                        </div>
                                                        :
                                                        <div key={index} className='content-display-product' style={{ backgroundImage: code_check === items.id ? `url(${url_2})` : `url(${url_2})` }}>

                                                        </div>
                                                    }



                                                    <div className='content-display-price'>
                                                        {check === index ?
                                                            <>
                                                                <div className='color-product'>
                                                                    {
                                                                        arr_color && arr_color.length > 0 &&
                                                                        arr_color.map((items1, index2) => {
                                                                            let length = arr_color.length
                                                                            return (
                                                                                <>
                                                                                    <div id={items1} className='border-radius-color' style={{ backgroundColor: items1.colorType }} onClick={() => this.OneClickColorProduct(index2, items1.id_product, length, check)}></div>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                    {/* <div className='border-radius-color'>

                                                                    </div>
                                                                    <div className='border-radius-color'></div>
                                                                    <div className='border-radius-color'></div> */}


                                                                </div>
                                                                <div className='price-number-color'>
                                                                    <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                                                </div>
                                                                <div className='a'>
                                                                    <button className='btn-color' onClick={() => this.OpenModalCartNew(items)}>Thêm vào giỏ hàng</button>

                                                                </div>



                                                            </>
                                                            :

                                                            <>
                                                                <div className='name-product'>
                                                                    {items.name_product}
                                                                </div>
                                                                <div className='price-number'>
                                                                    <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                                                </div>
                                                            </>
                                                        }





                                                    </div>
                                                </div>
                                            </>
                                        )

                                    })
                                }

                            </div>




                        </div>
                    </div>
                </div>
                <div className='new-dip'>
                    <Slider {...settings} >
                        {data_product_new && data_product_new.length > 0 &&
                            data_product_new.map((items, index) => {
                                let arr = items.image
                                let arr_color = items.color;
                                // arr_color = arr_color[0]
                                let url = ''
                                let ind1 = '';
                                if (arr && arr.length > 0) {
                                    url = new Buffer(arr[0].image, 'base64').toString('binary')

                                }

                                return (
                                    <>
                                        <div className='new-dip-container' onClick={() => this.CheckSliderProduct(items)}>
                                            <div key={index} className='new-dip-product' style={{ backgroundImage: `url(${url})` }}>

                                            </div>
                                            <div className='name-product'>
                                                {items.name_product}
                                            </div>
                                            <div className='price-number'>
                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                            </div>
                                        </div>

                                    </>
                                )

                            })
                        }
                    </Slider>
                </div>

                <ModalCartWhatNew
                    isOpen={this.state.isOpen}
                    Test={this.Test}
                    Test_2={this.Test_2}
                    data={this.state.data}
                    check_image={this.state.check_image}
                    url_to_modal={this.state.url_to_modal}
                    HandleToCartWhatNew={this.HandleToCartWhatNew}
                />


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

export default connect(mapStateToProps, mapDispatchToProps)(WhatNew);
