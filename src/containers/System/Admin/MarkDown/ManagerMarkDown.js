import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import './ManagerMarkDown.scss'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagerMarkDown extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ContentMarkdown: '',
            ContentHTML: '',
            name_product: '',
            data_name: '',
        }
    }

    async componentDidMount() {
        await this.props.HandleGetAllDataProductService()

        // await this.props.HandleGetDataArrGenderAndRole();
        // // console.log(this.props.Data_gender_role)
        // let Data_gender_role = this.props.Data_gender_role
        let { all_data_product } = this.props
        let data_name = all_data_product.data;
        let id_data = all_data_product.data;


        this.setState({

            data_name: data_name

        })



    }
    async componentDidUpdate(prevProps, prevState) {

        // if (prevProps.data !== this.props.data) {
        //     this.setState({
        //         data: this.props.data
        //     })
        // }
        if (prevProps.all_data_product !== this.props.all_data_product) {
            let { all_data_product } = this.props;

            let data_name = all_data_product.data;



            this.setState({
                data_name: data_name

            })

        }

    }
    handleChangeNameProduct = async (selectedOption) => {
        // if(selectedOption && selectedOption.length >0 ){
        //     selectedOption.map((items,index)=>{
        //         items.id_product = 
        //     })
        // }
        console.log(selectedOption)
        this.setState({
            name_product: selectedOption
        })
    };
    handleBuiltDataNameProduct = (datainput) => {
        let result = [];
        let data_name = ''
        {
            datainput && datainput.length > 0 &&
                datainput.map((items, index) => {
                    let name = `${items.name_product}`
                    data_name = { value: items.id, label: name }
                    result.push(data_name)
                })

        }
        return result
    }
    OneClickDone = async () => {
        await this.props.HandleSaveDataMarkDownRedux({
            id_product: this.state.name_product.value,
            contentHTML: this.state.ContentHTML,
            contentMarkdown: this.state.ContentMarkdown

        })
        this.setState({
            ContentMarkdown: '',
            ContentHTML: '',
            name_product: '',
        })
        console.log('>>State', this.state)
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            ContentMarkdown: text,
            ContentHTML: html,
        })
        // console.log('handleEditorChange', html, text);

    }
    render() {

        let { data_name } = this.state

        // console.log(data)


        return (

            <>

                <div className='product-manager-container'>
                    <div className='content-title'>
                        <h3>
                            QUẢN LÝ BÀI VIẾT
                        </h3>
                    </div>
                    <div className='container'>
                        <div className='form-grid'>
                            <div className='col-12 my-3 title_user_redux'>
                                <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png"></img>

                            </div>

                            <div className='col-6'>
                                <label>Sản Phẩm</label>
                                <Select
                                    value={this.state.name_product}
                                    onChange={this.handleChangeNameProduct}

                                    options={this.handleBuiltDataNameProduct(data_name)}

                                />


                            </div>
                            <div className='manager-specialty-content-bottom'>

                                <div>
                                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.ContentMarkdown} />
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



            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        all_data_product: state.admin.all_data_product



    };
};

const mapDispatchToProps = dispatch => {
    return {
        // HandleGetDataArrGenderAndRole: () => dispatch(actions.GetDataArrGenderAndRole()),
        HandleGetAllDataProductService: () => dispatch(actions.GetAllDataProductService()),
        HandleSaveDataMarkDownRedux: (data) => dispatch(actions.SaveDataMarkDownRedux(data))



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerMarkDown);