import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

export const DOC_URL = '/doctor'

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query({
            query: (arg) => ({
                url: `${DOC_URL}`,
                method: 'GET',
                params: arg
            })
        }),
        getDoctor: build.query({
            query: (id) => ({
                url: `/user/me`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        getOneDoctor: build.query({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        updateDoctor: build.mutation({
            query: ({ data }) => ({
                url: `/user/update`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.doctor]
        })
    })
})

export const { 
    useGetDoctorsQuery,
    useGetDoctorQuery,
    useUpdateDoctorMutation,
    useGetOneDoctorQuery,
} = doctorApi