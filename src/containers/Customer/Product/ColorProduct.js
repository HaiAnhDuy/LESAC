import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ColorProduct.scss'
import HomeHeader from '../HomeHeader';
import * as actions from "../../../store/actions";
import FilterProduct from './FilterProduct';
import DisplayProduct from './DisplayProduct';
import LesacOnme from '../LesacOnme';
import HomeBottom from '../HomeBottom';

import { GetNameColorByHex } from '../../../services/userServices'


class ColorProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            data_product_by_categories: '',
            name_color: '',




        }
    }

    async componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let id = this.props.match.params.id;
        //     this.setState({
        //         id: id
        //     })
        // }
        if (this.props.match && this.props.match.params && this.props.match.params.color) {
            let color = this.props.match.params.color;
            this.setState({
                color: color
            })
            let res = await GetNameColorByHex(color);

            if (res && res.data) {
                this.setState({
                    name_color: res.data.name_color.valueVi
                })
            }
            else {
                this.setState({
                    name_color: ''
                })
            }

        }




    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.match !== this.props.match) {
            if (this.props.match && this.props.match.params && this.props.match.params.color) {
                let color = this.props.match.params.color;
                this.setState({
                    color: color
                })
                let res = await GetNameColorByHex(color);
                if (res && res.data) {
                    this.setState({
                        name_color: res.data.name_color.valueVi
                    })
                }
                else {
                    this.setState({
                        name_color: ''
                    })
                }


            }
        }



    }

    HandleIdProductByColor = async (data) => {
        let data_new = data.split(data[0]);
        let color = data_new[1]

        // await this.props.HandleGetIdByHexRedux(data_new[1]);
        // let { get_id_by_hex } = this.props;
        // console.log('>>>check', get_id_by_hex.get_id)
        this.props.history.push(`/color_product/${color}`)


    }
    GetNameColorProduct = (color) => {

        console.log('color check', color)
    }
    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    // just color
    HandleToDetailProduct = (id, type, color_index) => {
        if (type === 'color') {
            // console.log('>> detail product color', color_index)

            this.props.history.push(`/detail-product/${id}/${type}/${color_index}`)
        }


    }
    ClickGoToCart = () => {
        this.props.history.push(`/cart`)
    }
    ToHomePage = () => {
        this.props.history.push(`/home`)

    }
    render() {
        let { color, name_color } = this.state
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
                                Màu: {name_color}
                            </div>
                        </div>
                        <div className='product-display-group'>
                            <FilterProduct
                                HandleIdProductByColor={this.HandleIdProductByColor}
                                // HandleDetailCategories={this.HandleDetailCategories}
                                // open_by_categories={true}
                                is_color={true}

                            />
                            <DisplayProduct
                                HandleToDetailProduct={this.HandleToDetailProduct}

                                detail_color={color}
                                open_by_colors={true}
                                GetNameColorProduct={this.GetNameColorProduct}
                            />
                        </div>

                    </div>
                    <div className='thin'></div>
                    <LesacOnme
                    />
                    <HomeBottom />
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
                                Màu: {name_color}
                            </div>
                        </div>
                        <div className='product-display-group'>
                            <FilterProduct
                                HandleIdProductByColor={this.HandleIdProductByColor}
                                // HandleDetailCategories={this.HandleDetailCategories}
                                // open_by_categories={true}
                                is_color={true}

                            />
                            <DisplayProduct
                                HandleToDetailProduct={this.HandleToDetailProduct}

                                detail_color={color}
                                open_by_colors={true}
                                GetNameColorProduct={this.GetNameColorProduct}
                            />
                        </div>

                    </div>
                    <div className='thin'></div>

                    <LesacOnme
                    />
                    <div className='color_bottom'>
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
        // all_data_Product: state.admin.all_data_Product

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataCategoriesProductRedux: () => dispatch(actions.GetAllDataCategoriesProductRedux()),
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorProduct);
