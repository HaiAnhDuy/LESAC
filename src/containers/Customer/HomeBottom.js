import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBottom.scss'
import * as actions from "../../store/actions";

import HomeHeader from './HomeHeader';
import WhatNew from './WhatNew';
import Slider from "react-slick";
import TheFeels from './TheFeels';
import Categories from './Categories';
import Policy from './Policy';
import LesacOnme from './LesacOnme';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
class HomeBottom extends Component {



    render() {

        return (
            <>
                <div className='home-bottom-container'>
                    <div className='lesac-bla-bla'>
                        <div className='lesac-bla-bla-title'>
                            <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png" alt="logo" />
                        </div>
                        <div className='lesac-bla-bla-content'>
                            <div className='lesac-bla-bla-content-contact   '>
                                <li>
                                    <strong>Liên hệ:</strong>&nbsp; &nbsp; (+84) 855 225 895
                                </li>
                                <li>
                                    <strong>Email:&nbsp;</strong> &nbsp; &nbsp; &nbsp;tuixachlesac@gmail.com
                                </li>
                                <li>
                                    <strong>Hà Nội:</strong>&nbsp; &nbsp; &nbsp;07 Đặng Văn Ngữ, phường Trung Tự,&nbsp;quận Đống Đa, Hà Nội - 115A Cầu Giấy, phường Quan Hoa, quận Cầu Giấy                                </li>
                                <li>
                                    <strong>Sài Gòn: &nbsp;&nbsp;</strong>104 Lê Văn Sỹ, phường 11, quận Phú Nhuận, thành phố Hồ Chí Minh                                </li>
                            </div>
                            <div className='lesac-bla-bla-content-other'>
                                <li>
                                    <span>
                                        <strong>CÔNG TY CỔ PHẦN MIFAS</strong>
                                    </span>
                                </li>
                                <li>
                                    <span >GCNĐKDN số 0110069011 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày&nbsp;</span>
                                    <span>21/07/2022</span>
                                    <span >&nbsp;</span>
                                </li>
                                <li>
                                    <span >Địa chỉ trụ sở chính:&nbsp;</span>
                                    <span>Tầng 4, số 2 phố Mai Anh Tuấn, Phường Ô Chợ Dừa, Quận Đống Đa, T</span>
                                    <span>P</span>
                                    <span> Hà Nội, Việt Nam</span>
                                </li>
                                <li>
                                    <span >Điện thoại: 0362008007&nbsp; &nbsp; &nbsp; &nbsp;</span>
                                </li>
                                <li>
                                    <span >Email:&nbsp;</span>
                                    <span>tuixachlesac@gmail.com</span>
                                </li>


                            </div>
                        </div>
                        <div className='btc-row'>
                            <img src="https://web.nvnstatic.net/img/dathongbaobocongthuong.png?v=2" alt="Đã đăng ký với bộ công thương" />
                        </div>
                        <div className='choose-row'>
                            <div className='content-right'>

                                <a>
                                    <span>
                                        VỀ LESAC
                                    </span>
                                </a>
                                <a>
                                    <span>
                                        ĐIỀU KIỆN GIAO DỊCH CHUNG                                    </span>
                                </a>
                                <a>
                                    <span>
                                        VẬN CHUYỂN VÀ GIAO NHẬN                                    </span>
                                </a>
                                <a>
                                    <span>
                                        PHƯƠNG THỨC THANH TOÁN                                    </span>
                                </a>
                                <a>
                                    <span>
                                        CHÍNH SÁCH BẢO MẬT THÔNG TIN                                   </span>
                                </a>

                            </div>
                            <div className='content-left'>
                                <a href="https://www.instagram.com/lesac.vn/" target="_blank">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.06986 0.641479C5.99358 0.641479 5.73323 0.650601 4.91781 0.689162C4.10408 0.727628 3.54834 0.861586 3.06205 1.05747C2.55933 1.25994 2.13298 1.53087 1.70794 1.97137C1.28293 2.41189 1.02152 2.85377 0.826175 3.37482C0.637174 3.87882 0.507925 4.45481 0.470811 5.29819C0.433605 6.14332 0.424805 6.41316 0.424805 8.56509C0.424805 10.717 0.433605 10.9868 0.470811 11.832C0.507925 12.6753 0.637174 13.2513 0.826175 13.7553C1.02152 14.2764 1.28293 14.7183 1.70794 15.1588C2.13298 15.5993 2.55933 15.8702 3.06205 16.0727C3.54834 16.2686 4.10408 16.4025 4.91781 16.441C5.73323 16.4795 5.99358 16.4887 8.06986 16.4887C10.1461 16.4887 10.4065 16.4795 11.2219 16.441C12.0356 16.4025 12.5914 16.2686 13.0776 16.0727C13.5804 15.8702 14.0067 15.5993 14.4318 15.1588C14.8568 14.7183 15.1182 14.2764 15.3136 13.7553C15.5025 13.2513 15.6318 12.6753 15.6689 11.832C15.7061 10.9868 15.7149 10.717 15.7149 8.56509C15.7149 6.41316 15.7061 6.14332 15.6689 5.29819C15.6318 4.45481 15.5025 3.87882 15.3136 3.37482C15.1182 2.85377 14.8568 2.41189 14.4318 1.97137C14.0067 1.53087 13.5804 1.25994 13.0776 1.05747C12.5914 0.861586 12.0356 0.727628 11.2219 0.689162C10.4065 0.650601 10.1461 0.641479 8.06986 0.641479ZM8.07014 2.06944C10.1114 2.06944 10.3532 2.07752 11.1594 2.11564C11.9048 2.15087 12.3096 2.27994 12.579 2.38845C12.9358 2.53219 13.1905 2.70389 13.458 2.98117C13.7255 3.25842 13.8912 3.52236 14.0299 3.89221C14.1346 4.1714 14.2591 4.59094 14.2931 5.36347C14.3299 6.19896 14.3377 6.44957 14.3377 8.56522C14.3377 10.6808 14.3299 10.9314 14.2931 11.7669C14.2591 12.5395 14.1346 12.959 14.0299 13.2382C13.8912 13.608 13.7255 13.872 13.458 14.1492C13.1905 14.4265 12.9358 14.5982 12.579 14.7419C12.3096 14.8505 11.9048 14.9795 11.1594 15.0148C10.3534 15.0529 10.1116 15.061 8.07014 15.061C6.02867 15.061 5.78692 15.0529 4.98087 15.0148C4.23549 14.9795 3.83069 14.8505 3.5613 14.7419C3.20445 14.5982 2.94977 14.4265 2.68227 14.1492C2.41476 13.872 2.24906 13.608 2.11038 13.2382C2.00568 12.959 1.88113 12.5395 1.84715 11.7669C1.81036 10.9314 1.80257 10.6808 1.80257 8.56522C1.80257 6.44957 1.81036 6.19896 1.84715 5.36347C1.88113 4.59094 2.00568 4.1714 2.11038 3.89221C2.24906 3.52236 2.41473 3.25842 2.68227 2.98117C2.94977 2.70389 3.20445 2.53219 3.5613 2.38845C3.83069 2.27994 4.23549 2.15087 4.98087 2.11564C5.78701 2.07752 6.02882 2.06944 8.07014 2.06944ZM4.14352 8.56504C4.14352 6.31784 5.90116 4.49616 8.06937 4.49616C10.2375 4.49616 11.9952 6.31784 11.9952 8.56504C11.9952 10.8122 10.2375 12.6339 8.06937 12.6339C5.90116 12.6339 4.14352 10.8122 4.14352 8.56504ZM8.06975 11.2066C6.66232 11.2066 5.52139 10.0241 5.52139 8.5654C5.52139 7.10668 6.66232 5.92419 8.06975 5.92419C9.47716 5.92419 10.6181 7.10668 10.6181 8.5654C10.6181 10.0241 9.47716 11.2066 8.06975 11.2066ZM12.151 5.28663C12.6577 5.28663 13.0684 4.86094 13.0684 4.3358C13.0684 3.81066 12.6577 3.38494 12.151 3.38494C11.6443 3.38494 11.2336 3.81066 11.2336 4.3358C11.2336 4.86094 11.6443 5.28663 12.151 5.28663Z" fill="#333333"></path>
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/lesac.vn" target="_blank">
                                    <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.99996 5.44349H5.52718V3.91295C5.52718 3.12319 5.58611 2.62576 6.62362 2.62576H7.93402V0.192203C7.29636 0.120268 6.65519 0.0850651 6.01332 0.0865957C4.11016 0.0865957 2.72119 1.35465 2.72119 3.6826V5.44349H0.616699V8.50457L2.72119 8.5038V15.392H5.52718V8.50227L7.67798 8.50151L7.99996 5.44349Z" fill="#333333"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='lesac-footer'>
                    <div className='lesac-footer-content'>
                        <li>© LESAC, all rights reserved&nbsp; &nbsp;</li>
                        <li>| Điều khoản sử dụng&nbsp; &nbsp;</li>
                        <li><a >| Chính sách bảo mật&nbsp;</a> &nbsp;</li>
                        <li>| Chính sách Cookie</li>
                    </div>
                </div>

                <div className='home-bottom-container-2'>
                    <div className='lesac-bla-bla'>
                        <div className='lesac-bla-bla-title'>
                            <img src="https://pos.nvncdn.com/b22375-44395/store/20190320_o4CLqgnED7QaznzcRQqeV4ik.png" alt="logo" />
                        </div>
                        <div className='lesac-bla-bla-content'>
                            <div className='lesac-bla-bla-content-contact   '>
                                <li>
                                    <strong>Liên hệ:</strong>&nbsp; &nbsp; (+84) 855 225 895
                                </li>
                                <li>
                                    <strong>Email:&nbsp;</strong> &nbsp; &nbsp; &nbsp;tuixachlesac@gmail.com
                                </li>
                                <li>
                                    <strong>Hà Nội:</strong>&nbsp; &nbsp; &nbsp;07 Đặng Văn Ngữ, phường Trung Tự,&nbsp;quận Đống Đa, Hà Nội - 115A Cầu Giấy,phường Quan Hoa, quận Cầu Giấy                                </li>
                                <li>
                                    <strong>Sài Gòn: &nbsp;&nbsp;</strong>104 Lê Văn Sỹ, phường 11, quận Phú Nhuận, thành phố Hồ Chí Minh                                </li>
                            </div>
                            <div className='lesac-bla-bla-content-other'>
                                <li>
                                    <span>
                                        <strong>CÔNG TY CỔ PHẦN MIFAS</strong>
                                    </span>
                                </li>
                                <li>
                                    <span >GCNĐKDN số 0110069011 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày&nbsp;</span>
                                    <span>21/07/2022</span>
                                    <span >&nbsp;</span>
                                </li>
                                <li>
                                    <span >Địa chỉ trụ sở chính:&nbsp;</span>
                                    <span>Tầng 4, số 2 phố Mai Anh Tuấn, Phường Ô Chợ Dừa, Quận Đống Đa, T</span>
                                    <span>P</span>
                                    <span> Hà Nội, Việt Nam</span>
                                </li>
                                <li>
                                    <span >Điện thoại: 0362008007&nbsp; &nbsp; &nbsp; &nbsp;</span>
                                </li>
                                <li>
                                    <span >Email:&nbsp;</span>
                                    <span>tuixachlesac@gmail.com</span>
                                </li>


                            </div>
                        </div>
                        <div className='btc-row'>
                            <img src="https://web.nvnstatic.net/img/dathongbaobocongthuong.png?v=2" alt="Đã đăng ký với bộ công thương" />
                        </div>
                        <div className='choose-row'>
                            <div className='content-right'>

                                <a>
                                    <span>
                                        VỀ LESAC
                                    </span>
                                </a>
                                <a>
                                    <span>
                                        ĐIỀU KIỆN GIAO DỊCH CHUNG                                    </span>
                                </a>
                                <a>
                                    <span>
                                        VẬN CHUYỂN VÀ GIAO NHẬN                                    </span>
                                </a>
                                <a>
                                    <span>
                                        PHƯƠNG THỨC THANH TOÁN                                    </span>
                                </a>
                                <a>
                                    <span>
                                        CHÍNH SÁCH BẢO MẬT THÔNG TIN                                   </span>
                                </a>

                            </div>
                            <div className='content-left'>
                                <a href="https://www.instagram.com/lesac.vn/" target="_blank">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.06986 0.641479C5.99358 0.641479 5.73323 0.650601 4.91781 0.689162C4.10408 0.727628 3.54834 0.861586 3.06205 1.05747C2.55933 1.25994 2.13298 1.53087 1.70794 1.97137C1.28293 2.41189 1.02152 2.85377 0.826175 3.37482C0.637174 3.87882 0.507925 4.45481 0.470811 5.29819C0.433605 6.14332 0.424805 6.41316 0.424805 8.56509C0.424805 10.717 0.433605 10.9868 0.470811 11.832C0.507925 12.6753 0.637174 13.2513 0.826175 13.7553C1.02152 14.2764 1.28293 14.7183 1.70794 15.1588C2.13298 15.5993 2.55933 15.8702 3.06205 16.0727C3.54834 16.2686 4.10408 16.4025 4.91781 16.441C5.73323 16.4795 5.99358 16.4887 8.06986 16.4887C10.1461 16.4887 10.4065 16.4795 11.2219 16.441C12.0356 16.4025 12.5914 16.2686 13.0776 16.0727C13.5804 15.8702 14.0067 15.5993 14.4318 15.1588C14.8568 14.7183 15.1182 14.2764 15.3136 13.7553C15.5025 13.2513 15.6318 12.6753 15.6689 11.832C15.7061 10.9868 15.7149 10.717 15.7149 8.56509C15.7149 6.41316 15.7061 6.14332 15.6689 5.29819C15.6318 4.45481 15.5025 3.87882 15.3136 3.37482C15.1182 2.85377 14.8568 2.41189 14.4318 1.97137C14.0067 1.53087 13.5804 1.25994 13.0776 1.05747C12.5914 0.861586 12.0356 0.727628 11.2219 0.689162C10.4065 0.650601 10.1461 0.641479 8.06986 0.641479ZM8.07014 2.06944C10.1114 2.06944 10.3532 2.07752 11.1594 2.11564C11.9048 2.15087 12.3096 2.27994 12.579 2.38845C12.9358 2.53219 13.1905 2.70389 13.458 2.98117C13.7255 3.25842 13.8912 3.52236 14.0299 3.89221C14.1346 4.1714 14.2591 4.59094 14.2931 5.36347C14.3299 6.19896 14.3377 6.44957 14.3377 8.56522C14.3377 10.6808 14.3299 10.9314 14.2931 11.7669C14.2591 12.5395 14.1346 12.959 14.0299 13.2382C13.8912 13.608 13.7255 13.872 13.458 14.1492C13.1905 14.4265 12.9358 14.5982 12.579 14.7419C12.3096 14.8505 11.9048 14.9795 11.1594 15.0148C10.3534 15.0529 10.1116 15.061 8.07014 15.061C6.02867 15.061 5.78692 15.0529 4.98087 15.0148C4.23549 14.9795 3.83069 14.8505 3.5613 14.7419C3.20445 14.5982 2.94977 14.4265 2.68227 14.1492C2.41476 13.872 2.24906 13.608 2.11038 13.2382C2.00568 12.959 1.88113 12.5395 1.84715 11.7669C1.81036 10.9314 1.80257 10.6808 1.80257 8.56522C1.80257 6.44957 1.81036 6.19896 1.84715 5.36347C1.88113 4.59094 2.00568 4.1714 2.11038 3.89221C2.24906 3.52236 2.41473 3.25842 2.68227 2.98117C2.94977 2.70389 3.20445 2.53219 3.5613 2.38845C3.83069 2.27994 4.23549 2.15087 4.98087 2.11564C5.78701 2.07752 6.02882 2.06944 8.07014 2.06944ZM4.14352 8.56504C4.14352 6.31784 5.90116 4.49616 8.06937 4.49616C10.2375 4.49616 11.9952 6.31784 11.9952 8.56504C11.9952 10.8122 10.2375 12.6339 8.06937 12.6339C5.90116 12.6339 4.14352 10.8122 4.14352 8.56504ZM8.06975 11.2066C6.66232 11.2066 5.52139 10.0241 5.52139 8.5654C5.52139 7.10668 6.66232 5.92419 8.06975 5.92419C9.47716 5.92419 10.6181 7.10668 10.6181 8.5654C10.6181 10.0241 9.47716 11.2066 8.06975 11.2066ZM12.151 5.28663C12.6577 5.28663 13.0684 4.86094 13.0684 4.3358C13.0684 3.81066 12.6577 3.38494 12.151 3.38494C11.6443 3.38494 11.2336 3.81066 11.2336 4.3358C11.2336 4.86094 11.6443 5.28663 12.151 5.28663Z" fill="#333333"></path>
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/lesac.vn" target="_blank">
                                    <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.99996 5.44349H5.52718V3.91295C5.52718 3.12319 5.58611 2.62576 6.62362 2.62576H7.93402V0.192203C7.29636 0.120268 6.65519 0.0850651 6.01332 0.0865957C4.11016 0.0865957 2.72119 1.35465 2.72119 3.6826V5.44349H0.616699V8.50457L2.72119 8.5038V15.392H5.52718V8.50227L7.67798 8.50151L7.99996 5.44349Z" fill="#333333"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='lesac-footer-2'>
                    <div className='lesac-footer-content'>
                        <li>© LESAC, all rights reserved&nbsp; &nbsp;</li>
                        <li>| Điều khoản sử dụng&nbsp; &nbsp;</li>
                        <li><a >| Chính sách bảo mật&nbsp;</a> &nbsp;</li>
                        <li>| Chính sách Cookie</li>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBottom);
