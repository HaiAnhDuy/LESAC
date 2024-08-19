import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Categories.scss'
import * as actions from "../../store/actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {

            all_data_categories: ''


        }
    }

    async componentDidMount() {
        await this.props.HandleGetAllDataCategories()
        this.setState({
            all_data_categories: this.props.all_data_categories.data
        })

    }
    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.all_data_categories !== this.props.all_data_categories) {
            this.setState({
                all_data_categories: this.props.all_data_categories.data
            })
        }

    }

    render() {
        let { all_data_categories } = this.state
        console.log(this.state.all_data_categories)
        return (
            <>
                <div className='categories-container'>

                    {all_data_categories && all_data_categories.length > 0 &&
                        all_data_categories.map((items, index) => {
                            let url = ''
                            url = new Buffer(items.image, 'base64').toString('binary')

                            return (
                                <>
                                    <div key={index} className='make-categories'>
                                        <div className='categories-display-container' style={{ backgroundImage: `url(${url})` }}>

                                        </div>
                                        <div className='categories-title-container'>
                                            {items.name_categories}

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }




                </div>
                <div className='categories-container-2'>
                    <div className='name-categories'>
                        Danh mục sản phẩm
                    </div>
                    <Slider {...settings} >
                        {all_data_categories && all_data_categories.length > 0 &&
                            all_data_categories.map((items, index) => {
                                let url = ''
                                url = new Buffer(items.image, 'base64').toString('binary')

                                return (
                                    <>
                                        <div key={index} className='make-categories'>
                                            <div className='categories-display-container' style={{ backgroundImage: `url(${url})` }}>

                                            </div>
                                            <div className='categories-title-container'>
                                                {items.name_categories}

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </Slider>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        all_data_categories: state.admin.all_data_categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        HandleGetAllDataCategories: () => dispatch(actions.GetAllDataCategoriesRedux())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
