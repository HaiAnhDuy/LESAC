import actionTypes from './actionTypes';

import {
    GetAllArrayGenderAndRole, SaveDataManagerUser, GetDataActive, SaveDataACategories, GetAllDataUserService,
    GetDataUserById, UpdateDataUserById, DeleteDataUserById, GetAllDataCategories, GetDataCategoriesById, UpdateDataCategoriesById, SaveDataImageProduct,
    DeleteDataCategoriesById, GetDataDiscountLastColor, SaveDataProduct, GetAllDataProduct, SaveDataColorProduct, GetDataImageProductByIdProduct, GetAllDataCategoriesProduct,
    GetAllDataCategoriesProductById, GetIdByHex, GetAllDataProductColorById, SaveDataMarkDown, AddToCart, ShowAllDataCartByUserId, PlusProductCart, MinusProductCart,
    DeleteByIdProductCart, PatientBookingAppointmentService, GetAllPriceAllcode, GetDataYMl, DeleteProductById, UpdateDataProductId, UpdateDataImageId, UpdateDataColorId, DeleteDataColorId,
    DeleteDataImageId
} from '../../services/userServices'
import { ToastContainer, toast } from 'react-toastify';


export const GetDataArrGenderAndRole = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DATA_GENDER_AND_ROLE })
            let res = await GetAllArrayGenderAndRole()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetDataArrGenderAndRoleSuccess(res.data))
            }
            else {
                dispatch(GetDataArrGenderAndRoleFailed());
            }
        } catch (e) {
            dispatch(GetDataArrGenderAndRoleFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataArrGenderAndRoleSuccess = (input) => ({
    type: actionTypes.GET_DATA_GENDER_AND_ROLE_SUCCESS,
    data: input
})
export const GetDataArrGenderAndRoleFailed = () => ({
    type: actionTypes.GET_DATA_GENDER_AND_ROLE_FAILED,

})


// save data manager user
export const LetSaveDataManagerUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_DATA_MANAGE_USER })
            let res = await SaveDataManagerUser(data)
            console.log('check res', res)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(LetSaveDataManagerUserSuccess())
                toast.success('SAVE SUCCESS !')
            }
            else {
                dispatch(LetSaveDataManagerUserFailed());
                toast.error('SAVE ERROR !')
            }
        } catch (e) {
            dispatch(LetSaveDataManagerUserFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const LetSaveDataManagerUserSuccess = () => ({
    type: actionTypes.SAVE_DATA_MANAGE_USER_SUCCESS,

})
export const LetSaveDataManagerUserFailed = () => ({
    type: actionTypes.SAVE_DATA_MANAGE_USER_FAILED,

})


// GET data manager user
export const GetDataArrayActive = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetDataActive()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetDataArrayActiveSuccess(res.data.data))
            }
            else {
                dispatch(GetDataArrayActiveFailed());
            }
        } catch (e) {
            dispatch(LetSaveDataManagerUserFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataArrayActiveSuccess = (data) => ({
    type: actionTypes.GET_DATA_ACTIVE_SUCCESS,
    data_active: data

})
export const GetDataArrayActiveFailed = () => ({
    type: actionTypes.GET_DATA_ACTIVE_FAILED,

})


// save data categories
export const SaveDataCategoriesService = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await SaveDataACategories(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(SaveDataACategoriesSuccess())
                toast.success('Save data categories success')
            }
            else {
                dispatch(SaveDataACategoriesFailed());
                toast.error('Save data categories failed')
            }
        } catch (e) {
            dispatch(SaveDataACategoriesFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const SaveDataACategoriesSuccess = () => ({
    type: actionTypes.SAVE_DATA_CATEGORIES_SUCCESS,

})
export const SaveDataACategoriesFailed = () => ({
    type: actionTypes.SAVE_DATA_CATEGORIES_FAILED,

})

// get all data user
export const GetAllDataUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllDataUserService()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetAllDataUserSuccess(res.data.data))
            }
            else {
                dispatch(GetAllDataUserFailed());
            }
        } catch (e) {
            dispatch(GetAllDataUserFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllDataUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_DATA_USER_SUCCESS,
    data: data

})
export const GetAllDataUserFailed = () => ({
    type: actionTypes.GET_ALL_DATA_USER_FAILED,

})


