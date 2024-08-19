import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailProduct.scss'
import HomeHeader from '../../HomeHeader';
import NumberFormat from 'react-number-format';
import { GetDataCategoriesById } from '../../../../services/userServices'

import * as actions from "../../../../store/actions";
import AddToCartDetailProduct from './AddToCartDetailProduct';
import LesacOnme from '../../LesacOnme';
import HomeBottom from '../../HomeBottom';

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data_yml: '',
            type: '',
            type_after: '',
            id_type: '',
            just_color: false,
            data: '',
            name_categories: '',
            index_img: '',
            detail_image: '',
            check_by_cart: false,
            make_border: -1,
            data_mark: '',
            status_set: -1


        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let type = this.props.match.params.type;
            type = +type
            let { type_after } = this.state
            let id_type = this.props.match.params.id_type
            if (type === 'color') {
                this.setState({
                    just_color: true,

                })
            }

            await this.props.HandleGetAllDataProductColorByIdRedux(id)
            let { data_product_color } = this.props;

            if (type === type_after) {
                let detail_data_product = '';
                if (data_product_color && data_product_color.length > 0) {
                    detail_data_product = data_product_color[0]

                }

                let data_image = '';
                if (detail_data_product.image && detail_data_product.image.length > 0) {
                    data_image = detail_data_product.image;
                }
                this.setState({
                    just_color: false,
                    check_by_cart: false,
                    make_border: -1
                })
            }
            if (data_product_color && data_product_color.length > 0) {
                this.GetNameCategories(data_product_color[0].id_categories)

            }
            console.log('data_mark', data_product_color);
            let id_categories = ''

            let data_yml = ''
            if (data_product_color && data_product_color.length > 0) {
                id_categories = data_product_color[0].id_categories;
                await this.props.HandleGetDataYMlRedux(id_categories);
                data_yml = this.props.data_yml

            }
            this.setState({
                id: id,
                data_yml: data_yml,
                type: type,
                id_type: id_type,
                data: data_product_color,
                data_mark: data_product_color[0]["MarkData.contentHTML"]
            })

        }


    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.match !== this.props.match) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                let type = this.props.match.params.type
                type = +type
                let id_type = this.props.match.params.id_type
                if (type === 'color') {
                    this.setState({
                        just_color: true,

                    })
                }

                await this.props.HandleGetAllDataProductColorByIdRedux(id)
                let { data_product_color } = this.props;
                if (data_product_color && data_product_color.length > 0) {
                    this.GetNameCategories(data_product_color[0].id_categories)

                }
                let id_categories = ''
                let data_yml = ''
                if (data_product_color && data_product_color.length > 0) {
                    id_categories = data_product_color[0].id_categories;
                    await this.props.HandleGetDataYMlRedux(id_categories);
                    data_yml = this.props.data_yml

                }

                this.setState({
                    id: id,
                    data_yml: data_yml,
                    type: type,

                    id_type: id_type,
                    data: data_product_color,
                    data_mark: data_product_color[0]["MarkData.contentHTML"]

                })

            }
        }

    }

    HandleToDetailProduct = (id, type, id_categories) => {

        this.setState({
            type_after: type,
            just_color: false,
            check_by_cart: false,
            make_border: -1,
            index_img: -1,
            status_set: true,

        })
        window.location.href = `/detail-product/${id}/${type}/${id_categories}`

        // this.props.history.push(`/detail-product/${id}/${type}/${id_categories}`)



    }


    GetNameCategories = async (id) => {
        let data = await GetDataCategoriesById(id);
        // console.log
        this.setState({
            name_categories: data.data.data.name_categories
        })
    }
    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    HandleChangeImg = (index, check) => {
        let { data } = this.state
        let data_image = ''
        let detail_data_product = ''
        if (data && data.length > 0) {
            detail_data_product = data[0]

        }
        if (detail_data_product.image && detail_data_product.image.length > 0) {
            data_image = detail_data_product.image;
        }
        this.setState({
            detail_image: data_image[index],
            check_by_cart: true,
            just_color: check,
            index_img: index,
            make_border: -1,
            status_set: check
        })
    }
    HandleClickSmallImg = (index) => {
        this.setState({
            make_border: index,
            just_color: false
        })
    }
    HandleToCart = () => {
        this.props.history.push(`/cart`)
    }
    HandleToCheckOut = () => {
        this.props.history.push(`/checkout`)

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
        let { data, index_img, detail_image, data_mark, just_color, id_type, id, data_yml, type_after, type } = this.state;
        console.log(type_after, type)
        let detail_data_product = '';
        if (data && data.length > 0) {
            detail_data_product = data[0]

        }

        let data_image = '';
        if (detail_data_product.image && detail_data_product.image.length > 0) {
            data_image = detail_data_product.image;
        }
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
                                <li className='trc'>
                                    {this.state.name_categories}
                                </li>
                                <li>
                                    |
                                </li>
                                <li className='sau'>
                                    {detail_data_product.name_product}
                                </li>

                            </ul>
                            <div className='cuoi'>
                                ❤️
                            </div>
                        </div>

                        <div className='detail-product-container'>
                            <div className='detail-product-content-left'>
                                {
                                    just_color === false && this.state.make_border !== -1 && data_image && data_image.length > 0 &&
                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(data_image[this.state.make_border].image, 'base64').toString('binary')})` }}>

                                    </div>
                                }
                                {just_color === false && data_image && data_image.length > 0 && this.state.check_by_cart === false && this.state.make_border === -1
                                    ?


                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(data_image[0].image, 'base64').toString('binary')})` }}>

                                    </div>
                                    :
                                    just_color === false && data_image && data_image.length > 0 && this.state.check_by_cart === true && this.state.make_border === -1
                                    &&
                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(detail_image.image, 'base64').toString('binary')})` }}>

                                    </div>



                                }
                                {just_color === true && data_image && data_image.length > 0 &&

                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(data_image[id_type].image, 'base64').toString('binary')})` }}>

                                    </div>
                                }




                                <div className='controller-small-img'>
                                    {data_image && data_image.length > 0
                                        && data_image.map((items, index) => {
                                            let url = new Buffer(items.image, 'base64').toString('binary')

                                            return (
                                                <>
                                                    <div className={this.state.make_border === index ? 'small-img add_border' : 'small-img'} style={{ backgroundImage: `url(${url})` }} onClick={() => { this.HandleClickSmallImg(index) }}>

                                                    </div>
                                                </>
                                            )
                                        })
                                    }





                                </div>



                            </div>
                            <div className='detail-product-content-right'>
                                <AddToCartDetailProduct
                                    data={detail_data_product}
                                    HandleChangeImg={this.HandleChangeImg}
                                    data_mark={data_mark}
                                    detail_image={detail_image}
                                    HandleToCart={this.HandleToCart}
                                    HandleToCheckOut={this.HandleToCheckOut}
                                    status_set={this.state.status_set}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='thin_dp'></div>
                    <div className='you-maybe-like-container'>
                        <div className='yml-title'>
                            <h2>
                                Bạn có thể thích?
                            </h2>
                        </div>
                        <div className='yml-content'>
                            {data_yml && data_yml.length > 0 &&
                                data_yml.map((items, index) => {
                                    return (
                                        <>
                                            <div className='yml-display-container' onClick={() => this.HandleToDetailProduct(items.id, index, items.id_categories)}>
                                                <div className='yml-display-img' style={{
                                                    backgroundImage: `url(${new Buffer(items.image[0].image, 'base64').toString('binary')})`
                                                }}>

                                                </div>
                                                <div className='yml-display-content' >
                                                    <div className='name-product-yml'>
                                                        <h3>
                                                            {items.name_product}
                                                        </h3>
                                                    </div>
                                                    <div className='price-product-yml'>
                                                        <p>
                                                            <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }



                        </div>
                    </div>
                    <div className='thin_dp'></div>

                    {/* <LesacOnme
                    /> */}
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
                                <li className='trc'>
                                    {this.state.name_categories}
                                </li>
                                <li>
                                    |
                                </li>
                                <li className='sau'>
                                    {detail_data_product.name_product}
                                </li>

                            </ul>
                            <div className='cuoi'>
                                ❤️
                            </div>
                        </div>

                        <div className='detail-product-container'>
                            <div className='detail-product-content-left'>
                                {
                                    just_color === false && this.state.make_border !== -1 && data_image && data_image.length > 0 &&
                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(data_image[this.state.make_border].image, 'base64').toString('binary')})` }}>

                                    </div>
                                }
                                {just_color === false && data_image && data_image.length > 0 && this.state.check_by_cart === false && this.state.make_border === -1
                                    ?


                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(data_image[0].image, 'base64').toString('binary')})` }}>

                                    </div>
                                    :
                                    just_color === false && data_image && data_image.length > 0 && this.state.check_by_cart === true && this.state.make_border === -1
                                    &&
                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(detail_image.image, 'base64').toString('binary')})` }}>

                                    </div>



                                }
                                {just_color === true && data_image && data_image.length > 0 &&

                                    <div className='big-img' style={{ backgroundImage: `url(${new Buffer(data_image[id_type].image, 'base64').toString('binary')})` }}>

                                    </div>
                                }




                                <div className='controller-small-img'>
                                    {data_image && data_image.length > 0
                                        && data_image.map((items, index) => {
                                            let url = new Buffer(items.image, 'base64').toString('binary')

                                            return (
                                                <>
                                                    <div className={this.state.make_border === index ? 'small-img add_border' : 'small-img'} style={{ backgroundImage: `url(${url})` }} onClick={() => { this.HandleClickSmallImg(index) }}>

                                                    </div>
                                                </>
                                            )
                                        })
                                    }





                                </div>



                            </div>
                            <div className='detail-product-content-right'>
                                <AddToCartDetailProduct
                                    data={detail_data_product}
                                    HandleChangeImg={this.HandleChangeImg}
                                    data_mark={data_mark}
                                    detail_image={detail_image}
                                    HandleToCart={this.HandleToCart}
                                    HandleToCheckOut={this.HandleToCheckOut}
                                    status_set={this.state.status_set}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='thin_dp'></div>
                    <div className='you-maybe-like-container'>
                        <div className='yml-title'>
                            <h2>
                                Bạn có thể thích?
                            </h2>
                        </div>
                        <div className='yml-content'>
                            {data_yml && data_yml.length > 0 &&
                                data_yml.map((items, index) => {
                                    return (
                                        <>
                                            <div className='yml-display-container' onClick={() => this.HandleToDetailProduct(items.id, index, items.id_categories)} >
                                                <div className='yml-display-img' style={{
                                                    backgroundImage: `url(${new Buffer(items.image[0].image, 'base64').toString('binary')})`
                                                }}>

                                                </div>
                                                <div className='yml-display-content' >
                                                    <div className='name-product-yml'>
                                                        <h3>
                                                            {items.name_product}
                                                        </h3>
                                                    </div>
                                                    <div className='price-product-yml'>
                                                        <p>
                                                            <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }



                        </div>
                    </div>
                    <div className='thin_dp'></div>

                    {/* <LesacOnme
                    /> */}
                    <div className='detail_product_hbt'>
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
        data_product_color: state.admin.data_product_color,
        data_yml: state.admin.data_yml


        // all_data_Product: state.admin.all_data_Product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // HandleGetAllDataCategoriesProductRedux: () => dispatch(actions.GetAllDataCategoriesProductRedux()),
        // HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        // HandleGetAllDataCategoriesProductByIdRedux: (id) => dispatch(actions.GetAllDataCategoriesProductByIdRedux(id)),
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id)),
        HandleAddToCartRedux: (data) => dispatch(actions.AddToCartRedux(data)),
        HandleGetDataYMlRedux: (id) => dispatch(actions.GetDataYMlRedux(id))




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
