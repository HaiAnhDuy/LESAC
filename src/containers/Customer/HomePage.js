import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'
import * as actions from "../../store/actions";

import HomeHeader from './HomeHeader';
import WhatNew from './WhatNew';
import Slider from "react-slick";
import TheFeels from './TheFeels';
import Categories from './Categories';
import Policy from './Policy';
import LesacOnme from './LesacOnme';
import HomeBottom from './HomeBottom';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {

    HandleGetAllProductId = (data) => {
        console.log('>>>', data)
        this.props.history.push(`/product_by_id/${data}`)
    }
    ClickFromSliderToProductDetail = (id) => {
        this.props.history.push(`/detail-product/${id}/all_product/none`)

    }
    ClickGoToCart = () => {
        this.props.history.push(`/cart`)
    }
    GoToProductHomePage = () => {
        this.props.history.push(`/product`)

    }
    ToHomePage = () => {
        this.props.history.push(`/home`)

    }
    render() {

        return (
            <>
                <div className='homepage-container'>
                    <HomeHeader
                        HandleGetAllProductId={this.HandleGetAllProductId}
                        ClickGoToCart={this.ClickGoToCart}
                        GoToProductHomePage={this.GoToProductHomePage}
                        ToHomePage={this.ToHomePage}
                    />
                    <div className='what-new'>
                        <WhatNew
                            ClickGoToCart={this.ClickGoToCart}
                            ClickFromSliderToProductDetail={this.ClickFromSliderToProductDetail}

                        />
                    </div>

                    <TheFeels />
                    <Categories />
                    <Policy />
                    {/* <LesacOnme /> */}
                    <HomeBottom />
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
