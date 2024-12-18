import {configureStore} from '@reduxjs/toolkit'
import usereducer from './slice/userSlice'
import adminreducer from './slice/adminSlice'

const store=configureStore({
    reducer:{
        user:usereducer,
        admin:adminreducer
    }
})
export default store