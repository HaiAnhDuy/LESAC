import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DisplayProduct.scss'
import HomeHeader from '../HomeHeader';
import NumberFormat from 'react-number-format';

import * as actions from "../../../store/actions";


class DisplayProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            get_id_by_hex: '',
            data_by_id: '',
            data_product_by_color: '',
            data_product_by_categories: '',
            id: '',
            color_index: '',
            open_color: '',
            open_categories: ''




        }
    }

    async componentDidMount() {
        // if (this.props.id_in_product) {
        //     let { id_in_product } = this.props
        //     console.log('id_in_product', this.props.id_in_product)

        //     await this.props.HandleGetAllDataCategoriesProductByIdRedux(id_in_product)
        //     let data_product_by_categories = this.props.data_product_by_categories
        //     this.setState({
        //         data_product_by_categories: data_product_by_categories
        //     })
        // }
        if (this.props.data_by_id) {
            this.setState({
                data_by_id: this.props.data_by_id
            })
        }
        if (this.props.open_by_categories) {
            this.setState({
                open_categories: this.props.open_by_categories
            })
        }
        if (this.props.open_by_colors) {
            this.setState({
                open_color: this.props.open_by_colors
            })
        }
        if (this.props.detail_color) {
            let hex = this.props.detail_color
            await this.props.HandleGetIdByHexRedux(hex);
            let { get_id_by_hex } = this.props;
            console.log('get_id_by_hex', get_id_by_hex)
            // this.setState({
            //     get_id_by_hex: get_id_by_hex
            // })
            let data_array_color_product = []
            if (get_id_by_hex && get_id_by_hex.length > 0) {
                get_id_by_hex = get_id_by_hex.map(async (items, index) => {
                    await this.props.HandleGetAllDataProductColorByIdRedux(items.id_product);
                    let { data_product_color } = this.props;
                    items.data_product = data_product_color
                    return items

                })
                Promise.all(get_id_by_hex).then((values) => {
                    this.setState({
                        get_id_by_hex: values
                    })
                });
                await this.props.GetNameColorProduct(this.state.get_id_by_hex)
            } else {
                this.setState({
                    get_id_by_hex: ''
                })
            }

        }
        if (this.props.open_by_id === false) {

            await this.props.HandleGetAllDataCategoriesProductByIdRedux('ALL')
            let data_product_by_categories = this.props.data_product_by_categories

            if (data_product_by_categories && data_product_by_categories.data_product_by_categories && data_product_by_categories.data_product_by_categories.length > 0) {
                this.setState({
                    data_product_by_categories: data_product_by_categories.data_product_by_categories
                })
            }
            else {
                this.setState({
                    data_product_by_categories: ''
                })
            }
        }
        if (this.props.id_detal) {
            let { id_detal } = this.props
            console.log('id_detal', this.props.id_detal)
            // this.setState({
            //     id: id_detal
            // })

            await this.props.HandleGetAllDataCategoriesProductByIdRedux(id_detal)
            let data_product_by_categories = this.props.data_product_by_categories
            if (data_product_by_categories && data_product_by_categories.data_product_by_categories && data_product_by_categories.data_product_by_categories.length > 0) {
                this.setState({
                    data_product_by_categories: data_product_by_categories.data_product_by_categories
                })
            }
            else {
                this.setState({
                    data_product_by_categories: ''
                })
            }

        }


    }
    async componentDidUpdate(prevProps, prevState) {
        // if (prevProps.detail_color !== this.props.id_in_product) {
        //     let { id_in_product } = this.props;
        //     await this.props.HandleGetAllDataCategoriesProductByIdRedux(id_in_product)
        //     let data_product_by_categories = this.props.data_product_by_categories
        //     this.setState({
        //         data_product_by_categories: data_product_by_categories
        //     })

        // }
        if (prevProps.data_by_id !== this.props.data_by_id) {
            this.setState({
                data_by_id: this.props.data_by_id
            })
        }
        if (prevProps.detail_color !== this.props.detail_color) {
            let { detail_color } = this.props;
            await this.props.HandleGetIdByHexRedux(detail_color);
            let { get_id_by_hex } = this.props;
            // this.setState({
            //     get_id_by_hex: get_id_by_hex
            // })
            let data_array_color_product = []
            if (get_id_by_hex && get_id_by_hex.length > 0) {
                get_id_by_hex = get_id_by_hex.map(async (items, index) => {
                    await this.props.HandleGetAllDataProductColorByIdRedux(items.id_product);
                    let data = this.props.data_product_color
                    items.data_product = data;
                    return items
                    // console.log('<<<<', data)

                    // data_array_color_product.push(data);

                })
                Promise.all(get_id_by_hex).then((values) => {
                    this.setState({
                        get_id_by_hex: values
                    }, this.props.GetNameColorProduct(this.state.get_id_by_hex))
                });


            } else {
                this.setState({
                    get_id_by_hex: ''
                })
            }

        }
        if (prevProps.id_detal !== this.props.id_detal) {
            let { id_detal } = this.props;
            // this.setState({
            //     id: id_detal
            // })
            await this.props.HandleGetAllDataCategoriesProductByIdRedux(id_detal)
            let data_product_by_categories = this.props.data_product_by_categories
            if (data_product_by_categories && data_product_by_categories.data_product_by_categories && data_product_by_categories.data_product_by_categories.length > 0) {
                this.setState({
                    data_product_by_categories: data_product_by_categories.data_product_by_categories
                })
            }
            else {
                this.setState({
                    data_product_by_categories: ''
                })
            }

        }

        if (prevProps.open_by_categories !== this.props.open_by_categories) {
            this.setState({
                open_categories: this.props.open_by_categories
            })
        }
        if (prevProps.open_by_colors !== this.props.open_by_colors) {
            this.setState({
                open_color: this.props.open_by_colors
            })
        }


    }

    HandleChangeDetailProduct = async (data, type, color_index) => {
        if (type === 'color') {
            // console.log('>>data detail product color', data)
            await this.props.HandleToDetailProduct(data.id_product, type, color_index)


        } if (type === 'categories') {
            await this.props.HandleToDetailProduct(data.id, type, data.id_categories)

            // console.log('>>data detail product categories', data)

        }
        else {
            await this.props.HandleToDetailProduct(data.id)

        }


    }


    render() {
        let { data_product_by_categories, get_id_by_hex, data_product_by_color, open_color, open_categories, data_by_id } = this.state
        // console.log('get_id_by_hex:', get_id_by_hex)
        return (
            <>
                <div className='product-display-group-content-right'>

                    {data_product_by_categories && data_product_by_categories.length > 0
                        ? data_product_by_categories.map((items, index) => {
                            let url = new Buffer(items.image[0].image, 'base64').toString('binary')
                            return (
                                <>
                                    <div className='display-product-content' onClick={() => this.HandleChangeDetailProduct(items, 'categories')}>
                                        <div className='display-image-product' style={{ backgroundImage: `url(${url})` }}></div>
                                        <div className='content-display'>
                                            <h3>
                                                {items.name_product}                                            </h3>
                                            <p>
                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                            </p>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                        :
                        !open_color && !this.props.just_by_id &&
                        <div>
                            Hiện tại đã tạm hết sản phẩm này !
                        </div>



                    }

                    {
                        get_id_by_hex && get_id_by_hex.length > 0
                            ? get_id_by_hex.map((items, index) => {
                                let hex = this.props.detail_color
                                hex = '#' + hex;
                                let color_index = '';
                                let check = false
                                return (
                                    <>
                                        <div className='display-product-content' >

                                            {items.data_product[0].color && items.data_product[0].color.length > 0
                                                && items.data_product[0].color.map((data, index) => {

                                                    if (data.colorType === hex) {
                                                        color_index = index
                                                    }
                                                })
                                            }

                                            {items.data_product[0].image && items.data_product[0].image.length > 0
                                                && items.data_product[0].image.map((data, index2) => {

                                                    if (index2 === color_index) {
                                                        check = true
                                                    }
                                                })
                                            }




                                            {check === true
                                                &&
                                                <div className='display-image-product' style={{
                                                    backgroundImage: `url(${new Buffer(items.data_product[0].image[color_index].image, 'base64').toString('binary')})`
                                                }} onClick={() => this.HandleChangeDetailProduct(items, 'color', color_index)}></div>
                                            }



                                            <div className='content-display'>
                                                {items.data_product && items.data_product.length > 0
                                                    &&
                                                    <h3>
                                                        {items.data_product[0].name_product}
                                                    </h3>
                                                }
                                                {items.data_product && items.data_product.length > 0
                                                    &&

                                                    <p>
                                                        <NumberFormat value={items.data_product[0].price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                                    </p>
                                                }

                                            </div>
                                        </div>

                                    </>
                                )
                            })
                            :

                            open_color === true &&
                            <div>
                                Không tìm thấy sản phẩm màu này
                            </div>


                    }
                    {
                        this.props.just_by_id === true && data_by_id && data_by_id.length > 0
                        && data_by_id.map((items, index) => {
                            let url = new Buffer(items.image[0].image, 'base64').toString('binary')

                            return (
                                <>
                                    <div className='display-product-content' onClick={() => this.HandleChangeDetailProduct(items)}>
                                        <div className='display-image-product' style={{ backgroundImage: `url(${url})` }}></div>
                                        <div className='content-display'>
                                            <h3>
                                                {items.name_product}                                            </h3>
                                            <p>
                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }



                </div >

                <div className='product-display-group-content-right-2'>

                    {data_product_by_categories && data_product_by_categories.length > 0
                        ? data_product_by_categories.map((items, index) => {
                            let url = new Buffer(items.image[0].image, 'base64').toString('binary')
                            return (
                                <>
                                    <div className='display-product-content' onClick={() => this.HandleChangeDetailProduct(items, 'categories')}>
                                        <div className='display-image-product' style={{ backgroundImage: `url(${url})` }}></div>
                                        <div className='content-display'>
                                            <h3>
                                                {items.name_product}                                            </h3>
                                            <p>
                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                            </p>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                        :
                        !open_color && !this.props.just_by_id &&
                        <div className='hetsp_categories'>
                            Hiện tại đã tạm hết sản phẩm này !
                        </div>



                    }

                    {
                        get_id_by_hex && get_id_by_hex.length > 0
                            ? get_id_by_hex.map((items, index) => {
                                let hex = this.props.detail_color
                                hex = '#' + hex;
                                let color_index = '';
                                let check = false
                                return (
                                    <>
                                        <div className='display-product-content' >

                                            {items.data_product[0].color && items.data_product[0].color.length > 0
                                                && items.data_product[0].color.map((data, index) => {

                                                    if (data.colorType === hex) {
                                                        color_index = index
                                                    }
                                                })
                                            }

                                            {items.data_product[0].image && items.data_product[0].image.length > 0
                                                && items.data_product[0].image.map((data, index2) => {

                                                    if (index2 === color_index) {
                                                        check = true
                                                    }
                                                })
                                            }




                                            {check === true
                                                &&
                                                <div className='display-image-product' style={{
                                                    backgroundImage: `url(${new Buffer(items.data_product[0].image[color_index].image, 'base64').toString('binary')})`
                                                }} onClick={() => this.HandleChangeDetailProduct(items, 'color', color_index)}></div>
                                            }



                                            <div className='content-display'>
                                                {items.data_product && items.data_product.length > 0
                                                    &&
                                                    <h3>
                                                        {items.data_product[0].name_product}
                                                    </h3>
                                                }
                                                {items.data_product && items.data_product.length > 0
                                                    &&

                                                    <p>
                                                        <NumberFormat value={items.data_product[0].price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                                    </p>
                                                }

                                            </div>
                                        </div>

                                    </>
                                )
                            })
                            :

                            open_color === true &&
                            <div className='color_text'>
                                Không tìm thấy sản phẩm màu này
                            </div>


                    }
                    {
                        this.props.just_by_id === true && data_by_id && data_by_id.length > 0
                        && data_by_id.map((items, index) => {
                            let url = new Buffer(items.image[0].image, 'base64').toString('binary')

                            return (
                                <>
                                    <div className='display-product-content' onClick={() => this.HandleChangeDetailProduct(items)}>
                                        <div className='display-image-product' style={{ backgroundImage: `url(${url})` }}></div>
                                        <div className='content-display'>
                                            <h3>
                                                {items.name_product}                                            </h3>
                                            <p>
                                                <NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }



                </div >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        all_data_categories_product: state.admin.all_data_categories_product,
        data_full_3_select: state.admin.data_full_3_select,
        data_product_by_categories: state.admin.data_product_by_categories,
        get_id_by_hex: state.admin.get_id_by_hex,
        data_product_color: state.admin.data_product_color


        // all_data_Product: state.admin.all_data_Product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // HandleGetAllDataCategoriesProductRedux: () => dispatch(actions.GetAllDataCategoriesProductRedux()),
        // HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleGetAllDataCategoriesProductByIdRedux: (id) => dispatch(actions.GetAllDataCategoriesProductByIdRedux(id)),
        HandleGetIdByHexRedux: (hex) => dispatch(actions.GetIdByHexRedux(hex)),
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProduct);