// get data user by id
export const GetDataUserByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetDataUserById(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetDataUserByIdReduxSuccess(res.data.data))
            }
            else {
                dispatch(GetDataUserByIdReduxFailed());
            }
        } catch (e) {
            dispatch(GetDataUserByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataUserByIdReduxSuccess = (data) => ({
    type: actionTypes.GET_DATA_USER_BY_ID_SUCCESS,
    data: data

})
export const GetDataUserByIdReduxFailed = () => ({
    type: actionTypes.GET_DATA_USER_BY_ID_FAILED,

})

// UPDATE data user by id
export const UpdateDataUserByIdRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await UpdateDataUserById(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(UpdateDataUserByIdReduxSuccess());
                toast.success('Update succsess')
            }
            else {
                dispatch(UpdateDataUserByIdReduxFailed());
                toast.error('Not Update succsess')

            }
        } catch (e) {
            dispatch(UpdateDataUserByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const UpdateDataUserByIdReduxSuccess = () => ({
    type: actionTypes.UPDATE_DATA_USERS_SUCCESS,

})
export const UpdateDataUserByIdReduxFailed = () => ({
    type: actionTypes.UPDATE_DATA_USERS_FAILED,

})

// dELETE data user by id
export const DeleteDataUserByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteDataUserById(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(DeleteDataUserByIdReduxSuccess());
                toast.success('Delete succsess')
            }
            else {
                dispatch(DeleteDataUserByIdReduxFailed());
                toast.error('Not Delete succsess')

            }
        } catch (e) {
            dispatch(UpdateDataUserByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const DeleteDataUserByIdReduxSuccess = () => ({
    type: actionTypes.DELETE_DATA_USERS_SUCCESS,

})
export const DeleteDataUserByIdReduxFailed = () => ({
    type: actionTypes.DELETE_DATA_USERS_FAILED,

})

// get data categories
export const GetAllDataCategoriesRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllDataCategories()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetAllDataCategoriesReduxSuccess(res.data));
            }
            else {
                dispatch(GetAllDataCategoriesReduxFailed());

            }
        } catch (e) {
            dispatch(GetAllDataCategoriesReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllDataCategoriesReduxSuccess = (input) => ({
    type: actionTypes.GET_DATA_CATEGORIES_SUCCESS,
    data: input

})
export const GetAllDataCategoriesReduxFailed = () => ({
    type: actionTypes.GET_DATA_CATEGORIES_FAILED,

})

// get data categories by id
export const GetDataCategoriesByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetDataCategoriesById(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetDataCategoriesByIdReduxSuccess(res.data));
            }
            else {
                dispatch(GetDataCategoriesByIdReduxFailed());

            }
        } catch (e) {
            dispatch(GetDataCategoriesByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataCategoriesByIdReduxSuccess = (input) => ({
    type: actionTypes.GET_DATA_CATEGORIES_SUCCESS_BY_ID,
    data: input

})
export const GetDataCategoriesByIdReduxFailed = () => ({
    type: actionTypes.GET_DATA_CATEGORIES_FAILED_BY_ID,

})

// update data categories by id
export const UpdateDataCategoriesByIdRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await UpdateDataCategoriesById(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(UpdateDataCategoriesByIdReduxSuccess());
                toast.success('Update categories succsess')
            }
            else {
                dispatch(UpdateDataCategoriesByIdReduxFailed());
                toast.error('Update categories not succsess')


            }
        } catch (e) {
            dispatch(UpdateDataCategoriesByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const UpdateDataCategoriesByIdReduxSuccess = () => ({
    type: actionTypes.UPDATE_DATA_CATEGORIES_SUCCESS,

})
export const UpdateDataCategoriesByIdReduxFailed = () => ({
    type: actionTypes.UPDATE_DATA_CATEGORIES_FAILED,

})

// delete data categories by id
export const DeleteDataCategoriesByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteDataCategoriesById(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(DeleteDataCategoriesByIdReduxSuccess());
                toast.success('Delete categories succsess')
            }
            else {
                dispatch(DeleteDataCategoriesByIdReduxFailed());
                toast.error('Delete categories not succsess')


            }
        } catch (e) {
            dispatch(DeleteDataCategoriesByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const DeleteDataCategoriesByIdReduxSuccess = () => ({
    type: actionTypes.DELETE_DATA_CATEGORIES_SUCCESS,

})
export const DeleteDataCategoriesByIdReduxFailed = () => ({
    type: actionTypes.DELETE_DATA_CATEGORIES_FAILED,

})

export const GetDataDiscountColorLastRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetDataDiscountLastColor()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetDataDiscountColorLastReduxSuccess(res.data));
            }
            else {
                dispatch(GetDataDiscountColorLastReduxFailed());


            }
        } catch (e) {
            dispatch(DeleteDataCategoriesByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataDiscountColorLastReduxSuccess = (input) => ({
    type: actionTypes.GET_DATA_DISCOUNT_COLOR_LAST_SUCCESS,
    data: input

})
export const GetDataDiscountColorLastReduxFailed = () => ({
    type: actionTypes.GET_DATA_DISCOUNT_COLOR_LAST_FAILED,

})

export const SaveDataProductRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await SaveDataProduct(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(SaveDataProductReduxSuccess());
                toast.success('You Save Data Succsess !')
            }
            if (res && res.data && res.data.errCode === 1) {
                dispatch(SaveDataProductReduxFailed());
                toast.error(res.data.message)


            }
            else {
                dispatch(SaveDataProductReduxFailed());
                toast.error('Save data product error')
            }
        } catch (e) {
            dispatch(SaveDataProductReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const SaveDataProductReduxSuccess = () => ({
    type: actionTypes.SAVE_DATA_PRODUCT_SUCCESS,

})
export const SaveDataProductReduxFailed = () => ({
    type: actionTypes.SAVE_DATA_PRODUCT_FAILED,

})

export const GetAllDataProductService = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllDataProduct()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetAllDataProductSuccess(res.data));
            }

            else {
                dispatch(GetAllDataProductFailed());
            }
        } catch (e) {
            dispatch(GetAllDataProductFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllDataProductSuccess = (input) => ({
    type: actionTypes.GET_DATA_PRODUCT_SUCCESS,
    data: input

})
export const GetAllDataProductFailed = () => ({
    type: actionTypes.GET_DATA_PRODUCT_FAILED,

})

export const SaveDataColorProductService = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await SaveDataColorProduct(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(SaveDataColorProductServiceSuccess());
                toast.success('Save Ok')
            }

            else {
                dispatch(SaveDataColorProductServiceFailed());
                toast.error('Save not Ok')

            }
        } catch (e) {
            dispatch(SaveDataColorProductServiceFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const SaveDataColorProductServiceSuccess = () => ({
    type: actionTypes.GET_DATA_COLOR_PRODUCT_SUCCESS,

})
export const SaveDataColorProductServiceFailed = () => ({
    type: actionTypes.GET_DATA_COLOR_PRODUCT_FAILED,

})

export const SaveDataImageProductService = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await SaveDataImageProduct(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(SaveDataImageProductServiceSuccess());
                toast.success('Save Ok')
            }

            else {
                dispatch(SaveDataImageProductServiceFailed());
                toast.error('Save not Ok')

            }
        } catch (e) {
            dispatch(SaveDataImageProductServiceFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const SaveDataImageProductServiceSuccess = () => ({
    type: actionTypes.SAVE_DATA_IMAGE_PRODUCT_SUCCESS,

})
export const SaveDataImageProductServiceFailed = () => ({
    type: actionTypes.SAVE_DATA_IMAGE_PRODUCT_FAILED,

})

export const GetDataImageProductService = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetDataImageProductByIdProduct(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetDataImageProductServiceSuccess(res.data));
            }

            else {
                dispatch(GetDataImageProductServiceFailed());

            }
        } catch (e) {
            dispatch(GetDataImageProductServiceFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataImageProductServiceSuccess = (input) => ({
    type: actionTypes.GET_DATA_IMAGE_PRODUCT_SUCCESS,
    data: input

})
export const GetDataImageProductServiceFailed = () => ({
    type: actionTypes.GET_DATA_IMAGE_PRODUCT_FAILED,

})



export const GetAllDataCategoriesProductRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllDataCategoriesProduct()
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetAllDataCategoriesProductReduxSuccess(res.data.all_data_categories_product));

            }

            else {
                dispatch(GetAllDataCategoriesProductReduxFailed());


            }
        } catch (e) {
            dispatch(GetAllDataCategoriesProductReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllDataCategoriesProductReduxSuccess = (input) => ({
    type: actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_SUCCESS,
    all_data_categories_product: input


})
export const GetAllDataCategoriesProductReduxFailed = () => ({
    type: actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_FAILED,

})

export const GetAllDataCategoriesProductByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllDataCategoriesProductById(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetAllDataCategoriesProductByIdReduxSuccess(res.data));

            }

            else {
                dispatch(GetAllDataCategoriesProductByIdReduxFailed());


            }
        } catch (e) {
            dispatch(GetAllDataCategoriesProductByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllDataCategoriesProductByIdReduxSuccess = (input) => ({
    type: actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_BY_ID_SUCCESS,
    data_product_by_categories: input


})
export const GetAllDataCategoriesProductByIdReduxFailed = () => ({
    type: actionTypes.GET_ALL_DATA_CATEGORIES_PRODUCT_BY_ID_FAILED,

})

export const GetIdByHexRedux = (hex) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetIdByHex(hex)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetIdByHexReduxSuccess(res.data.get_id));

            }

            else {
                dispatch(GetIdByHexReduxFailed());


            }
        } catch (e) {
            dispatch(GetIdByHexReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetIdByHexReduxSuccess = (input) => ({
    type: actionTypes.GET_ID_BY_HEX_SUCCESS,
    get_id: input


})
export const GetIdByHexReduxFailed = () => ({
    type: actionTypes.GET_ID_BY_HEX_FAILED,

})

export const GetAllDataProductColorByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllDataProductColorById(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(GetAllDataProductColorByIdReduxSuccess(res.data.data_product_by_color));

            }

            else {
                dispatch(GetAllDataProductColorByIdReduxFailed());


            }
        } catch (e) {
            dispatch(GetAllDataProductColorByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllDataProductColorByIdReduxSuccess = (input) => ({
    type: actionTypes.GET_ALL_DATA_PRODUCT_BY_COLOR_SUCCESS,
    data: input


})
export const GetAllDataProductColorByIdReduxFailed = () => ({
    type: actionTypes.GET_ALL_DATA_PRODUCT_BY_COLOR_FAILED,

})

export const SaveDataMarkDownRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await SaveDataMarkDown(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(SaveDataMarkDownReduxSuccess());
                toast.success('Lưu thành công')
            }

            else {
                dispatch(SaveDataMarkDownReduxFailed());
                toast.error('Lưu không thành công')


            }
        } catch (e) {
            dispatch(SaveDataMarkDownReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const SaveDataMarkDownReduxSuccess = () => ({
    type: actionTypes.SAVE_DATA_MARKDOWN_SUCCESS,


})
export const SaveDataMarkDownReduxFailed = () => ({
    type: actionTypes.SAVE_DATA_MARKDOWN_SUCCESS_FAILED,

})

//CART
export const AddToCartRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await AddToCart(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(AddToCartReduxSuccess());
            }
            if (res && res.data && res.data.errCode === 1) {
                dispatch(AddToCartReduxFailed());
                toast.error('Thiếu')

            }
            else {
                dispatch(AddToCartReduxFailed());
                toast.error('Lưu không thành công')


            }
        } catch (e) {
            dispatch(AddToCartReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const AddToCartReduxSuccess = () => ({
    type: actionTypes.AddToCartReduxSuccess,


})
export const AddToCartReduxFailed = () => ({
    type: actionTypes.ADD_TO_CART_FAILED,

})

export const ShowAllDataCartByUserIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await ShowAllDataCartByUserId(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(ShowAllDataCartByUserIdReduxSuccess(res.data.data_cart_by_user_id));
            }

            else {
                dispatch(ShowAllDataCartByUserIdReduxFailed());


            }
        } catch (e) {
            dispatch(ShowAllDataCartByUserIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const ShowAllDataCartByUserIdReduxSuccess = (input) => ({
    type: actionTypes.SHOW_ALL_DATA_BY_USER_ID_SUCCESS,
    data_cart_by_user_id: input


})
export const ShowAllDataCartByUserIdReduxFailed = () => ({
    type: actionTypes.SHOW_ALL_DATA_BY_USER_ID_FAILED,

})

export const PlusProductCartRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await PlusProductCart(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(PlusProductCartReduxSuccess());
            }

            else {
                dispatch(PlusProductCartReduxFailed());


            }
        } catch (e) {
            dispatch(PlusProductCartReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const PlusProductCartReduxSuccess = () => ({
    type: actionTypes.PLUS_DATA_CART_SUCCESS,


})
export const PlusProductCartReduxFailed = () => ({
    type: actionTypes.PLUS_DATA_CART_FAILED,

})

export const MinusProductCartRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await MinusProductCart(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(MinusProductCartReduxSuccess());
            }
            if (res && res.data && res.data.errCode === 2) {
                dispatch(MinusProductCartReduxFailed());
                toast.error(res.data.message)
            }

            else {
                dispatch(MinusProductCartReduxFailed());


            }
        } catch (e) {
            dispatch(MinusProductCartReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const MinusProductCartReduxSuccess = () => ({
    type: actionTypes.MINUS_DATA_CART_SUCCESS,


})
export const MinusProductCartReduxFailed = () => ({
    type: actionTypes.MINUS_DATA_CART_FAILED,

})

export const DeleteByIdProductCartRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteByIdProductCart(id)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(DeleteByIdProductCartReduxSuccess());
                toast.success('Xoá sản phẩm thành công')
            }

            else {
                dispatch(DeleteByIdProductCartReduxFailed());


            }
        } catch (e) {
            dispatch(DeleteByIdProductCartReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const DeleteByIdProductCartReduxSuccess = () => ({
    type: actionTypes.DELETE_BY_ID_DATA_CART_SUCCESS,


})
export const DeleteByIdProductCartReduxFailed = () => ({
    type: actionTypes.DELETE_BY_ID_DATA_CART_FAILED,

})

//EMAIL
export const PatientBookingAppointmentRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await PatientBookingAppointmentService(data)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(PatientBookingAppointmentReduxSuccess());
            }

            else {
                dispatch(PatientBookingAppointmentReduxFailed());


            }
        } catch (e) {
            dispatch(PatientBookingAppointmentReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const PatientBookingAppointmentReduxSuccess = () => ({
    type: actionTypes.PATIENT_BOOKING_SUCCESS,


})
export const PatientBookingAppointmentReduxFailed = () => ({
    type: actionTypes.PATIENT_BOOKING_FAILED,

})

//ALLCODE PRICE
export const GetAllPriceAllcodeRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllPriceAllcode();
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(GetAllPriceAllcodeSuccess(res.allcode_price));
            }

            else {
                dispatch(GetAllPriceAllcodeFailed());


            }
        } catch (e) {
            dispatch(GetAllPriceAllcodeFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetAllPriceAllcodeSuccess = (input) => ({
    type: actionTypes.GET_ALL_DATA_PRICE_ALLCODE_SUCCESS,
    price_allcode: input


})
export const GetAllPriceAllcodeFailed = () => ({
    type: actionTypes.GET_ALL_DATA_PRICE_ALLCODE_FAILED,

})

export const GetDataYMlRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await GetDataYMl(id);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(GetDataYMlSuccess(res.data_yml));
            }

            else {
                dispatch(GetDataYMlFailed());


            }
        } catch (e) {
            dispatch(GetDataYMlFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const GetDataYMlSuccess = (input) => ({
    type: actionTypes.GET_DATA_YML_SUCCESS,
    data_yml: input


})
export const GetDataYMlFailed = () => ({
    type: actionTypes.GET_DATA_YML_FAILED,

})


export const DeleteProductByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteProductById(id);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(DeleteProductByIdReduxSuccess());
                toast.success('Oki')
            }

            else {
                dispatch(DeleteProductByIdReduxFailed());


            }
        } catch (e) {
            dispatch(DeleteProductByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const DeleteProductByIdReduxSuccess = () => ({
    type: actionTypes.DELETE_DATA_PRODUCT_ID_SUCCESS,


})
export const DeleteProductByIdReduxFailed = () => ({
    type: actionTypes.DELETE_DATA_PRODUCT_ID_FAILED,

})

export const UpdateroductByIdRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await UpdateDataProductId(data);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(UpdateroductByIdReduxSuccess());
                toast.success('Oki')
            }

            else {
                dispatch(UpdateroductByIdReduxFailed());


            }
        } catch (e) {
            dispatch(UpdateroductByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const UpdateroductByIdReduxSuccess = () => ({
    type: actionTypes.UPDATE_DATA_PRODUCT_ID_SUCCESS,


})
export const UpdateroductByIdReduxFailed = () => ({
    type: actionTypes.UPDATE_DATA_PRODUCT_ID_FAILED,

})


export const UpdateImageByIdRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await UpdateDataImageId(data);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(UpdateImageByIdReduxSuccess());
                toast.success('Oki')
            }

            else {
                dispatch(UpdateImageByIdReduxFailed());
                toast.error('Error')


            }
        } catch (e) {
            dispatch(UpdateImageByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const UpdateImageByIdReduxSuccess = () => ({
    type: actionTypes.UPDATE_DATA_IMAGE_ID_SUCCESS,


})
export const UpdateImageByIdReduxFailed = () => ({
    type: actionTypes.UPDATE_DATA_IMAGE_ID_FAILED,

})

export const UpdateColorByIdRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await UpdateDataColorId(data);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(UpdateColorByIdReduxSuccess());
                toast.success('Oki')
            }

            else {
                dispatch(UpdateColorByIdReduxFailed());
                toast.error('Error')


            }
        } catch (e) {
            dispatch(UpdateColorByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const UpdateColorByIdReduxSuccess = () => ({
    type: actionTypes.UPDATE_DATA_COLOR_ID_SUCCESS,


})
export const UpdateColorByIdReduxFailed = () => ({
    type: actionTypes.UPDATE_DATA_COLOR_ID_FAILED,

})
//handle delete color
export const DeleteColorByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteDataColorId(id);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(DeleteColorByIdReduxSuccess());
                toast.success('Oki')
            }

            else {
                dispatch(DeleteColorByIdReduxFailed());
                toast.error('Error')


            }
        } catch (e) {
            dispatch(DeleteColorByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const DeleteColorByIdReduxSuccess = () => ({
    type: actionTypes.DELETE_DATA_COLOR_ID_SUCCESS,


})
export const DeleteColorByIdReduxFailed = () => ({
    type: actionTypes.DELETE_DATA_COLOR_ID_FAILED,

})
//handle delete image
export const DeleteImageByIdRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteDataImageId(id);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(DeleteImageByIdReduxSuccess());
                toast.success('Oki')
            }

            else {
                dispatch(DeleteImageByIdReduxFailed());
                toast.error('Error')


            }
        } catch (e) {
            dispatch(DeleteImageByIdReduxFailed());
            console.log('>>>Check loi', e)
        }
    }
}
export const DeleteImageByIdReduxSuccess = () => ({
    type: actionTypes.DELETE_DATA_IMAGE_ID_SUCCESS,


})
export const DeleteImageByIdReduxFailed = () => ({
    type: actionTypes.DELETE_DATA_IMAGE_ID_FAILED,

})