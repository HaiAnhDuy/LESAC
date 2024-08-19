import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../store/actions'

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GenderArr: '',
            PositionArr: [],
            email: '',
            address: '',
            full_name: '',
            phonenumber: '',
            gender: '',
            role: '',
            user_id: ''

        }
    }

    async componentDidMount() {
        let data_save = this.props.data_user_by_id
        this.setState({
            email: data_save.email,
            address: data_save.address,
            full_name: data_save.fullName,
            phonenumber: data_save.phonenumber,
            gender: data_save.gender,
            role: data_save.roleId,
            user_id: data_save.id

        })
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

                })

            }
            catch (e) {
                console.log(e)
            }




        }
        if (prevProps.data_user_by_id !== this.props.data_user_by_id) {
            let data_save = this.props.data_user_by_id
            this.setState({
                email: data_save.email,
                address: data_save.address,
                full_name: data_save.fullName,
                phonenumber: data_save.phonenumber,
                gender: data_save.gender,
                role: data_save.roleId,
                user_id: data_save.id


            })

        }
    }
    toggle = () => {
        this.props.Test(!this.props.isOpen)

        // this.props.dong('')
    }

    start = async () => {
        let data_state = this.state
        await this.props.HandleUpdateDataUserByIdRedux({
            id: data_state.user_id,
            email: data_state.email,
            fullName: data_state.full_name,
            address: data_state.address,
            phonenumber: data_state.phonenumber,
            gender: data_state.gender,
            roleId: data_state.role
        })
        await this.props.HandleGetAllDataUser()


        console.log(this.state)


    }
    HandleChangeEvent = (event, name) => {
        let CopyState = { ...this.state };
        CopyState[name] = event.target.value;
        this.setState({
            ...CopyState
        })
    }




    render() {
        let { GenderArr, RoleArr, gender, role, email, password, full_name, address, phonenumber } = this.state
        return (

            <>


                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} size='lg'>
                    <ModalHeader toggle={() => { this.toggle() }}>Sửa thông tin</ModalHeader>
                    <ModalBody>
                        <div className="form-row mt-3 input_ep" >
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="text" className="form-control email" value={email} placeholder="Email" onChange={(event) => { this.HandleChangeEvent(event, 'email') }} />
                            </div>
                            <div className="form-group col-md-6 div_pass">
                                <label clasfor="inputPassword4">Địa chỉ</label>
                                <input type="text" value={address} className="form-control pass" placeholder="Địa chỉ" onChange={(event) => { this.HandleChangeEvent(event, 'address') }} />
                            </div>
                        </div>
                        <div className='form-row '>
                            <div className="form-group col-md-6">
                                <label for="inputAddress">Họ tên</label>
                                <input type="text" class="form-control" value={full_name} placeholder="Họ và tên" onChange={(event) => { this.HandleChangeEvent(event, 'full_name') }} />
                            </div>

                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Số điện thoại</label>
                                <input type="text" class="form-control" value={phonenumber} placeholder="Điện thoại" onChange={(event) => { this.HandleChangeEvent(event, 'phonenumber') }} />
                            </div>
                        </div>




                        <div className="form-row ">


                            <div className="form-group col-md-6 div_g">
                                <label for="inputState">Giới tính</label>
                                <select name="gender" class="form-control gender" onChange={(event) => { this.HandleChangeEvent(event, 'gender') }} value={gender}>
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

                            <div className="form-group col-md-6 div_r">
                                <label for="inputZip">Chức vụ</label>
                                <select name="roleId" className="form-control role" onChange={(event) => { this.HandleChangeEvent(event, 'role') }} value={role}>
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
        data_user_by_id: state.admin.data_user_by_id


    };
};

const mapDispatchToProps = dispatch => {
    return {
        HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        HandleGetDataUserByIdRedux: (id) => dispatch(actions.GetDataUserByIdRedux(id)),

        HandleUpdateDataUserByIdRedux: (data) => dispatch(actions.UpdateDataUserByIdRedux(data)),
        HandleGetAllDataUser: () => dispatch(actions.GetAllDataUser())


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);