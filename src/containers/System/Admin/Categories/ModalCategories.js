import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions'
import './ModalCategories.scss'
import { CommonUtils } from '../../../../utils'


class ModalCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Active_Data: [],
            name_categories: '',
            image: '',
            activeId: '',
            active: '',
            categories_id: '',
            img_edit: false,
            ImageFile: '',
            avatar: ''

        }
    }

    async componentDidMount() {
        let data_save = this.props.data_categories_by_id

        if (data_save && data_save.data) {
            console.log('check modal', data_save.data)
            this.setState({
                name_categories: data_save.data.name_categories,
                image: data_save.data.image,
                activeId: data_save.data.activeId,
                categories_id: data_save.data.id

            })
        }

        await this.props.HandleGetDataArrayActive();
        // console.log(this.props.Data_gender_role)
        let data_active = this.props.data_active.data_active
        this.setState({
            Active_Data: data_active,

        })

    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data_active !== this.props.data_active) {
            try {
                let data_active = this.props.data_active;
                data_active = data_active.data_active;
                this.setState({
                    Active_Data: data_active,
                    // active: data_active.length > 0 ? data_active[0].keyMap : ''
                })
            }
            catch (e) {
                console.log(e)
            }




        }
        if (prevProps.data_categories_by_id !== this.props.data_categories_by_id) {
            let data_save = this.props.data_categories_by_id.data

            this.setState({
                name_categories: data_save.name_categories,
                image: data_save.image,
                activeId: data_save.activeId,
                categories_id: data_save.id

            })



        }
    }
    toggle = () => {
        this.props.Test(!this.props.isOpen)

        // this.props.dong('')
    }

    start = async () => {
        let { name_categories, activeId, avatar, categories_id, image } = this.state
        if (avatar) {
            await this.props.HandleUpdateDataCategoriesByIdRedux({
                id: categories_id,
                name_categories: name_categories,
                image: avatar,
                activeId: activeId

            })
        }
        if (avatar === '') {
            await this.props.HandleUpdateDataCategoriesByIdRedux({
                id: categories_id,
                name_categories: name_categories,
                activeId: activeId

            })
        }




        console.log(this.state)
        await this.props.HandleGetAllDataCategoriesRedux()

    }
    HandleChangeEvent = (event, name) => {
        let CopyState = { ...this.state };
        CopyState[name] = event.target.value;
        this.setState({
            ...CopyState
        })
    }
    HandleFilesEdit = async (event) => {

        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectURL = URL.createObjectURL(file)

            this.setState({
                ImageFile: objectURL,
                avatar: base64,
                img_edit: true
            })
            console.log(this.state)
        }
    }



    render() {
        let { name_categories, image, activeId, active, Active_Data, img_edit, ImageFile, avatar } = this.state
        return (

            <>


                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} size='lg'>
                    <ModalHeader toggle={() => { this.toggle() }}>Sửa thông tin</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>


                                <div className='col-6'>
                                    <label>Tên danh mục</label>
                                    <input className='form-control' value={name_categories} type='text' onChange={(event) => this.HandleChangeEvent(event, 'name_categories')}></input>
                                </div>
                                <div className='col-6'>
                                    <label>Chọn ảnh đại diện</label>
                                    <div className='img-container'>
                                        <input id='openfile2' type='file' onChange={(event) => { this.HandleFilesEdit(event) }} hidden />
                                        <label className='btn-upload' htmlFor='openfile2'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        {img_edit === false ?
                                            <div className='preview-file' style={{ backgroundImage: `url(${new Buffer(image, 'base64').toString('binary')})` }}>

                                            </div>
                                            :
                                            <div className='preview-file' style={{ backgroundImage: `url(${ImageFile})` }}>

                                            </div>
                                        }


                                    </div>
                                </div>
                                <div className='col-4'>
                                    <label>Trạng thái</label>
                                    <select className="form-control gender" onChange={(event) => this.HandleChangeEvent(event, 'activeId')} value={activeId}>
                                        {Active_Data && Active_Data.length > 0 &&
                                            Active_Data.map((items, index) => {

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



                            <div>

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
        Data_gender_role: state.admin.data_array,
        data_user_by_id: state.admin.data_user_by_id,
        data_categories_by_id: state.admin.data_categories_by_id,
        data_active: state.admin.data_active




    };
};

const mapDispatchToProps = dispatch => {
    return {
        HandleGetDataArrayActive: () => dispatch(actions.GetDataArrayActive()),
        HandleGetDataUserByIdRedux: (id) => dispatch(actions.GetDataUserByIdRedux(id)),
        HandleUpdateDataUserByIdRedux: (data) => dispatch(actions.UpdateDataUserByIdRedux(data)),
        HandleGetAllDataUser: () => dispatch(actions.GetAllDataUser()),
        HandleGetDataCategoriesByIdRedux: (id) => dispatch(actions.GetDataCategoriesByIdRedux(id)),
        HandleUpdateDataCategoriesByIdRedux: (data) => dispatch(actions.UpdateDataCategoriesByIdRedux(data)),
        HandleGetAllDataCategoriesRedux: () => dispatch(actions.GetAllDataCategoriesRedux()),




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCategories);