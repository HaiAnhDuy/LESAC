import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../../utils'
import * as actions from '../../../../store/actions'

import { GetAllArrayGenderAndRole, GetAllDataUserService } from '../../../../services/userServices'
import './ProductManager.scss'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TableProduct from './TableProduct';
const animatedComponents = makeAnimated();
class ProductManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data_categories: '',
            categories: '',

            data_active: '',
            activeId: '',

            data_discount: '',
            discountId: '',

            data_color: '',
            colorId: '',

            data_last: '',
            lastId: '',

            price: '',
            name_product: '',
            quality_have: '',
            code_product: '',
            ImageFile: '',
            avatar: [],

            isOpen: false,




        }
    }
    async componentDidMount() {
        await this.props.HandleGetDataDiscountColorLastRedux()
        await this.props.HandleGetAllDataCategoriesRedux();
        await this.props.HandleGetDataArrayActive();
        await this.props.HandleGetAllDataProductService()
        // await this.props.HandleGetDataArrGenderAndRole();
        // // console.log(this.props.Data_gender_role)
        // let Data_gender_role = this.props.Data_gender_role
        let { all_data_categories, data_active, data_full_3_select, all_data_product } = this.props
        let active = data_active.data_active
        let data_discount = data_full_3_select.data_discount;
        let data_last = data_full_3_select.data_last;


        this.setState({
            data_categories: all_data_categories.data,
            data_active: active,
            data_discount: data_discount,
            data_last: data_last

        })


    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.all_data_categories !== this.props.all_data_categories) {
            try {
                let data_categories = this.props.all_data_categories.data




                this.setState({
                    data_categories: data_categories,

                    categories: data_categories && data_categories.length > 0 ? data_categories[0].id : ''
                })

            }
            catch (e) {
                console.log(e)
            }
        }
        if (prevProps.data_active !== this.props.data_active) {
            let { data_active } = this.props;

            let active = data_active.data_active;


            this.setState({
                data_active: active,
                activeId: active && active.length > 0 ? active[0].keyMap : ''

            })

        }


        if (prevProps.data_full_3_select !== this.props.data_full_3_select) {
            let { data_full_3_select } = this.props;

            let data_discount = data_full_3_select.data_discount;
            let data_last = data_full_3_select.data_last;


            this.setState({
                data_discount: data_discount,
                data_last: data_last,
                discountId: data_discount && data_discount.length > 0 ? data_discount[0].keyMap : '',
                lastId: data_last && data_last.length > 0 ? data_last[0].keyMap : ''


            })

        }
    }

    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }
    oneChangeInput = (event, name) => {
        let copystate = this.state
        copystate[name] = event.target.value;
        this.setState({
            ...copystate
        })
    }
    HandleFiles = async (event) => {
        let data = event.target.files
        let Arr = [];
        for (let i = 0; i < data.length; i++) {
            let file = data[i]
            if (file) {
                let base64 = await CommonUtils.getBase64(file)
                // console.log('>>> check base64', i, base64)
                let objectURL = URL.createObjectURL(file)
                Arr.push(base64)

                this.setState({
                    ImageFile: objectURL,
                    avatar: Arr
                })
            }
        }
        console.log(this.state.avatar)

    }
    handleChange = async (selectedOption) => {

        console.log(selectedOption)
        this.setState({
            colorId: selectedOption
        })






    };

    OneClickDone = async () => {
        let { categories, discountId, lastId, colorId, activeId, price, name_product, quality_have, avatar, code_product } = this.state
        await this.props.HandleSaveDataProductRedux({
            name_product: name_product,
            id_categories: categories,
            price: price,
            image: avatar,
            discount: discountId,
            quantity: quality_have,
            activeId: activeId,
            code_product: code_product,
            lastId: lastId
        })
        console.log(this.state)
    }
    render() {

        let { data_categories, data_active, data_discount, data_last, categories, discountId, lastId, activeId, price, name_product, quality_have, code_product } = this.state
        return (
            <>
                <div className='product-manager-container'>
                    <div className='content-title'>
                        <h3>
                            QUẢN LÝ SẢN PHẨM
                        </h3>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3 title_user_redux'>
                                <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>

                            </div>

                            <div className='col-6'>
                                <label>Danh mục sản phẩm</label>
                                <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'categories')} value={categories}>
                                    {data_categories && data_categories.length > 0 &&
                                        data_categories.map((items, index) => {

                                            return (
                                                <>

                                                    <option key={index} value={items.id} selected >{items.name_categories}</option>




                                                </>
                                            )
                                        })

                                    }
                                </select>


                            </div>
                            <div className='col-6 '>
                                <label>GIÁ SẢN PHẨM BAN ĐẦU</label>
                                <input className='form-control' type='number' onChange={(event) => this.oneChangeInput(event, 'price')} value={price}></input>

                            </div>

                            <div className='col-6 '>
                                <label>TÊN SẢN PHẨM</label>

                                <input className='form-control' type='text' onChange={(event) => this.oneChangeInput(event, 'name_product')} value={name_product}></input>

                            </div>
                            <div className='col-6 '>
                                <label>GIẢM GIÁ</label>

                                <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'discountId')} value={discountId}>
                                    {data_discount && data_discount.length > 0 &&
                                        data_discount.map((items, index) => {

                                            return (
                                                <>

                                                    <option key={index} value={items.keyMap} selected>{items.valueVi}</option>




                                                </>
                                            )
                                        })

                                    }
                                </select>
                            </div>



                            <div className='col-6'>
                                <label>TRẠNG THÁI</label>

                                <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'activeId')} value={activeId} >
                                    {data_active && data_active.length > 0 &&
                                        data_active.map((items, index) => {

                                            return (
                                                <>

                                                    <option key={index} value={items.keyMap} selected>{items.valueVi}</option>




                                                </>
                                            )
                                        })

                                    }
                                </select>




                            </div>

                            <div className='col-6'>
                                <label>HÌNH THỨC</label>

                                <select className="form-control role" onChange={(event) => this.oneChangeInput(event, 'lastId')} value={lastId}>
                                    {data_last && data_last.length > 0 &&
                                        data_last.map((items, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={items.keyMap} selected>{items.valueVi}</option>
                                                </>
                                            )
                                        })

                                    }

                                </select>



                            </div>
                            <div className='col-6 mt-3'>
                                <label>Số lượng trong kho</label>
                                <input className='form-control' type='number' onChange={(event) => this.oneChangeInput(event, 'quality_have')} value={quality_have}></input>


                            </div>
                            <div className='col-6 mt-3'>
                                <label>Mã sản phẩm</label>
                                <input className='form-control' type='text' onChange={(event) => this.oneChangeInput(event, 'code_product')} value={code_product}></input>


                            </div>


                            <div className='col-3 mt-5'>
                                <button className='form-group btn-manager-user' onClick={() => this.OneClickDone()}>Xác nhận</button>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>

                </div>
                <TableProduct
                    isOpen={this.state.isOpen}
                    Test={this.Test}
                />
            </>


        )
    }

}

const mapStateToProps = state => {
    return {
        all_data_categories: state.admin.all_data_categories,
        data_active: state.admin.data_active,
        data_full_3_select: state.admin.data_full_3_select,
        all_data_product: state.admin.all_data_product

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        // HandleLetSaveDataManagerUser: (data) => dispatch(actions.LetSaveDataManagerUser(data)),
        // HandleGetAllDataUser: () => dispatch(actions.GetAllDataUser())
        HandleGetAllDataCategoriesRedux: () => dispatch(actions.GetAllDataCategoriesRedux()),
        HandleGetDataArrayActive: () => dispatch(actions.GetDataArrayActive()),
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleSaveDataProductRedux: (data) => dispatch(actions.SaveDataProductRedux(data)),
        HandleGetAllDataProductService: () => dispatch(actions.GetAllDataProductService())



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManager);
