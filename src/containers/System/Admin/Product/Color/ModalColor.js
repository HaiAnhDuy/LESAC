import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../../store/actions'
import { CommonUtils } from '../../../../../utils'

class ModalColoe extends Component {
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
            colorId: '',
            is_add: false,
            id: '',
            isOpen: false,
            data_color: ''

        }
    }

    async componentDidMount() {
        this.props.HandleGetDataDiscountColorLastRedux();
        this.setState({
            data_color: this.props.data_full_3_select.data_color
        })
        if (this.props.data_save)
            this.setState({
                colorId: this.props.data_save.colorType,
                id: this.props.data_save.id,
            })

    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data_save !== this.props.data_save) {
            this.setState({
                colorId: this.props.data_save.colorType,
                id: this.props.data_save.id,


            })

        }
        if (prevProps.data_full_3_select !== this.props.data_full_3_select) {
            this.setState({
                data_color: this.props.data_full_3_select.data_color,

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
        let { colorId, id } = this.state
        let colorType = colorId.split('#')
        colorType = colorType[1];
        await this.props.HandleUpdateColorByIdRedux({
            colorType: colorType,
            id: id
        });

        await this.props.HandleGetDataImageProductService(this.props.id_product);
        this.setState({
            data_save: this.props.data_color_image_by_id
        })
        this.props.LoadPage();





    }
    oneChangeInput = (event, name) => {
        let copystate = this.state
        copystate[name] = event.target.value;
        this.setState({
            ...copystate
        })
        // console.log(this.state.colorId)
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
    HandleValueOptions = (data) => {
        console.log(data)
    }

    render() {
        let { data_color, colorId, id } = this.state;
        // console.log('data_color', data_color)

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
                                    <label>MÀU</label>

                                    <select onChange={(event) => this.oneChangeInput(event, 'colorId')} value={colorId}>
                                        {data_color && data_color.length > 0
                                            && data_color.map((items, index) => {
                                                return (
                                                    <>
                                                        <option value={items.keyMap} style={{ backgroundColor: items.keyMap }} >
                                                            {items.valueVi}
                                                        </option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
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
        data_color_image_by_id: state.admin.data_color_image_by_id,
        data_full_3_select: state.admin.data_full_3_select


    };
};

const mapDispatchToProps = dispatch => {
    return {
        HandleGetDataImageProductService: (id) => dispatch(actions.GetDataImageProductService(id)),

        HandleUpdateImageByIdRedux: (data) => dispatch(actions.UpdateImageByIdRedux(data)),

        HandleGetDataDiscountColorLastRedux: () => dispatch(actions.GetDataDiscountColorLastRedux()),
        HandleUpdateColorByIdRedux: (data) => dispatch(actions.UpdateColorByIdRedux(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalColoe);