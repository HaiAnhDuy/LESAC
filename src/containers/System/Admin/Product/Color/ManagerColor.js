import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../../../utils'
import * as actions from '../../../../../store/actions'
import './ManagerColor.scss'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TableColor from './TableColor';
const animatedComponents = makeAnimated();
class ManagerColor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            data_color: '',
            colorId: '',
            name_product: '',
            data_name: '',
            id_product: '',
            isOpen: false,






        }
    }
    async componentDidMount() {
        await this.props.HandleGetDataDiscountColorLastRedux()
        await this.props.HandleGetAllDataProductService()

        // await this.props.HandleGetDataArrGenderAndRole();
        // // console.log(this.props.Data_gender_role)
        // let Data_gender_role = this.props.Data_gender_role
        let { data_full_3_select, all_data_product } = this.props
        let data_color = data_full_3_select.data_color;
        let data_name = all_data_product.data;
        let id_data = all_data_product.data;


        this.setState({

            data_color: data_color,
            data_name: data_name

        })


    }
    async componentDidUpdate(prevProps, prevState) {


        if (prevProps.data_full_3_select !== this.props.data_full_3_select) {
            let { data_full_3_select } = this.props;

            let data_color = data_full_3_select.data_color;



            this.setState({
                data_color: data_color,
                colorId: data_color && data_color.length > 0 ? data_color[0].keyMap : '',


            })

        }
        if (prevProps.all_data_product !== this.props.all_data_product) {
            let { all_data_product } = this.props;

            let data_name = all_data_product.data;



            this.setState({
                data_name: data_name

            })

        }
    }

    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }

    handleBuiltData = (datainput) => {
        let { name_product } = this.state
        let result = [];
        let data_color = '';
        let id = name_product.value;

        {
            datainput && datainput.length > 0 &&
                datainput.map((items, index1) => {
                    let name = `${items.valueVi}`


                    data_color = { code: name_product.code, id_product: id, value: items.keyMap, label: name }
                    result.push(data_color)
                })

        }
        return result
    }
    handleBuiltDataNameProduct = (datainput) => {
        let result = [];
        let data_name = ''
        {
            datainput && datainput.length > 0 &&
                datainput.map((items, index) => {
                    let name = `${items.name_product}`
                    data_name = { code: items.code_product, value: items.id, label: name }
                    result.push(data_name)
                })

        }
        return result
    }

    handleChangeColor = async (selectedOption) => {
        console.log(selectedOption)

        this.setState({
            colorId: selectedOption
        })
    };
    handleChangeNameProduct = async (selectedOption) => {

        console.log(selectedOption)
        this.setState({
            name_product: selectedOption,
            id_product: selectedOption.value,

        })
    };


    OneClickDone = async () => {
        let { colorId } = this.state

        await this.props.HandleSaveDataColorProductService({
            ArrColor: colorId,
        })
    }
    render() {

        let { data_color, data_name } = this.state

        return (
            <>
                <div className='product-manager-container'>
                    <div className='content-title'>
                        <h3>
                            QUẢN LÝ MÀU
                        </h3>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3 title_user_redux'>
                                <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>

                            </div>

                            <div className='col-6'>
                                <label>Sản Phẩm</label>
                                <Select
                                    value={this.state.name_product}
                                    onChange={this.handleChangeNameProduct}

                                    options={this.handleBuiltDataNameProduct(data_name)}

                                />


                            </div>

                            <div className='col-6 mt-1'>
                                <label>MÀU</label>

                                <Select
                                    isMulti
                                    value={this.state.colorId}


                                    onChange={this.handleChangeColor}

                                    options={this.handleBuiltData(data_color)}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>






                            <div className='col-3 mt-5'>
                                <button className='form-group btn-manager-user' onClick={() => this.OneClickDone()}>Xác nhận</button>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>

                </div>
                <TableColor
                    isOpen={this.state.isOpen}
                    Test={this.Test}
                    id_product={this.state.id_product}
                    name_product={this.state.name_product}
                />
            </>


        )
    }

}

const mapStateToProps = state => {
    return {
        data_full_3_select: state.admin.data_full_3_select,
        all_data_product: state.admin.all_data_product,
        data_product_color: state.admin.data_product_color


    };
};

const mapDispatchToProps = dispatch => {
    return {
        // HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        // HandleLetSaveDataManagerUser: (data) => dispatch(actions.LetSaveDataManagerUser(data)),
        // HandleGetAllDataUser: () => dispatch(actions.GetAllDataUser())
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleGetAllDataProductService: () => dispatch(actions.GetAllDataProductService()),
        HandleSaveDataColorProductService: (data) => dispatch(actions.SaveDataColorProductService(data)),
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id))





    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerColor);
