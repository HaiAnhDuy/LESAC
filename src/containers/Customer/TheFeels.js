import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TheFeels.scss'
import * as actions from "../../store/actions";


class TheFeels extends Component {
    constructor(props) {
        super(props);
        this.state = {




        }
    }



    render() {
        return (
            <>
                <div className='the-feels-container'>
                    <div className='content-container'>
                        <div className='title-the-feel'>
                            THE FEELS
                        </div>
                        <div className='content-the-feel'>
                            LESAC sẽ mang tới một LINHKA đa sắc màu trong hai hình tượng trái ngược với concept "The Feels".
                        </div>
                        <div className='title-content'>

                        </div>
                        <button className='btn-the-feels'>Xem thêm</button>
                    </div>
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(TheFeels);
