import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from '../components/CustomScrollbars';
import HomePage from './Customer/HomePage';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../containers/Auth/Login';
// import Login from '../routes/Login'
import Header from './Header/Header';
import System from '../routes/System';
import Product from './Customer/Product/Product';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import DetailCategories from './Customer/Product/DetailCategories';
import ColorProduct from './Customer/Product/ColorProduct';
import ByIdProduct from './Customer/Product/ByIdProduct';
import ByPriceProduct from './Customer/Product/ByPriceProduct';
import DetailProduct from './Customer/Product/DetailProduct/DetailProduct';
import Cart from './Customer/Product/Cart/Cart';
import Checkout from './Customer/Product/Checkout/Checkout';
import PatientEmail from './Customer/PatientEmail/PatientEmail';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        let userInfo = this.props.userInfo
        return (

            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        {this.props.isLoggedIn && userInfo.roleId === 'R1' && <Header />}

                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>

                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={userIsAuthenticated(HomePage)} />
                                    <Route path={path.PRODUCT} component={userIsAuthenticated(Product)} />
                                    <Route path={path.DETAIL_CATEGORIES} component={userIsAuthenticated(DetailCategories)} />
                                    <Route path={path.COLOR_PRODUCT} component={userIsAuthenticated(ColorProduct)} />
                                    <Route path={path.PRODUCT_BY_ID} component={userIsAuthenticated(ByIdProduct)} />
                                    {/* <Route path={path.ByPriceProduct} component={userIsAuthenticated(ByPriceProduct)} /> */}

                                    <Route path={path.DETAIL_PRODUCT} component={userIsAuthenticated(DetailProduct)} />
                                    <Route path={path.CART} component={userIsAuthenticated(Cart)} />
                                    <Route path={path.CHECKOUT} component={userIsAuthenticated(Checkout)} />
                                    <Route path={path.VERIFY_BOOKING_EMAIL} component={userIsAuthenticated(PatientEmail)} />








                                </Switch>
                            </CustomScrollbars>
                        </span>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover


                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);