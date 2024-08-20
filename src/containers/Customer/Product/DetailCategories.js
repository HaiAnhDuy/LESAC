import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailCategories.scss'
import HomeHeader from '../HomeHeader';
import * as actions from "../../../store/actions";
import FilterProduct from './FilterProduct';
import DisplayProduct from './DisplayProduct';
import { GetDataCategoriesById } from '../../../services/userServices'
import LesacOnme from '../LesacOnme';
import HomeBottom from '../HomeBottom';


class DetailCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',

            data_product_by_categories: '',
            name_categories: ''



        }
    }

    async componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let id = this.props.match.params.id;
        //     this.setState({
        //         id: id
        //     })
        // }
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.GetNameCategories(id)

            this.setState({
                id: id
            })
        }




    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.match !== this.props.match) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                this.GetNameCategories(id)
                this.setState({
                    id: id
                })
            }
        }



    }

    HandleDetailCategories = async (id) => {
        // console.log('>>> check detail 2 ,', id)
        // this.setState({
        //     id: id
        // })
        // console.log('lan 2 ', this.props.history)
        this.props.history.push(`/categories/${id}`)
    }
    GetNameCategories = async (id) => {
        let data = await GetDataCategoriesById(id)
        this.setState({
            name_categories: data.data.data.name_categories
        })
        console.log(data)
    }

    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    HandleToDetailProduct = (id, type, id_categories) => {
        if (type === 'categories') {
            this.props.history.push(`/detail-product/${id}/${type}/${id_categories}`)

        }

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
        let { id } = this.state
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
                                Danh mục sản phẩm: {this.state.name_categories}
                            </div>
                        </div>
                        <div className='product-display-group'>
                            <FilterProduct
                                HandleDetailCategories={this.HandleDetailCategories}
                                open_by_categories={true}
                                is_color={false}

                            />
                            <DisplayProduct
                                HandleToDetailProduct={this.HandleToDetailProduct}

                                id_detal={id}
                                is_by_categories={true}
                            />
                        </div>

                    </div>
                    <div className='thin_dp'></div>
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
                                Danh mục : {this.state.name_categories}
                            </div>
                        </div>
                        <div className='product-display-group'>
                            <FilterProduct
                                HandleDetailCategories={this.HandleDetailCategories}
                                open_by_categories={true}
                                is_color={false}

                            />
                            <DisplayProduct
                                HandleToDetailProduct={this.HandleToDetailProduct}

                                id_detal={id}
                                is_by_categories={true}
                            />
                        </div>

                    </div>
                    <div className='thin_dp'></div>
                    {/* <LesacOnme
                    /> */}
                    <div className='rp_1'>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategories);
