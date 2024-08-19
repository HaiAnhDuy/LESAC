import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CategoriesManager.scss'
import * as actions from "../../../../store/actions";
import { CommonUtils } from '../../../../utils'
import TableCategories from './TableCategories';

class CategoriesManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            ArrActive: '',
            active: '',
            name_categories: '',
            ImageFile1: '',
            avatar: '',




        }
    }
    async componentDidMount() {
        await this.props.HandleGetDataArrayActive();
        let data_active = this.props.data_active.data_active
        this.setState({
            ArrActive: data_active
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data_active !== this.props.data_active) {
            let data_active = this.props.data_active;
            data_active = data_active.data_active;
            this.setState({
                ArrActive: data_active,
                active: data_active.length > 0 ? data_active[0].keyMap : ''
            })
        }

    }
    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }
    oneChangeInput = (event, name) => {
        let copy = { ...this.state };
        copy[name] = event.target.value;
        this.setState({
            ...copy
        })
    }
    HandleFiles = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('>>> check base64 manager', base64)
            let objectURL = URL.createObjectURL(file)

            this.setState({
                ImageFile1: objectURL,
                avatar: base64
            })
        }
    }
    OneClickDone = async () => {
        await this.props.HandleSaveDataCategoriesService({
            name_categories: this.state.name_categories,
            image: this.state.avatar,
            activeId: this.state.active
        })
        await this.props.HandleGetAllDataCategoriesRedux()
        this.setState({
            name_categories: '',
            image: '',
            active: '',
            ImageFile: ''


        })
        console.log(this.state)
    }
    render() {
        let { ArrActive, active, name_categories, ImageFile } = this.state
        return (
            <>

                <div className='categories-manager-container'>
                    <div className='content-title'>
                        <h3>
                            QUẢN LÝ DANH MỤC SẢN PHẨM
                        </h3>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3 title_categories_redux'>
                                <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>

                            </div>

                            <div className='col-6'>
                                <label>Tên danh mục</label>
                                <input className='form-control' type='text' value={name_categories} onChange={(event) => this.oneChangeInput(event, 'name_categories')}></input>
                            </div>
                            <div className='col-6'>
                                <label>Chọn ảnh đại diện</label>
                                <div className='img-container'>
                                    <input id='openfile' type='file' onChange={(event) => { this.HandleFiles(event) }} hidden />
                                    <label className='btn-upload' htmlFor='openfile'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-file' style={{ backgroundImage: `url(${this.state.ImageFile1})` }}>

                                    </div>
                                </div>
                            </div>
                            <div className='col-4'>
                                <label>Trạng thái</label>
                                <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'active')} value={active} >
                                    {ArrActive && ArrActive.length > 0 &&
                                        ArrActive.map((items, index) => {

                                            return (
                                                <>
                                                    <option key={index} value={items.keyMap} selected>{items.valueVi}</option>
                                                </>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                        </div>

                        <div className='col-3 mt-5'>
                            <button className='form-group btn-manager-categories' onClick={() => this.OneClickDone()}>Xác nhận</button>
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
                <TableCategories
                    isOpen={this.state.isOpen}
                    Test={this.Test}
                />

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        data_active: state.admin.data_active
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetDataArrayActive: () => dispatch(actions.GetDataArrayActive()),
        HandleSaveDataCategoriesService: (data) => dispatch(actions.SaveDataCategoriesService(data)),
        HandleGetAllDataCategoriesRedux: () => dispatch(actions.GetAllDataCategoriesRedux()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesManager);
