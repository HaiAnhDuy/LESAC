import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.scss'
import HomeHeader from '../../HomeHeader';
import * as actions from "../../../../store/actions";

import LesacOnme from '../../LesacOnme';
import HomeBottom from '../../HomeBottom';
import NumberFormat from 'react-number-format';
import TotalTable from './TotalTable/TotalTable';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: '',
            length_array: '',
            color: '',
            data_cart_by_id_user: '',
            data_product_by_categories: '',
            name_color: '',
            value_quantity: 1,




        }
    }

    async componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let id = this.props.match.params.id;
        //     this.setState({
        //         id: id
        //     })
        // }

        await this.props.HandleShowAllDataCartByUserIdRedux(this.props.userInfo.id)
        this.setState({
            length_array: this.props.all_data_cart_by_user_id.length,
            data_cart_by_id_user: this.props.all_data_cart_by_user_id
        })
        await this.TotalSum();



    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.all_data_cart_by_user_id !== this.props.all_data_cart_by_user_id) {

            this.setState({
                length_array: this.props.all_data_cart_by_user_id.length,
                data_cart_by_id_user: this.props.all_data_cart_by_user_id,
            })
            await this.TotalSum();


        }




    }


    HandlePlus = async (user_id, product_id, color) => {
        let new_color = color.split('#')
        new_color = new_color[1]
        await this.props.HandlePlusProductCartRedux({
            id_user: user_id,
            id_product: product_id,
            color: new_color
        })
        await this.props.HandleShowAllDataCartByUserIdRedux(user_id)
        await this.TotalSum()

    }
    HandleMinus = async (user_id, product_id, color) => {
        let new_color = color.split('#')
        new_color = new_color[1]
        await this.props.HandleMinusProductCartRedux({
            id_user: user_id,
            id_product: product_id,
            color: new_color
        })
        await this.props.HandleShowAllDataCartByUserIdRedux(user_id)


        await this.TotalSum()

    }
    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    monneywillpay = (price) => {
        let { value_quantity } = this.state;
        price = price * value_quantity;
        return price

    }
    DeleteProductCart = async (id, id_user) => {
        await this.props.HandleDeleteByIdProductCartRedux(id);
        await this.props.HandleShowAllDataCartByUserIdRedux(id_user)
        await this.TotalSum()

    }
    ClickGoToCart = () => {
        this.props.history.push(`/cart`)
    }
    TotalSum = async () => {

        let { data_cart_by_id_user } = this.state
        let total_new = +'';

        for (let i = 0; i < data_cart_by_id_user.length; i++) {

            total_new += data_cart_by_id_user[i].total
        }
        this.setState({
            total: total_new
        })


    }
    ClickGoToCheckOut = () => {
        this.props.history.push(`/checkout`)

    }
    ContinueShoping = () => {
        this.props.history.push(`/product`)

    }
    GoToProductHomePage = () => {
        this.props.history.push(`/product`)

    }
    ToHomePage = () => {
        this.props.history.push(`/home`)

    }
    render() {

        let { length_array, data_cart_by_id_user, total } = this.state;
        // console.log('data_cart_by_id_user', data_cart_by_id_user)
        return (
            <>
                <div className='cart-container'>
                    <div className='header'>
                        <HomeHeader
                            HandleGetAllProductId={this.HandleGetAllProductId}
                            ClickGoToCart={this.ClickGoToCart}
                            GoToProductHomePage={this.GoToProductHomePage}
                            ToHomePage={this.ToHomePage}


                        />
                    </div>
                    <div className='cart-thin'>
                    </div>
                    <div className='cart-display'>
                        <div className='cart-display-left-container'>
                            <div className='cart-header'>
                                <ul className='nav'>
                                    <li className='trc'>
                                        Trang chủ
                                    </li>
                                    <li>
                                        |
                                    </li>
                                    <li className='sau'>
                                        Shopping cart
                                    </li>
                                </ul>
                            </div>
                            <div className='cart-title'>
                                <div className='title-left'>
                                    SHOPPING CART
                                </div>
                                <div className='title-right'>
                                    <a onClick={() => this.ContinueShoping()} style={{ cursor: 'pointer' }}>
                                        Continue Shopping
                                    </a>
                                </div>
                            </div>

                            <div className='table-header'>
                                <div class="child-title">({length_array})items</div>
                                <div class="child-title-pr">Product</div>
                                <div class="child-title-pri">price</div>

                                <div class="child-title-qu">Quantity</div>

                                <div class="child-title-tt">Total</div>

                            </div>
                            <div className='table-content-container'>
                                {data_cart_by_id_user && data_cart_by_id_user.length > 0 ?
                                    data_cart_by_id_user.map((items, index) => {
                                        let url = new Buffer(items.image, 'base64').toString('binary')
                                        return (
                                            <>
                                                <div className='table-content'>
                                                    <div className='img-tbl' style={{ backgroundImage: `url(${url})` }}>

                                                    </div>
                                                    <div className='name-tbl' >
                                                        {items.name_product}
                                                    </div>
                                                    <div className='price-tbl'>
                                                        <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                                    </div>
                                                    <div className='quantity'>
                                                        <button className='plus' onClick={() => this.HandlePlus(items.id_user, items.id_product, items.color)}>+</button>
                                                        <input type='number' value={items.quantity}></input>
                                                        <button className='minus' onClick={() => this.HandleMinus(items.id_user, items.id_product, items.color)}>-</button>

                                                    </div>
                                                    <div className='total-tbl'>
                                                        <NumberFormat value={items.total} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                                    </div>
                                                    <div className='close-tbl'>
                                                        <i class="fas fa-times" onClick={() => this.DeleteProductCart(items.id, items.id_user)}></i>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    :
                                    <div className='trong'>
                                        Hiện tại giỏ hàng trống !
                                    </div>
                                }



                            </div>





                            {/* <div className='cuoi'>
                                Continue Shopping
                            </div> */}


                        </div>
                        <div className='total-display-group'>
                            <TotalTable
                                data={data_cart_by_id_user}
                                total={total}
                                ClickGoToCheckOut={this.ClickGoToCheckOut}
                            />
                        </div>

                    </div>
                    <div className='cart-thin'></div>
                    <LesacOnme
                    />
                    <HomeBottom />
                </div>
                <div className='cart-container-2'>
                    <div className='header'>
                        <HomeHeader
                            HandleGetAllProductId={this.HandleGetAllProductId}
                            ClickGoToCart={this.ClickGoToCart}
                            GoToProductHomePage={this.GoToProductHomePage}
                            ToHomePage={this.ToHomePage}


                        />
                    </div>
                    <div className='cart-thin'>
                    </div>
                    <div className='cart-display'>
                        <div className='cart-display-left-container'>
                            <div className='cart-header'>
                                <ul className='nav'>
                                    <li className='trc'>
                                        Trang chủ
                                    </li>
                                    <li>
                                        |
                                    </li>
                                    <li className='sau'>
                                        Shopping cart
                                    </li>
                                </ul>
                            </div>
                            <div className='cart-title'>
                                <div className='title-left'>
                                    SHOPPING CART
                                </div>
                                <div className='title-right'>
                                    <a onClick={() => this.ContinueShoping()} style={{ cursor: 'pointer' }}>
                                        Continue Shopping
                                    </a>
                                </div>
                            </div>

                            <div className='table-header'>
                                <div class="child-title-shopping">SHOPPING CART</div>


                                <div class="child-title-ttms"><a href="/" class="ttms">Continue Shopping</a></div>

                            </div>
                            <div className='table-content-container'>
                                {data_cart_by_id_user && data_cart_by_id_user.length > 0 ?
                                    data_cart_by_id_user.map((items, index) => {
                                        let url = new Buffer(items.image, 'base64').toString('binary')
                                        return (
                                            <>
                                                <div className='table-content'>
                                                    <div className='tbl-content-left'>
                                                        <div className='img-tbl' style={{ backgroundImage: `url(${url})` }}>

                                                        </div>
                                                        <div className='chia_anh'>
                                                            <div className='price-tbl'>
                                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                                            </div>
                                                            <div className='quantity'>
                                                                <button className='plus' onClick={() => this.HandlePlus(items.id_user, items.id_product, items.color)}>+</button>
                                                                <input type='number' value={items.quantity}></input>
                                                                <button className='minus' onClick={() => this.HandleMinus(items.id_user, items.id_product, items.color)}>-</button>

                                                            </div>
                                                        </div>



                                                    </div>
                                                    <div className='tbl-content-right'>
                                                        <div className='name-tbl' >
                                                            {items.name_product}
                                                        </div>
                                                        <div className='total-tbl'>
                                                            <NumberFormat value={items.total} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                                        </div>
                                                    </div>




                                                    <div className='close-tbl'>
                                                        <i class="fas fa-times" onClick={() => this.DeleteProductCart(items.id, items.id_user)}></i>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    :
                                    <div className='trong'>
                                        Hiện tại giỏ hàng trống !
                                    </div>
                                }



                            </div>





                            {/* <div className='cuoi'>
                                Continue Shopping
                            </div> */}


                        </div>
                        <div className='total-display-group'>
                            <TotalTable
                                data={data_cart_by_id_user}
                                total={total}
                                ClickGoToCheckOut={this.ClickGoToCheckOut}
                            />
                        </div>

                    </div>
                    {/* <div className='cart-thin'></div> */}
                    <div className='lso_cart'>
                        <LesacOnme
                        />
                    </div>

                    <div className='cart_hbt'>
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

        isLoggedIn: state.user.isLoggedIn,
        all_data_categories_product: state.admin.all_data_categories_product,
        data_full_3_select: state.admin.data_full_3_select,
        all_data_cart_by_user_id: state.admin.all_data_cart_by_user_id
        // all_data_Product: state.admin.all_data_Product

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataCategoriesProductRedux: () => dispatch(actions.GetAllDataCategoriesProductRedux()),
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleShowAllDataCartByUserIdRedux: (id) => dispatch(actions.ShowAllDataCartByUserIdRedux(id)),
        HandlePlusProductCartRedux: (data) => dispatch(actions.PlusProductCartRedux(data)),
        HandleMinusProductCartRedux: (data) => dispatch(actions.MinusProductCartRedux(data)),
        HandleDeleteByIdProductCartRedux: (id) => dispatch(actions.DeleteByIdProductCartRedux(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
