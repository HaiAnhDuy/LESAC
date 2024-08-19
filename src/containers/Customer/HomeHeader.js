import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import * as actions from "../../store/actions";
import Select from 'react-select';
import Navigator from '../../components/Navigator';
import { customerMenu } from './BarHeader';
class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: '',
            check_search: false,
            name_product: '',
            length: '',
            data_user_id: ''




        }
    }
    PageCart = () => {
        this.props.ClickGoToCart()
    }

    async componentDidMount() {
        await this.props.HandleShowAllDataCartByUserIdRedux(this.props.userInfo.id)
        await this.props.HandleGetDataUserByIdRedux(this.props.userInfo.id)
        await this.props.HandleGetAllDataCategoriesProductByIdRedux('ALL');
        let { data_product_by_categories, all_data_cart_by_user_id, data_user_by_id } = this.props;
        this.setState({
            data: data_product_by_categories.data_product_by_categories,
            length: all_data_cart_by_user_id.length,
            data_user_id: data_user_by_id
        })
        if (this.props.reload) {
            await this.props.HandleShowAllDataCartByUserIdRedux(this.props.userInfo.id)
            this.setState({
                length: all_data_cart_by_user_id.length
            })
        }

    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.data_product_by_categories !== this.props.data_product_by_categories) {
            this.setState({
                data: this.props.data_product_by_categories.data_product_by_categories
            })
        }
        if (prevProps.all_data_cart_by_user_id !== this.props.all_data_cart_by_user_id) {
            let { all_data_cart_by_user_id } = this.props;

            this.setState({
                length: all_data_cart_by_user_id.length
            })
        }
        if (prevProps.reload !== this.props.reload) {
            await this.props.HandleShowAllDataCartByUserIdRedux(this.props.userInfo.id);
            let { all_data_cart_by_user_id } = this.props;

            this.setState({
                length: all_data_cart_by_user_id.length
            })
        }
        if (prevProps.data_user_by_id !== this.props.data_user_by_id) {
            let { data_user_by_id } = this.props;

            this.setState({
                data_user_id: data_user_by_id
            })
        }

    }
    OpenSearch = () => {
        this.setState({
            check_search: true
        })
    }
    handleBuiltDataProduct = (datainput) => {
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
    handleChangeNameProduct = (selectedOption) => {
        // if(selectedOption && selectedOption.length >0 ){
        //     selectedOption.map((items,index)=>{
        //         items.id_product = 
        //     })
        // }
        this.props.HandleGetAllProductId(selectedOption.value)



    };
    GoToProduct = () => {
        this.props.GoToProductHomePage()

    }
    GoToHomePage = () => {
        this.props.ToHomePage()
    }
    render() {
        const { processLogout } = this.props;
        let { check_search, data, length, data_user_id } = this.state
        let image = ''
        if (data_user_id.image) {
            image = data_user_id.image
        }

        // console.log('data', data)
        return (
            <>

                <div className='homeheader-container'>
                    <div className='content-top'>
                        <div className='content-top-add'>

                        </div>
                        <div className='content-top-left'>
                            <div className='title-go'>
                                <marquee scrolldelay='0' scrollamount='4' >Enjoy every moment with LESAC</marquee>
                                <marquee scrolldelay='0' scrollamount='4'>Enjoy every moment with LESAC</marquee>
                                <marquee scrolldelay='0' scrollamount='4'>Enjoy every moment with LESAC</marquee>
                            </div>

                        </div>
                        <div className='content-top-right'>
                            <div className='content-phonumber'>
                                <a href='tel:0855 255 895'>
                                    <span ><i class="fas fa-phone"></i>&nbsp;&nbsp;0855 255 895</span>

                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='content-down-left'>

                        </div>
                        <div className='content-down-center'>
                            <div className='ct-center-1'>
                                <div className='ct1-child w3-dropdown-hover'>
                                    <i class="fas fa-bars"></i>
                                    <div class="w3-dropdown-content w3-bar-block w3-card-4">
                                        <a onClick={() => this.GoToProduct()} class="w3-bar-item w3-button">Product</a>

                                    </div>
                                </div>
                            </div>
                            <div className='ct-center-2'>
                                <div className='ct2-child' onClick={() => this.GoToHomePage()} style={{ cursor: 'pointer' }}>
                                    <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png" alt="logo" />
                                </div>
                            </div>
                            <div className='ct-center-3'>
                                <div className='ct3-child'>

                                    <div className='search' onClick={() => this.OpenSearch()}>
                                        {
                                            check_search === false
                                                ?
                                                <i class="fas fa-search"></i>
                                                :
                                                <div className='form-group flex_ind'>
                                                    <Select
                                                        className='select-size'
                                                        placeholder='Nhập tên sản phẩm'
                                                        options={this.handleBuiltDataProduct(data)}
                                                        onChange={this.handleChangeNameProduct}
                                                        value={this.state.name_product}


                                                    />

                                                </div>

                                        }
                                    </div>
                                    <div className='user-img' style={{ backgroundImage: `url(${new Buffer(image, 'base64').toString('binary')})` }}>
                                    </div>
                                    <div className='thin-boder'>
                                    </div>
                                    <div className='bag-yellow' onClick={() => this.PageCart()}>
                                        <svg class="d-sm-inline-block d-none" width="20" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.1187 3.87025C5.12605 2.83895 5.57975 1.85241 6.38033 1.12691C7.1809 0.401415 8.26301 -0.00382911 9.38941 2.72735e-05C11.6985 0.012014 13.575 1.70414 13.6154 3.87025C14.1358 3.87025 14.6606 3.84078 15.1793 3.87924C15.6157 3.9122 16.068 3.96964 16.4744 4.11048C17.855 4.58895 18.7355 5.79312 18.7365 7.14463C18.7398 11.034 18.7398 14.9234 18.7365 18.8127C18.7365 20.6012 17.1393 22.0676 15.1908 22.0701C11.3058 22.0754 7.4207 22.0754 3.53566 22.0701C1.61386 22.0666 0.00845524 20.6042 0.00518225 18.8487C-0.00172742 14.926 -0.00172742 11.0034 0.00518225 7.0807C0.00845524 5.34012 1.61986 3.87974 3.51984 3.87075C4.0517 3.86825 4.58574 3.87025 5.1187 3.87025ZM7.1185 5.67725V5.95694C7.1185 6.57176 7.12613 7.18708 7.11304 7.8019C7.11303 7.97528 7.07597 8.14699 7.00394 8.30734C6.82229 8.68293 6.34934 8.88021 5.91294 8.7923C5.46127 8.70041 5.14379 8.3428 5.1367 7.88481C5.12633 7.23553 5.13342 6.58624 5.13342 5.94046V5.66376H3.76149C2.63886 5.66376 1.96134 6.28258 1.96134 7.30345C1.96134 11.0929 1.96134 14.8822 1.96134 18.6714C1.96134 19.6428 2.65304 20.2766 3.71731 20.2771C7.48344 20.2771 11.2499 20.2771 15.0168 20.2771C16.0941 20.2771 16.7793 19.6438 16.7793 18.6514C16.7793 16.6736 16.7793 14.6959 16.7793 12.7185C16.7793 10.8818 16.7793 9.04536 16.7793 7.20906C16.7793 6.41943 16.242 5.79712 15.3894 5.69973C14.8117 5.6343 14.2182 5.68724 13.6056 5.68724V5.95944C13.6056 6.57426 13.6132 7.18908 13.6001 7.8039C13.599 7.97748 13.5609 8.14918 13.4878 8.30934C13.305 8.68442 12.8299 8.88121 12.3968 8.79181C11.9451 8.69841 11.6331 8.3423 11.6232 7.88231C11.6123 7.23303 11.6205 6.58624 11.6189 5.93796C11.6189 5.85106 11.6112 5.76365 11.6069 5.67725H7.1185ZM11.6189 3.85876C11.5752 3.07463 11.2065 2.48628 10.4853 2.11069C9.69216 1.69565 8.88482 1.72312 8.12385 2.18261C7.48071 2.57118 7.14195 3.13156 7.12559 3.86026L11.6189 3.85876Z" fill="#D99E08"></path>
                                        </svg>
                                        <h4>
                                            Giỏ hàng ({length})
                                        </h4>
                                        <div className='giohang_resposive'>
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                    </div>
                                    <div className="btn-logout" onClick={processLogout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-down-right'>

                        </div>
                    </div>

                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,

        isLoggedIn: state.user.isLoggedIn,
        data_product_by_categories: state.admin.data_product_by_categories,
        all_data_cart_by_user_id: state.admin.all_data_cart_by_user_id,
        data_user_by_id: state.admin.data_user_by_id

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataCategoriesProductByIdRedux: (id) => dispatch(actions.GetAllDataCategoriesProductByIdRedux(id)),
        HandleShowAllDataCartByUserIdRedux: (id) => dispatch(actions.ShowAllDataCartByUserIdRedux(id)),
        HandleGetDataUserByIdRedux: (id) => dispatch(actions.GetDataUserByIdRedux(id))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
