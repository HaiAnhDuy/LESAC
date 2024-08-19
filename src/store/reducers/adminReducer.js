import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    data_array: {},
    data_active: '',
    all_data_user: '',
    all_data_categories: '',
    data_user_by_id: '',
    data_categories_by_id: '',
    data_full_3_select: '',
    all_data_product: '',
    all_data_categories_product: '',
    data_product_by_categories: '',
    get_id_by_hex: '',
    data_product_color: '',
    all_data_cart_by_user_id: '',
    all_data_price_allcode: '',
    data_yml: '',
    data_color_image_by_id: ''


}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        //get data arr gender and role;
        case actionTypes.GET_DATA_GENDER_AND_ROLE_SUCCESS:
            state.data_array = action
            return {
                ...state,

            }
        case actionTypes.GET_DATA_GENDER_AND_ROLE_FAILED:
            state.data_array = ''
            return {
                ...state,

            }

        //get data active;
        case actionTypes.GET_DATA_ACTIVE_SUCCESS:
            state.data_active = action
            return {
                ...state,

            }
        case actionTypes.GET_DATA_ACTIVE_FAILED:
            state.data_active = ''
            return {
                ...state,

            }

        //get all data user;
        case actionTypes.GET_ALL_DATA_USER_SUCCESS:
            state.all_data_user = action
            return {
                ...state,

            }
        case actionTypes.GET_ALL_DATA_USER_FAILED:
            state.all_data_user = ''
            return {
                ...state,

            }

        //data user by id;
        case actionTypes.GET_DATA_USER_BY_ID_SUCCESS:
            state.data_user_by_id = action.data
            return {
                ...state,

            }
        case actionTypes.GET_DATA_USER_BY_ID_FAILED:
            state.data_user_by_id = ''
            return {
                ...state,

            }

        //all data categoris;
        case actionTypes.GET_DATA_CATEGORIES_SUCCESS:
            state.all_data_categories = action.data
            return {
                ...state,

            }
        case actionTypes.GET_DATA_CATEGORIES_FAILED:
            state.all_data_categories = ''
            return {
                ...state,

            }

        //data categoris by id;
        case actionTypes.GET_DATA_CATEGORIES_SUCCESS_BY_ID:
            state.data_categories_by_id = action.data
            return {
                ...state,

            }
        case actionTypes.GET_DATA_CATEGORIES_FAILED_BY_ID:
            state.data_categories_by_id = ''
            return {
                ...state,

            }

        //data discount_last_color;
        case actionTypes.GET_DATA_DISCOUNT_COLOR_LAST_SUCCESS:
            state.data_full_3_select = action.data
            return {
                ...state,

            }
        case actionTypes.GET_DATA_DISCOUNT_COLOR_LAST_FAILED:
            state.data_full_3_select = ''
            return {
                ...state,

            }

        //data product;
        case actionTypes.GET_DATA_PRODUCT_SUCCESS:
            state.all_data_product = action.data
            return {
                ...state,

            }
        case actionTypes.GET_DATA_PRODUCT_FAILED:
            state.all_data_product = ''
            return {
                ...state,

            }


        case actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_SUCCESS:
            state.all_data_categories_product = action.all_data_categories_product
            return {
                ...state,

            }
        case actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_FAILED:
            state.all_data_categories_product = ''
            return {
                ...state,

            }


        case actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_BY_ID_SUCCESS:
            state.data_product_by_categories = action.data_product_by_categories
            return {
                ...state,

            }
        case actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_BY_ID_FAILED:
            state.data_product_by_categories = ''
            return {
                ...state,

            }
        // data_product_color
        case actionTypes.GET_ID_BY_HEX_SUCCESS:
            state.get_id_by_hex = action.get_id
            return {
                ...state,

            }
        case actionTypes.GET_ID_BY_HEX_FAILED:
            state.get_id_by_hex = ''
            return {
                ...state,

            }

        case actionTypes.GET_ALL_DATA_PRODUCT_BY_COLOR_SUCCESS:
            state.data_product_color = action.data
            return {
                ...state,

            }
        case actionTypes.GET_ALL_DATA_PRODUCT_BY_COLOR_FAILED:
            state.data_product_color = ''
            return {
                ...state,

            }

        case actionTypes.SHOW_ALL_DATA_BY_USER_ID_SUCCESS:
            state.all_data_cart_by_user_id = action.data_cart_by_user_id
            return {
                ...state,

            }
        case actionTypes.SHOW_ALL_DATA_BY_USER_ID_FAILED:
            state.all_data_cart_by_user_id = ''
            return {
                ...state,

            }

        case actionTypes.GET_ALL_DATA_PRICE_ALLCODE_SUCCESS:
            state.all_data_price_allcode = action.price_allcode
            return {
                ...state,

            }
        case actionTypes.GET_ALL_DATA_PRICE_ALLCODE_FAILED:
            state.all_data_price_allcode = ''
            return {
                ...state,

            }

        case actionTypes.GET_DATA_YML_SUCCESS:
            state.data_yml = action.data_yml
            return {
                ...state,

            }
        case actionTypes.GET_DATA_YML_FAILED:
            state.data_yml = ''
            return {
                ...state,

            }


        case actionTypes.GET_DATA_IMAGE_PRODUCT_SUCCESS:
            state.data_color_image_by_id = action.data
            return {
                ...state,

            }
        case actionTypes.GET_DATA_IMAGE_PRODUCT_FAILED:
            state.data_color_image_by_id = ''
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;