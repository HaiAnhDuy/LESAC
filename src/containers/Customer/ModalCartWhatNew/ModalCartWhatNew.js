import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../store/actions'
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import AddToCartWhatNew from '../AddToCartWhatNew/AddToCartWhatNew';
import NumberFormat from 'react-number-format';

import './ModalCartWhatNew.scss'

class ModalCartWhatNew extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: '',
            url: '',
            url_2: '',
            check: -1,
            url_to_modal: '',
            check_image: ''
        }
    }

    async componentDidMount() {
        if (this.props.data) {
            this.setState({
                data: this.props.data
            })
            let { data } = this.props
            let data_image = data.image
            let image_test = '';
            let url_2 = ''
            if (data_image && data_image.length > 0) {
                image_test = data_image[0].image
                url_2 = new Buffer(image_test, 'base64').toString('binary')
                this.setState({
                    url_2: url_2
                })
            }
        }
        if (this.props.url_to_modal) {
            this.setState({
                url_to_modal: this.props.url_to_modal
            })
        }
        if (this.props.check_image) {
            this.setState({
                check_image: this.props.check_image
            })
        }


    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            let { data } = this.props

            this.setState({
                data: data,
            })
            let data_image = data.image
            let image_test = '';
            let url_2 = ''
            if (data_image && data_image.length > 0) {
                image_test = data_image[0].image
                url_2 = new Buffer(image_test, 'base64').toString('binary')
                this.setState({
                    url_2: url_2
                })
            }
        }
        if (prevProps.url_to_modal !== this.props.url_to_modal) {
            this.setState({
                url_to_modal: this.props.url_to_modal
            })
        }
        if (prevProps.check_image !== this.props.check_image) {
            this.setState({
                check_image: this.props.check_image
            })
        }
    }
    toggle = () => {
        this.props.Test(!this.props.isOpen)
        // this.props.Test_2('')
        this.setState({
            check_image: -1,
            check: -1
            // url_to_modal: ''
        })

        // this.props.dong('')
    }

    start = async () => {
        console.log(this.state)


    }
    HandleChangeEvent = (event, name) => {
        let CopyState = { ...this.state };
        CopyState[name] = event.target.value;
        this.setState({
            ...CopyState
        })
    }
    Onclickimage = (url, index) => {
        this.setState({
            url: url,
            check: index
        })
    }
    HandleToCart = () => {
        this.props.HandleToCartWhatNew()
    }

    render() {
        let { data, url, check, url_2, url_to_modal, check_image } = this.state

        let data_image = data.image


        // console.log(data_image)


        return (

            <>

                <div className='conatiner-best'>
                    <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} style={{ maxWidth: '1100px', width: '100%', }} >
                        <ModalBody>
                            <div className='show-modal-container'>
                                <div className='content-left'>
                                    <div className='p-5' style={{ gap: '5px' }}>
                                        <div className='flex gap-4 items-center div-flex'>
                                            <div className='flex flex-col gap-4 div-gap'>
                                                {
                                                    data_image && data_image.length > 0 &&
                                                    data_image.map((items, index) => {
                                                        let url = '';

                                                        url = new Buffer(items.image, 'base64').toString('binary')
                                                        return (
                                                            <>
                                                                {
                                                                    check === index ?
                                                                        <div key={index} className='img-div  add-border' style={{ backgroundImage: `url(${url})` }} onClick={() => this.Onclickimage(url, index)} >

                                                                        </div>
                                                                        :
                                                                        <div key={index} className='img-div' style={{ backgroundImage: `url(${url})` }} onClick={() => this.Onclickimage(url, index)} >

                                                                        </div>
                                                                }


                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div>
                                                {
                                                    check_image === -1 ?
                                                        <>
                                                            {

                                                                check === -1 ?
                                                                    <div className='big-div-img' style={{ backgroundImage: `url(${url_2})` }}>

                                                                    </div>
                                                                    :
                                                                    <div className='big-div-img ' style={{ backgroundImage: `url(${url})` }}>

                                                                    </div>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {

                                                                check === -1 ?
                                                                    <div className='big-div-img' style={{ backgroundImage: `url(${new Buffer(url_to_modal, 'base64').toString('binary')})` }}>

                                                                    </div>
                                                                    :
                                                                    <div className='big-div-img ' style={{ backgroundImage: `url(${url})` }}>

                                                                    </div>
                                                            }
                                                        </>
                                                }


                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className='content-right'>
                                    <AddToCartWhatNew
                                        data={this.state.data}
                                        HandleToCart={this.HandleToCart}

                                    />
                                </div>

                            </div>

                            {/* <Button color="primary px-3" onClick={() => { this.start() }}>
                            Xác nhận
                        </Button> */}
                        </ModalBody>
                    </Modal>
                </div>



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
        // HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCartWhatNew);