import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FilterProduct.scss'
import HomeHeader from '../HomeHeader';
import * as actions from "../../../store/actions";


class FilterProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

            all_data_Product: '',
            all_data_categories: '',
            data_full_3_select: '',
            all_data_price_allcode: '',
            id: '',
            typeColor: '',
            check_bar: false


        }
    }

    async componentDidMount() {
        await this.props.HandleGetAllDataCategoriesProductRedux()
        await this.props.HandleGetDataDiscountColorLastRedux()
        await this.props.HandleGetAllPriceAllcodeRedux()

        let { all_data_categories_product, data_full_3_select, all_data_price_allcode } = this.props
        this.setState({
            all_data_categories: all_data_categories_product,
            data_full_3_select: data_full_3_select,
            all_data_price_allcode: all_data_price_allcode
        })
        let { typeColor } = this.state;
        if (typeColor) {
            console.log(typeColor)
        }

    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.all_data_categories_product !== this.props.all_data_categories_product) {
            this.setState({
                all_data_categories: this.props.all_data_categories_product
            })
        }
        if (prevProps.data_full_3_select !== this.props.data_full_3_select) {
            this.setState({
                data_full_3_select: this.props.data_full_3_select
            })
        }
        if (prevProps.all_data_price_allcode !== this.props.all_data_price_allcode) {
            this.setState({
                all_data_price_allcode: this.props.all_data_price_allcode
            })
        }




    }

    OneClickHanlde = (data) => {
        // console.log('>>> check detail ,', data)
        this.props.HandleDetailCategories(data.id)
        // this.props.history.push(`/categories/${data.id}`)1
    }
    HandleClickColor = (data) => {
        // console.log(data)
        // this.setState({
        //     typeColor: hex
        // })
        this.props.HandleIdProductByColor(data)
    }
    GoToPriceAllcode = async (data) => {
        await this.props.HandleIdProductByPrice(data)

    }
    OnclicKbar = () => {
        this.setState({
            check_bar: !this.state.check_bar
        })
    }
    render() {
        let { all_data_categories, data_full_3_select, all_data_price_allcode, check_bar } = this.state
        let data_Color = data_full_3_select.data_color
        console.log('all_data_price_allcode', all_data_price_allcode)
        console.log('this.props.open_by_categories,this.props.is_price', this.props.open_by_categories, this.props.is_color)
        return (
            <>

                <div className='product-display-group-content-left'>
                    <div className='boloc'>
                        Bộ lọc
                    </div>
                    <div className='thin_2'></div>
                    {this.props.is_color === true || this.props.is_price === true
                        ?
                        ''
                        :
                        <div className='phanloai'>
                            <div className='text'>
                                phân loại
                            </div>
                            {all_data_categories && all_data_categories.length > 0
                                && all_data_categories.map((items, index) => {
                                    return (
                                        <>
                                            {

                                                <div className='text-child' onClick={() => this.OneClickHanlde(items)}>
                                                    {items.name_categories}
                                                </div>

                                            }




                                        </>
                                    )
                                })
                            }


                        </div>
                    }

                    <div className='thin_2'></div>
                    {this.props.open_by_categories === true || this.props.is_price === true
                        ?
                        ''

                        :
                        <div className='mausac'>
                            <div className='text'>
                                màu sắc
                            </div>
                            {data_Color && data_Color.length > 0 && data_Color.map((items, index) => {
                                return (
                                    <>
                                        <div className='color-child' onClick={() => this.HandleClickColor(items.keyMap)}>
                                            <div style={{ backgroundColor: items.keyMap }} className='color'>

                                            </div>
                                            <div className='color-name'>
                                                {items.valueVi}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}


                        </div>
                    }

                    <div className='thin_2'></div>
                    {/* {
                        this.props.open_by_categories === true || this.props.is_color === true
                            ?
                            ''
                            :
                            <div className='khoanggia'>
                                <div className='text'>
                                    khoảng giá
                                </div>
                                <div className='khoanggia-content'>
                                    {all_data_price_allcode && all_data_price_allcode.length > 0 &&
                                        all_data_price_allcode.map((items, index) => {
                                            return (
                                                <>
                                                    <div className='khoanggia-content-child' onClick={() => this.GoToPriceAllcode(items.keyMap)}>
                                                        {items.valueVi}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                    } */}

                </div>
                <div className='product-display-group-content-left-2'>

                    <div className='boloc' onClick={() => this.OnclicKbar()}>
                        Bộ lọc <i class="fas fa-chevron-down"></i>
                    </div>
                    {
                        check_bar === false
                            ?
                            ''
                            :
                            <div className='bar-boloc' >
                                {
                                    this.props.open_by_categories === true ?
                                        <div className='phanloai'>
                                            <div className='pl-text'>
                                                phân loại
                                            </div>

                                            {all_data_categories && all_data_categories.length > 0
                                                && all_data_categories.map((items, index) => {
                                                    return (
                                                        <>
                                                            {

                                                                <div className='text-child' onClick={() => this.OneClickHanlde(items)}>
                                                                    {items.name_categories}
                                                                </div>

                                                            }




                                                        </>
                                                    )
                                                })

                                            }

                                        </div>
                                        :
                                        ''
                                }

                                <div className='pl-thin'>

                                </div>


                                {/* text */}
                                {this.props.is_color === true
                                    ?
                                    <div className='mausac'>
                                        <div className='ms-text'>
                                            màu sắc
                                        </div>
                                        {data_Color && data_Color.length > 0 && data_Color.map((items, index) => {
                                            return (
                                                <>
                                                    <div className='color-child' onClick={() => this.HandleClickColor(items.keyMap)}>
                                                        <div style={{ backgroundColor: items.keyMap }} className='color'>

                                                        </div>
                                                        <div className='color-name'>
                                                            {items.valueVi}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}


                                    </div>

                                    :
                                    ''
                                }

                            </div>
                    }


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
        all_data_price_allcode: state.admin.all_data_price_allcode
        // all_data_Product: state.admin.all_data_Product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataCategoriesProductRedux: () => dispatch(actions.GetAllDataCategoriesProductRedux()),
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleGetAllPriceAllcodeRedux: () => dispatch(actions.GetAllPriceAllcodeRedux())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterProduct);
