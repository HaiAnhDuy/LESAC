import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import TableUser from './TableUser';

import { GetAllArrayGenderAndRole, GetAllDataUserService } from '../../../services/userServices'
import './UserManager.scss'
class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            GenderArr: '',
            PositionArr: [],
            RoleArr: '',
            ImageFile: '',
            isOpen: false,

            email: '',
            password: '',
            address: '',
            full_name: '',
            phonenumber: '',
            gender: '',
            role: '',
            avatar: '',
            avatar_edit: '',
            DataEdit: {},
            check_test: false,

            // email_edit: DataEdit.email,
            // password_edit: DataEdit.password,
            // firstName_edit: DataEdit.firstName,
            // lastName_edit: DataEdit.lastName,
            // address_edit: DataEdit.address,
            // gender_edit: DataEdit.gender,
            // roleId_edit: DataEdit.roleId,
            // phonenumber_edit: DataEdit.phonenumber,
            // positionId_edit: DataEdit.positionId,



        }
    }
    async componentDidMount() {
        await this.props.HandleGetDataArrGenderAndRole();
        // console.log(this.props.Data_gender_role)
        let Data_gender_role = this.props.Data_gender_role
        this.setState({
            GenderArr: Data_gender_role.data.data_array_gender,
            RoleArr: Data_gender_role.data.data_array_role

        })


    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.Data_gender_role !== this.props.Data_gender_role) {
            try {
                let Data_gender_role = this.props.Data_gender_role
                let GenderArr = Data_gender_role.data.data_array_gender

                let RoleArr = Data_gender_role.data
                RoleArr = RoleArr.data_array_role

                this.setState({
                    GenderArr: GenderArr,
                    RoleArr: RoleArr,
                    gender: GenderArr && GenderArr.length > 0 ? GenderArr[0].keyMap : '',
                    role: RoleArr && RoleArr.length > 0 ? RoleArr[0].keyMap : ''
                })

            }
            catch (e) {
                console.log(e)
            }




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
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('>>> check base64', base64)
            let objectURL = URL.createObjectURL(file)

            this.setState({
                ImageFile: objectURL,
                avatar: base64
            })
        }
    }
    OneClickDone = async () => {
        await this.props.HandleLetSaveDataManagerUser({
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.full_name,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.role,
            phonenumber: this.state.phonenumber,
            image: this.state.avatar
        })

        this.setState({
            email: '',
            password: '',
            full_name: '',
            address: '',
            gender: '',
            role: '',
            phonenumber: '',
            ImageFile: ''
        })
        console.log(this.state)

        setTimeout(() => {
            this.props.HandleGetAllDataUser()
        }, 800)
    }
    render() {
        let { GenderArr, RoleArr, gender, role, email, password, full_name, address, phonenumber } = this.state
        return (
            <>
                <div className='user-manager-container'>
                    <div className='content-title'>
                        <h3>
                            QUẢN LÝ NGƯỜI DÙNG
                        </h3>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3 title_user_redux'>
                                <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>

                            </div>

                            <div className='col-6'>
                                <label>Email</label>
                                <input className='form-control' value={email} type='text' onChange={(event) => this.oneChangeInput(event, 'email')}></input>



                            </div>
                            <div className='col-6 '>
                                <label>Mật khẩu</label>
                                <input className='form-control' value={password} type='text' onChange={(event) => this.oneChangeInput(event, 'password')}></input>

                            </div>

                            <div className='col-6 '>
                                <label>Họ và tên</label>

                                <input className='form-control' value={full_name} type='text' onChange={(event) => this.oneChangeInput(event, 'full_name')}></input>

                            </div>
                            <div className='col-6 '>
                                <label>Địa chỉ</label>

                                <input className='form-control' value={address} type='text' onChange={(event) => this.oneChangeInput(event, 'address')}></input>

                            </div>
                            <div className='col-6 '>
                                <label>Số điện thoại</label>

                                <input className='form-control' value={phonenumber} type='text' onChange={(event) => this.oneChangeInput(event, 'phonenumber')}></input>

                            </div>


                            <div className='col-3'>
                                <label>Giới tính</label>

                                <select className="form-control gender" onChange={(event) => this.oneChangeInput(event, 'gender')} value={gender} >
                                    {GenderArr && GenderArr.length > 0 &&
                                        GenderArr.map((items, index) => {

                                            return (
                                                <>

                                                    <option key={index} value={items.keyMap} selected>{items.valueVi}</option>




                                                </>
                                            )
                                        })

                                    }
                                </select>




                            </div>

                            <div className='col-3'>
                                <label>Chức quyền</label>

                                <select className="form-control role" onChange={(event) => this.oneChangeInput(event, 'role')} value={role}>
                                    {RoleArr && RoleArr.length > 0 &&
                                        RoleArr.map((items, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={items.keyMap} selected>{items.valueVi}</option>
                                                </>
                                            )
                                        })

                                    }

                                </select>



                            </div>
                            <div className='col-12 mt-3'>
                                <label>Chọn ảnh đại diện</label>
                                <div className='img-container'>

                                    <input id='openfile' type='file' onChange={(event) => { this.HandleFiles(event) }} hidden />




                                    <label className='btn-upload' htmlFor='openfile'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-file' style={{ backgroundImage: `url(${this.state.ImageFile})` }}>

                                    </div>
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
                <TableUser
                    isOpen={this.state.isOpen}
                    Test={this.Test}
                />
            </>


        )
    }

}

const mapStateToProps = state => {
    return {
        Data_gender_role: state.admin.data_array,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        HandleLetSaveDataManagerUser: (data) => dispatch(actions.LetSaveDataManagerUser(data)),
        HandleGetAllDataUser: () => dispatch(actions.GetAllDataUser())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);
