import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetAllDataUserService } from '../../../../services/userServices'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import ModalProduct from './ModalProduct';
import './TableProduct.scss'
// import style manually

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

// Finish!


class TableProduct extends Component {

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
        await this.props.HandleGetAllDataProductColorByIdRedux('ALL');
        this.setState({
            data_table: this.props.data_product_color
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data_product_color !== this.props.data_product_color) {
            let data_product_color = this.props.data_product_color
            this.setState({
                data_table: data_product_color,

            })
        }
    }

    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }
    handleButtoonDelete = async (id) => {
        await this.props.HandleDeleteProductByIdRedux(id)
        await this.props.HandleGetAllDataProductColorByIdRedux('ALL');



    }

    handleButtoonEdit = async (data) => {


        // this.props.HandleEditUserFromParent(user)
        this.props.Test(!this.props.isOpen);
        this.setState({
            data_save: data
        })
        // await this.props.HandleGetDataUserByIdRedux(data.id)
        // console.log(this.props.data_user_by_id)
    }



    render() {
        let { data_table } = this.state
        let check = data_table[0];
        // console.log('data', check['ActiveData']['valueVi'])
        // console.log('data_table', data_table)
        return (
            <>
                <div className='container-table'>
                    <h3>Bảng quản lý</h3>

                    <table id="customers">
                        <thead>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Hình Thức</th>
                            <th>Giảm Giá</th>
                            <th>Danh mục</th>
                            <th>Ảnh</th>
                            <th>Màu</th>
                            <th>
                                Thao tác
                            </th>

                        </thead>
                        <tbody>
                            {data_table && data_table.length > 0 &&
                                data_table.map((items, index) => {


                                    return (

                                        <>
                                            <tr key={index}>
                                                <td>{items.id}</td>
                                                <td>{items.name_product}</td>
                                                <td>{items.ActiveData.valueVi}</td>
                                                <td>{items.LastData.valueVi}</td>
                                                <td>{items.discount}%</td>

                                                <td>{items.CategoriesData.name_categories}</td>
                                                <td>
                                                    {
                                                        items.image && items.image.length > 0 ?
                                                            items.image.map((items_2, index_2) => {
                                                                return (
                                                                    <>
                                                                        <img src={new Buffer(items_2.image, 'base64').toString('binary')}>

                                                                        </img>
                                                                    </>
                                                                )
                                                            })
                                                            :
                                                            <div>
                                                                Bạn chưa cấu hình <span style={{ color: 'green' }}>hình ảnh</span> cho sản phẩm <span style={{ color: 'red' }}>{items.name_product}</span> 😕

                                                            </div>

                                                    }
                                                </td>


                                                <td>
                                                    <div className='color_container'>
                                                        {
                                                            items.color && items.image.length > 0 ?
                                                                items.color.map((items_3, index_3) => {
                                                                    return (
                                                                        <>
                                                                            <div className='color_table' style={{ backgroundColor: items_3.colorType }}>

                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                                :
                                                                <div>
                                                                    Bạn chưa cấu hình <span style={{ color: 'green' }}>màu sắc</span> cho sản phẩm <span style={{ color: 'red' }}>{items.name_product}</span> 😕

                                                                </div>

                                                        }
                                                    </div>
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
                <ModalProduct
                    isOpen={this.props.isOpen}
                    Test={this.props.Test}
                    data_save={this.state.data_save}
                // data_user_by_id={this.props.data_user_by_id}

                />

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        data_product_color: state.admin.data_product_color

    };
};

const mapDispatchToProps = dispatch => {
    return {

        // processLogout: () => dispatch(actions.processLogout()),
        // changlanguagesappredux: (language) => dispatch(changlanguagesapp(language))
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id)),
        HandleDeleteProductByIdRedux: (id) => dispatch(actions.DeleteProductByIdRedux(id))





    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableProduct);
