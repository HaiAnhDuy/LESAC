import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Product.scss'
import HomeHeader from '../HomeHeader';
import FilterProduct from './FilterProduct';
import DisplayProduct from './DisplayProduct';
import * as actions from "../../../store/actions";
import { GetDataCategoriesById } from '../../../services/userServices'
import LesacOnme from '../LesacOnme';
import HomeBottom from '../HomeBottom';


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: ''



        }
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {



    }

    HandleDetailCategories = (id) => {
        // console.log('>>> check detail ,', id)
        // console.log('lan 1', this.props.history)
        this.setState({
            id: id
        })
        this.props.history.push(`/categories/${id}`)


    }
    HandleIdProductByColor = async (data) => {
        let data_new = data.split(data[0]);
        let color = data_new[1]

        // await this.props.HandleGetIdByHexRedux(data_new[1]);
        // let { get_id_by_hex } = this.props;
        // console.log('>>>check', get_id_by_hex.get_id)
        this.props.history.push(`/color_product/${color}`)


    }
    GetNameCategories = async (id) => {
        let data = await GetDataCategoriesById(id)
        console.log(data)
    }
    HandGetData = (data) => {
        this.setState({
            data: data
        })
    }
    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    HandleToDetailProduct = (id) => {
        this.props.history.push(`/detail-product/${id}/all_product/none`)

    }
    ClickGoToCart = () => {
        this.props.history.push(`/cart`)
    }
    GoToProductHomePage = () => {
        this.props.history.push(`/product`)

    }
    HandleIdProductByPrice = (data) => {
        this.props.history.push(`/product_by_price/${data}`)

    }
    ToHomePage = () => {
        this.props.history.push(`/home`)

    }
    render() {

        return (
            <>
                <div className='product-container'>
                    <div className='product-header'>
                        <HomeHeader
                            HandleGetAllProductId={this.HandleGetAllProductId}
                            ClickGoToCart={this.ClickGoToCart}
                            GoToProductHomePage={this.GoToProductHomePage}
                            ToHomePage={this.ToHomePage}



                        />
                    </div>
                    <div className='thin'>
                    </div>
                    <div className='product-display'>
                        <div className='product-display-header'>
                            <ul className='nav'>
                                <li className='trc'>
                                    Trang chủ
                                </li>
                                <li>
                                    |
                                </li>
                                <li className='sau'>
                                    Sản phẩm
                                </li>

                            </ul>
                            <div className='cuoi'>
                                ❤️
                            </div>
                        </div>

                        <div className='product-display-group'>
                            <FilterProduct
                                HandleDetailCategories={this.HandleDetailCategories}
                                HandleIdProductByColor={this.HandleIdProductByColor}
                                HandleIdProductByPrice={this.HandleIdProductByPrice}


                            />
                            <DisplayProduct
                                // id_in_product={this.state.id}
                                HandleToDetailProduct={this.HandleToDetailProduct}
                                open_by_id={false}

                            />

                        </div>
                    </div>
                    <div className='thin'></div>
                    <LesacOnme
                    />
                    <div className='hb'>
                        <HomeBottom />

                    </div>
                </div>
                <div className='product-container-2'>
                    <div className='product-header'>
                        <HomeHeader
                            HandleGetAllProductId={this.HandleGetAllProductId}
                            ClickGoToCart={this.ClickGoToCart}
                            GoToProductHomePage={this.GoToProductHomePage}
                            ToHomePage={this.ToHomePage}



                        />
                    </div>
                    <div className='thin'>
                    </div>
                    <div className='product-display'>
                        <div className='product-display-header'>
                            <ul className='nav'>
                                <li className='trc'>
                                    Trang chủ
                                </li>
                                <li>
                                    |
                                </li>
                                <li className='sau'>
                                    Sản phẩm
                                </li>

                            </ul>
                            <div className='cuoi'>
                                ❤️
                            </div>
                        </div>

                        <div className='product-display-group'>
                            <FilterProduct
                                HandleDetailCategories={this.HandleDetailCategories}
                                HandleIdProductByColor={this.HandleIdProductByColor}
                                HandleIdProductByPrice={this.HandleIdProductByPrice}
                                is_color={true}
                                open_by_categories={true}

                            />
                            <DisplayProduct
                                // id_in_product={this.state.id}
                                HandleToDetailProduct={this.HandleToDetailProduct}
                                open_by_id={false}

                            />

                        </div>
                    </div>
                    <div className='thin'></div>
                    <LesacOnme
                    />
                    <div className='hb'>
                        <HomeBottom />

                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        all_data_categories_product: state.admin.all_data_categories_product,
        data_full_3_select: state.admin.data_full_3_select,
        get_id_by_hex: state.admin.get_id_by_hex

        // all_data_Product: state.admin.all_data_Product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataCategoriesProductRedux: () => dispatch(actions.GetAllDataCategoriesProductRedux()),
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleGetIdByHexRedux: (hex) => dispatch(actions.GetIdByHexRedux(hex)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
