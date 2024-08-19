import axios from "../axios"

const HandleLogin = (data) => {
    return axios.post('/api/login', data)
}

const GetAllArrayGenderAndRole = () => {
    return axios.get('/api/get-all-array-gender-and-role')
}

const SaveDataManagerUser = (data) => {
    return axios.post('/api/save-data-manager-user', data)
}
const GetDataActive = () => {
    return axios.get('/api/get-data-active-allcodes')
}
const SaveDataACategories = (data) => {
    return axios.post('/api/save-data-categories', data)
}
const GetAllDataUserService = () => {
    return axios.get('/api/get-all-data-user')
}
const GetDataUserById = (id) => {
    return axios.get(`/api/get-data-user-by-id?id=${id}`, { id: id })
}
const UpdateDataUserById = (data) => {
    return axios.post(`/api/update-data-user-by-id`, data)
}
const DeleteDataUserById = (id) => {
    return axios.post(`/api/delete-data-user-by-id?id=${id}`, { id: id })
}
const GetAllDataCategories = () => {
    return axios.get(`/api/get-all-data-categories`)
}
const GetDataCategoriesById = (id) => {
    return axios.get(`/api/get-data-categories-by-id?id=${id}`, { id: id })
}
const UpdateDataCategoriesById = (data) => {
    return axios.post(`/api/update-data-categories-by-id`, data)
}
const DeleteDataCategoriesById = (id) => {
    return axios.post(`/api/delete-data-categories-by-id?id=${id}`, { id: id })
}
const GetDataDiscountLastColor = () => {
    return axios.get(`/api/get-data-discount-last-color`,)
}
const SaveDataProduct = (data) => {
    return axios.post(`/api/save-data-product`, data)
}
const GetAllDataProduct = () => {
    return axios.get(`/api/get-all-data-product`,)
}
const SaveDataColorProduct = (data) => {
    return axios.post(`/api/save-data-color-product`, data)
}
const SaveDataImageProduct = (data) => {
    return axios.post(`/api/save-data-image-product`, data)
}
const GetDataImageProductByIdProduct = (id) => {
    return axios.get(`/api/get-data-by-image-product-and-color?id=${id}`, { id: id })
}
const GetDataProductNew = () => {
    return axios.get(`/api/get-all-data-product-new`,)
}
const GetAllDataCategoriesProduct = () => {
    return axios.get(`/api/get-all-data-categories-product`,)
}
const GetAllDataCategoriesProductById = (id) => {
    return axios.get(`/api/get-all-data-categories-product-by-id?id=${id}`, { id: id })
}
const GetIdByHex = (hex) => {
    return axios.get(`/api/get-id-by-hexcolor?hex=${hex}`, { hex: hex })
}
const GetAllDataProductColorById = (id) => {
    return axios.get(`/api/get-all-data-product-color-by-id?id=${id}`, { id: id })
}
const GetNameColorByHex = (hex) => {
    return axios.get(`/api/get-name-color-by-hex?hex=${hex}`, { hex: hex })
}
const SaveDataMarkDown = (data) => {
    return axios.post(`/api/save-data-markdown`, data)
}
const AddToCart = (data) => {
    return axios.post(`/api/add-to-cart`, data)
}
const ShowAllDataCartByUserId = (id) => {
    return axios.get(`/api/show-all-cart-by-user-id?id=${id}`, { id: id })
}
const PlusProductCart = (data) => {
    return axios.post(`/api/plus-product-cart`, data)
}
const MinusProductCart = (data) => {
    return axios.post(`/api/minus-product-cart`, data)
}
const DeleteByIdProductCart = (id) => {
    return axios.post(`/api/delete-by-id-product-cart?id=${id}`, { id: id })
}
const PatientBookingAppointmentService = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const VetifyEmailAppointmentService = (data) => {
    return axios.post(`/api/vetify-email-appointment`, data)
}
const GetAllPriceAllcode = () => {
    return axios.get(`/api/get-data-price-allcode`)
}
const GetDataYMl = (id) => {
    return axios.get(`/api/get-data-you-maybe-like?id=${id}`, { id: id })
}
const DeleteProductById = (id) => {
    return axios.post(`/api/delete-data-product-id?id=${id}`, { id: id })
}
const UpdateDataProductId = (data) => {
    return axios.post(`/api/update-data-product-id`, data)
}
const UpdateDataImageId = (data) => {
    return axios.post(`/api/update-data-image-id`, data)
}
const UpdateDataColorId = (data) => {
    return axios.post(`/api/update-data-color-id`, data)
}
const DeleteDataColorId = (id) => {
    return axios.post(`/api/delete-data-color-id?id=${id}`, { id: id })
}
const DeleteDataImageId = (id) => {
    return axios.post(`/api/delete-data-image-id?id=${id}`, { id: id })
}

export {
    GetAllArrayGenderAndRole, HandleLogin, SaveDataManagerUser, GetDataActive, SaveDataACategories,
    GetAllDataUserService, GetDataUserById, UpdateDataUserById, DeleteDataUserById, GetAllDataCategories,
    GetDataCategoriesById, UpdateDataCategoriesById, DeleteDataCategoriesById, GetDataDiscountLastColor,
    SaveDataProduct, GetAllDataProduct, SaveDataColorProduct, SaveDataImageProduct, GetDataImageProductByIdProduct,
    GetDataProductNew, GetAllDataCategoriesProduct, GetAllDataCategoriesProductById, GetIdByHex, GetAllDataProductColorById,
    GetNameColorByHex, SaveDataMarkDown, AddToCart, ShowAllDataCartByUserId, PlusProductCart, MinusProductCart, DeleteByIdProductCart,
    PatientBookingAppointmentService, VetifyEmailAppointmentService, GetAllPriceAllcode, GetDataYMl, DeleteProductById, UpdateDataProductId, UpdateDataImageId,
    UpdateDataColorId, DeleteDataImageId, DeleteDataColorId
}