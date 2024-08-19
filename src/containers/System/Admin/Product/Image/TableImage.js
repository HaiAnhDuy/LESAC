import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetAllDataUserService } from '../../../../../services/userServices'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../../store/actions';
import './TableImage.scss'
import ModalImage from './ModalImage';
// import style manually

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

// Finish!


class TableImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data_table: '',
            data_table_color: '',

            isOpen: false,
            data_save: '',
            name_product: ''
        }
    }

    async componentDidMount() {
        // this.props.handleAllUser()
        let data_image = this.props.data_image
        if (this.props.id_product) {
            await this.props.HandleGetDataImageProductService(this.props.id_product)
            this.setState({
                data_table: this.props.data_color_image_by_id.data_image,
                data_table_color: this.props.data_color_image_by_id.data_color

            })
        }
        if (data_image && data_image.length > 0) {
            this.setState({
                data_table: data_image
            })
        }
        if (this.props.name_product) {
            this.setState({
                name_product: this.props.name_product
            })
        }

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.id_product !== this.props.id_product) {
            await this.props.HandleGetDataImageProductService(this.props.id_product)
            let data_color_image_by_id = this.props.data_color_image_by_id
            this.setState({
                data_table: data_color_image_by_id.data_image,
                data_table_color: this.props.data_color_image_by_id.data_color


            })
        }
        if (prevProps.data_color_image_by_id !== this.props.data_color_image_by_id) {
            let data_color_image_by_id = this.props.data_color_image_by_id
            this.setState({
                data_table: data_color_image_by_id.data_image,
                data_table_color: this.props.data_color_image_by_id.data_color


            })
        }
        if (prevProps.data_image !== this.props.data_image) {
            this.setState({
                data_table: this.props.data_image,

            })
        }
        if (prevProps.name_product !== this.props.name_product) {
            this.setState({
                name_product: this.props.name_product,

            })
        }

    }

    Test = (data) => {
        this.setState({
            isOpen: data
        })
    }
    handleButtoonDelete = async (id) => {
        console.log('delete image', id);
        await this.props.HandleDeleteImageByIdRedux(id);
        await this.props.HandleGetDataImageProductService(this.props.id_product)
        let data_color_image_by_id = this.props.data_color_image_by_id
        this.setState({
            data_table: data_color_image_by_id.data_image,
            data_table_color: this.props.data_color_image_by_id.data_color


        })
        // await this.props.HandleGetAllDataProductColorByIdRedux('ALL');
    }

    handleButtoonEdit = async (data) => {


        // this.props.HandleEditUserFromParent(user)
        this.props.Test(!this.props.isOpen);

        this.setState({
            data_save: data
        })
        // await this.props.HandleGetDataUserByIdRedux(data.id)
        console.log(data)
    }



    render() {
        let { data_table, name_product, data_table_color
        } = this.state
        let check = data_table[0];
        // console.log('data', check['ActiveData']['valueVi'])
        console.log('data_table', data_table)
        return (
            <>
                <div className='container-table'>
                    <h3>Bảng quản lý</h3>

                    <table id="customers">
                        <thead>
                            <th>Id</th>
                            <th>Hình Ảnh</th>
                            <th>Màu sắc</th>
                            <th>
                                Thao tác
                            </th>

                        </thead>
                        <tbody>
                            {data_table && data_table.length > 0 ?
                                data_table.map((items, index) => {


                                    return (

                                        <>
                                            <tr key={index}>
                                                <td>{items.id}</td>
                                                <td><img src={new Buffer(items.image, 'base64').toString('binary')}>

                                                </img></td>
                                                <td>
                                                    {data_table_color && data_table_color.length > 0
                                                        ?
                                                        <div>
                                                            {
                                                                data_table_color.length === data_table.length
                                                                    ?
                                                                    <div className='color_table' style={{ backgroundColor: data_table_color[index].colorType }}>

                                                                    </div>
                                                                    :
                                                                    <span style={{ color: 'red' }}>Số màu và số ảnh phải bằng nhau ({data_table_color.length} ,{data_table.length})</span>

                                                            }
                                                        </div>

                                                        :
                                                        <span style={{ color: 'red' }}>Vậy là phải thêm màu sắc rồi</span>
                                                    }
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
                                :
                                <>

                                    {
                                        data_table_color && data_table_color.length > 0 && data_table_color.length !== data_table.length
                                        &&
                                        data_table_color.map((items, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <span style={{ color: 'red' }}>Chưa tồn tại</span>
                                                        </td>

                                                        <td>
                                                            <span style={{ color: 'red' }}>Vui lòng thêm hình ảnh phù hợp với hình ảnh cho sản phẩm</span>
                                                        </td>
                                                        <td>
                                                            <div className='color_table' style={{ backgroundColor: items.colorType }}>

                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span style={{ color: 'red' }}>Không đủ điều kiện trên</span>
                                                        </td>
                                                    </tr>


                                                </>
                                            )
                                        })


                                    }

                                </>
                            }
                        </tbody>
                    </table>
                </div>
                <ModalImage
                    isOpen={this.props.isOpen}
                    id_product={this.props.id_product}
                    Test={this.props.Test}
                    name_product={name_product}
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
        data_product_color: state.admin.data_product_color,
        data_color_image_by_id: state.admin.data_color_image_by_id


    };
};

const mapDispatchToProps = dispatch => {
    return {

        // processLogout: () => dispatch(actions.processLogout()),
        // changlanguagesappredux: (language) => dispatch(changlanguagesapp(language))
        HandleDeleteImageByIdRedux: (id) => dispatch(actions.DeleteImageByIdRedux(id)),
        HandleGetAllDataProductColorByIdRedux: (id) => dispatch(actions.GetAllDataProductColorByIdRedux(id)),
        HandleDeleteProductByIdRedux: (id) => dispatch(actions.DeleteProductByIdRedux(id)),
        HandleGetDataImageProductService: (id) => dispatch(actions.GetDataImageProductService(id))






    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableImage);
