import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../../../utils'
import * as actions from '../../../../../store/actions'
import './ImageManager.scss'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TableImage from './TableImage';
const animatedComponents = makeAnimated();
class ImageManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,

            ImageFile: '',
            avatar: '',
            name_product: '',
            data_name: '',
            data_image: '',
            id_product: '',
            is_add: false,






        }
    }
    async componentDidMount() {
        await this.props.HandleGetAllDataProductService()

        // await this.props.HandleGetDataArrGenderAndRole();
        // // console.log(this.props.Data_gender_role)
        // let Data_gender_role = this.props.Data_gender_role
        let { all_data_product } = this.props
        let data_name = all_data_product.data;
        let id_data = all_data_product.data;

        console.log(data_name)
        this.setState({

            data_name: data_name

        })


    }
    async componentDidUpdate(prevProps, prevState) {



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


    handleBuiltDataNameProduct = (datainput) => {
        let result = [];
        let data_name = ''
        {
            datainput && datainput.length > 0 &&
                datainput.map((items, index) => {
                    let name = `${items.name_product}`
                    data_name = { value: items.id, label: name }
                    result.push(data_name)
                })

        }
        return result
    }


    handleChangeNameProduct = async (selectedOption) => {

        // await this.props.HadnleGetDataImageProductService(selectedOption.value);
        console.log('selectedOption', selectedOption.value);

        this.setState({
            name_product: selectedOption,
            id_product: selectedOption.value,
            // data_image: this.props.data_color_image_by_id.data_image,
        })
    };

    HandleFiles = async (event) => {
        let data = event.target.files
        let Arr = [];
        let Arrimg = [];

        for (let i = 0; i < data.length; i++) {
            let file = data[i]
            if (file) {
                let base64 = await CommonUtils.getBase64(file)
                // console.log('>>> check base64', i, base64)
                let objectURL = URL.createObjectURL(file)
                Arr.push(base64)
                Arrimg.push(objectURL)
                this.setState({
                    ImageFile: Arrimg,
                    avatar: Arr
                })
            }
        }
        console.log(this.state.avatar)
    }
    OneClickDone = async () => {
        console.log(this.state.id_product)

        await this.props.HanldeSaveDataImageProductService({
            ArrImg: this.state.avatar,
            id_product: this.state.id_product
        })
        // await this.props.HandleGetDataImageProductService(this.state.id_product);
        // this.setState({
        //     data_image: this.props.data_color_image_by_id.data_image,
        // })

    }
    render() {

        let { ImageFile, data_name } = this.state

        return (
            <>
                <div className='product-manager-container'>
                    <div className='content-title'>
                        <h3>
                            QUẢN LÝ HÌNH ẢNH
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
                                <label>HÌNH ẢNH</label>


                                <div className='img-container'>

                                    <input id='openfile' type='file' multiple="multiple" onChange={(event) => { this.HandleFiles(event) }} hidden />




                                    <label className='btn-upload' htmlFor='openfile'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    {ImageFile && ImageFile.length > 0

                                        && ImageFile.map((items, index) => {
                                            return (
                                                <>
                                                    <div key={index} className='preview-file' style={{ backgroundImage: `url(${items})` }}>

                                                    </div>
                                                </>
                                            )
                                        })

                                    }



                                </div>

                            </div>






                            <div className='col-3 mt-5'>
                                <button className='form-group btn-manager-user' onClick={() => this.OneClickDone()}>Xác nhận</button>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>

                </div>
                <TableImage
                    isOpen={this.state.isOpen}
                    Test={this.Test}
                    id_product={this.state.id_product}
                    data_image={this.state.data_image}
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
        data_color_image_by_id: state.admin.data_color_image_by_id

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        // HandleLetSaveDataManagerUser: (data) => dispatch(actions.LetSaveDataManagerUser(data)),
        // HandleGetAllDataUser: () => dispatch(actions.GetAllDataUser())
        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleGetAllDataProductService: () => dispatch(actions.GetAllDataProductService()),
        HanldeSaveDataImageProductService: (data) => dispatch(actions.SaveDataImageProductService(data)),
        HandleGetDataImageProductService: (id) => dispatch(actions.GetDataImageProductService(id))






    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager);
