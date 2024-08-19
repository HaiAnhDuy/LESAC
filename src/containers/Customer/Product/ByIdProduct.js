import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ByIdProduct.scss'
import HomeHeader from '../HomeHeader';
import * as actions from "../../../store/actions";
import FilterProduct from './FilterProduct';
import DisplayProduct from './DisplayProduct';
import { GetNameColorByHex } from '../../../services/userServices'
import LesacOnme from '../LesacOnme';
import HomeBottom from '../HomeBottom';


class ByIdProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data_product_id: ''



        }
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.HandleGetAllDataProductColorByIdRedux(id)
            let { data_product_color } = this.props;
            this.setState({
                id: id,
                data_product_id: data_product_color
            })
        }




    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.match !== this.props.match) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                await this.props.HandleGetAllDataProductColorByIdRedux(id)
                let { data_product_color } = this.props;
                this.setState({
                    id: id,
                    data_product_id: data_product_color
                })
            }
        }
        if (prevProps.data_product_color !== this.props.data_product_color) {
            let { data_product_color } = this.props;
            this.setState({

                data_product_id: data_product_color
            })
        }



    }

    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    HandleToDetailProduct = (id) => {
        this.props.history.push(`/detail-product/${id}/by_id/none`)

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
        let { data_product_id } = this.state;
        // console.log('data_product_id', data_product_id)
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

                            {data_product_id && data_product_id.length > 0
                                &&
                                <div className='cuoi'>
                                    Sản phẩm : {data_product_id[0].name_product}
                                </div>
                            }

                        </div>
                        <div className='product-display-group'>

                            <DisplayProduct
                                HandleToDetailProduct={this.HandleToDetailProduct}

                                data_by_id={data_product_id}
                                just_by_id={true}
                            />
                        </div>

                    </div>
                    <div className='thin mt-4'></div>
                    <LesacOnme
                    />
                    <HomeBottom />
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
        data_product_color: state.admin.data_product_color

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ByIdProduct);
