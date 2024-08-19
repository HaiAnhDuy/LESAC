import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserManager from '../containers/System/Admin/UserManager';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import HomePage from '../containers/Customer/HomePage';
import Header from '../containers/Header/Header';
import CategoriesManager from '../containers/System/Admin/Categories/CategoriesManager';
import ProductManager from '../containers/System/Admin/Product/ProductManager';
import ManagerColor from '../containers/System/Admin/Product/Color/ManagerColor';
import ImageManager from '../containers/System/Admin/Product/Image/ImageManager';
import ManagerMarkDown from '../containers/System/Admin/MarkDown/ManagerMarkDown';
class System extends Component {
    render() {
        const { systemMenuPath, userInfo } = this.props;
        let home = '/home'
        return (
            <div className="system-container">

                <div className="system-list">
                    <Switch>
                        {userInfo && userInfo.roleId === 'R1' ?
                            <>
                                <Route path="/system/user-manage" component={UserManager} />
                                <Route path="/system/categories-manage" component={CategoriesManager} />
                                <Route path='/system/product-manage' component={ProductManager}></Route>
                                <Route path='/system/color-product' component={ManagerColor}></Route>
                                <Route path='/system/manager-image' component={ImageManager}></Route>
                                <Route path='/system/manager-markdown' component={ManagerMarkDown}></Route>


                            </>
                            :
                            <Route component={() => { return (<Redirect to={home} />) }} />

                        }


                        {/* <Route path="/system/product-manage" component={UserManager} /> */}
                        {/* <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} /> */}

                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
