import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../../store/actions'
import { CommonUtils } from '../../../../../utils'

class ModalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_save: '',
            ImageFile: '',
            avatar: '',
            avatar2: '',

            name_product: '',
            data_name: '',
            data_image: '',
            id_product: '',
            is_add: false,

            isOpen: false,

        }
    }

    async componentDidMount() {
        if (this.props.data_save)
            this.setState({
                data_save: this.props.data_save,
                avatar: this.props.data_save.image
            })

    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data_save !== this.props.data_save) {
            this.setState({
                data_save: this.props.data_save,
                avatar: this.props.data_save.image

            })

        }

    }
    toggle = () => {
        this.props.Test(!this.props.isOpen)
        this.setState({
            ImageFile: '',
            is_add: false
        })

        // this.props.dong('')
    }

    start = async () => {
        let { data_save, avatar2 } = this.state
        await this.props.HandleUpdateImageByIdRedux({
            id: data_save.id,
            image: avatar2

        })
        await this.props.HandleGetDataImageProductService(this.props.id_product);
        this.setState({
            data_save: this.props.data_color_image_by_id
        })

        console.log(this.state)


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
            // console.log('>>> check base64 manager', base64)
            let objectURL = URL.createObjectURL(file)

            this.setState({
                ImageFile: objectURL,
                avatar2: base64,
                is_add: true

            })
        }
    }


    render() {
        let { data_save } = this.state

        return (

            <>


                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} size='lg'>
                    <ModalHeader toggle={() => { this.toggle() }}>Sửa thông tin</ModalHeader>
                    <ModalBody>

                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 my-3 title_user_redux'>
                                    <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>

                                </div>

                                <div className='col-6'>
                                    <label>Sản Phẩm</label>
                                    <input value={this.props.name_product.label} disabled></input>


                                </div>

                                <div className='col-6 mt-1'>
                                    <label>HÌNH ẢNH</label>


                                    <div className='img-container'>

                                        <input id='openfile2' type='file' onChange={(event) => { this.HandleFiles(event) }} hidden />




                                        <label className='btn-upload' htmlFor='openfile2'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        {
                                            this.state.is_add === true
                                                ?

                                                <div className='preview-file' style={{ backgroundImage: `url(${this.state.ImageFile})` }}>

                                                </div>
                                                :
                                                <div className='preview-file' style={{ backgroundImage: `url(${new Buffer(this.state.avatar, 'base64').toString('binary')})` }}>

                                                </div>
                                        }



















                                    </div>

                                </div>

                                <div>

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
        data_color_image_by_id: state.admin.data_color_image_by_id


    };
};

const mapDispatchToProps = dispatch => {
    return {
        HandleGetDataImageProductService: (id) => dispatch(actions.GetDataImageProductService(id)),

        HandleUpdateImageByIdRedux: (data) => dispatch(actions.UpdateImageByIdRedux(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);