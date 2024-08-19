import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions'

class ModalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
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
        if (this.props.data_save) {
            let data_full = this.props.data_save

            this.setState({
                id: data_full.id,
                price: data_full.price,
                name_product: data_full.name_product,
                quality_have: data_full.quantity,
                lastId: data_full.lastId,
                discountId: data_full.discount,
                id_categories: data_full.id_categories,
                code_product: data_full.code_product,
                activeId: data_full.activeId
            })
        }


    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data_save !== this.props.data_save) {
            let data_full = this.props.data_save

            this.setState({
                id: data_full.id,

                price: data_full.price,
                name_product: data_full.name_product,
                quality_have: data_full.quantity,
                lastId: data_full.lastId,
                discountId: data_full.discount,
                id_categories: data_full.id_categories,
                code_product: data_full.code_product,
                activeId: data_full.activeId
            })



        }

    }
    toggle = () => {
        this.props.Test(!this.props.isOpen)

        // this.props.dong('')
    }

    start = async () => {
        let data_state = this.state
        await this.props.HandleUpdateroductByIdRedux({
            id: data_state.id,
            price: data_state.price,
            name_product: data_state.name_product,
            quality: data_state.quality_have,
            lastId: data_state.lastId,
            discountId: data_state.discountId,
            id_categories: data_state.id_categories,
            code_product: data_state.code_product,
            activeId: data_state.activeId
        })
        await this.props.HandleGetAllDataProductColorByIdRedux('ALL');


        console.log(this.state)


    }
    oneChangeInput = (event, name) => {
        let copystate = this.state
        copystate[name] = event.target.value;
        this.setState({
            ...copystate
        })
    }




    render() {
        let { price,
            name_product,
            quality_have,
            lastId,
            discountId,
            id_categories,
            code_product, activeId, data_categories, data_active, data_discount, data_color, data_last } = this.state
        return (

            <>


                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} size='lg'>
                    <ModalHeader toggle={() => { this.toggle() }}>Sửa thông tin</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Danh mục sản phẩm</label>
                                    <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'categories')} value={id_categories}>
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

                                    <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'activeId')} value={activeId}>
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
                                    <input className='form-control' type='text' onChange={(event) => this.oneChangeInput(event, 'code_product')} value={code_product} ></input>


                                </div>
                            </div>
                        </div>




                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary px-3" onClick={() => { this.start() }}>
                            Xác nhận
                        </Button>{' '}
                        <Button color="secondary px-3" onClick={() => { this.toggle() }}>
                            Huỷ                        </Button>
                    </ModalFooter>
                </Modal>


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
        HandleGetDataArrayActive: () => dispatch(actions.GetDataArrayActive()),
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleSaveDataProductRedux: (data) => dispatch(actions.SaveDataProductRedux(data)),
        HandleGetAllDataProductService: () => dispatch(actions.GetAllDataProductService()),
        HandleUpdateroductByIdRedux: (data) => dispatch(actions.UpdateroductByIdRedux(data)),
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id)),

        HandleGetAllDataCategoriesRedux: () => dispatch(actions.GetAllDataCategoriesRedux()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);