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
                            CÙNG KINH ĐÔ
                        </div>
                        <div className='content-the-feel'>
                            Trung Thu nay dẫu có chút khác xưa, nhưng tiếng cười thơ trẻ ấy cần được lưu giữ vẹn nguyên. Còn gì tuyệt vời hơn khi chúng ta trao lại niềm vui trong sáng ấy cho hôm nay và mai sau, để tuổi thơ các em được vui trọn một ngày Tết Thiếu Nhi đúng nghĩa.                        </div>
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
