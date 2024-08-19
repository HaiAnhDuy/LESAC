import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetAllDataUserService } from '../../../../services/userServices'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions'
import './TableCategories.scss'
import ModalCategories from './ModalCategories';
// import style manually

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

// Finish!


class TableCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data_table: '',
            isOpen: false,
            data_save: ''
        }
    }

    async componentDidMount() {
        // this.props.handleAllUser()
        await this.props.HandleGetAllDataCategoriesRedux();
        this.setState({
            data_table: this.props.all_data_categories.data
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.all_data_categories !== this.props.all_data_categories) {
            let all_data_categories = this.props.all_data_categories.data
            this.setState({
                data_table: all_data_categories,

            })
        }
    }

    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }
    handleButtoonDelete = async (id) => {
        // this.props.handleDeleteUser(id)
        await this.props.HandleDeleteDataCategoriesByIdRedux(id);
        await this.props.HandleGetAllDataCategoriesRedux();


    }

    handleButtoonEdit = async (data) => {


        // this.props.HandleEditUserFromParent(user)
        this.props.Test(!this.props.isOpen)
        await this.props.HandleGetDataCategoriesByIdRedux(data.id)
        // console.log(this.props.data_user_by_id)






    }



    render() {
        let { data_table } = this.state
        return (
            <>
                <div className='container-table'>
                    <h3>Bảng quản lý</h3>

                    <table id="customers">
                        <thead>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Trạng thái</th>
                            <th>Tác vụ</th>

                        </thead>
                        <tbody>
                            {data_table && data_table.length > 0 &&
                                data_table.map((items, index) => {
                                    let url = '';
                                    if (items.image) {
                                        url = new Buffer(items.image, 'base64').toString('binary')

                                    }
                                    let active = ''
                                    // let role = ''
                                    if (items && items.ActiveData && items.ActiveData.valueVi) {
                                        active = items.ActiveData.valueVi
                                    }
                                    // if (items && items.RoleData && items.RoleData.valueVi) {
                                    //     role = items.RoleData.valueVi
                                    // }

                                    return (

                                        <>
                                            <tr key={index}>
                                                <td>{items.id}</td>
                                                <td>{items.name_categories}</td>

                                                {
                                                    items.image ?
                                                        <>
                                                            <td>
                                                                <img src={url}></img>
                                                            </td>
                                                        </>
                                                        :
                                                        <>
                                                            <td>
                                                                <img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'></img>
                                                            </td>
                                                        </>
                                                }
                                                <td>
                                                    {active}
                                                </td>
                                                <td>
                                                    <button onClick={() => this.handleButtoonEdit(items)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                    </svg></button>
                                                    <button onClick={() => this.handleButtoonDelete(items.id)} className='btn2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <ModalCategories
                    isOpen={this.props.isOpen}
                    Test={this.props.Test}
                // data_user_by_id={this.props.data_user_by_id}

                />

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        all_data_user: state.admin.all_data_user,
        data_user_by_id: state.admin.data_user_by_id,
        all_data_categories: state.admin.all_data_categories,
        data_categories_by_id: state.admin.data_categories_by_id


    };
};

const mapDispatchToProps = dispatch => {
    return {

        // processLogout: () => dispatch(actions.processLogout()),
        // changlanguagesappredux: (language) => dispatch(changlanguagesapp(language))

        HandleGetAllDataCategoriesRedux: () => dispatch(actions.GetAllDataCategoriesRedux()),
        HandleGetDataCategoriesByIdRedux: (id) => dispatch(actions.GetDataCategoriesByIdRedux(id)),
        HandleDeleteDataCategoriesByIdRedux: (id) => dispatch(actions.DeleteDataCategoriesByIdRedux(id))




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCategories);
