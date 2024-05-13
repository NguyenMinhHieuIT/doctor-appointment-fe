import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const PAT_URL = '/user'

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatient: build.query({
            query: () => ({
                url: `${PAT_URL}/me`,
                method: 'GET',               
            }),
            // providesTags: [tagTypes.patient]
        }),
        updatePatient: build.mutation({
            query: ({ data }) => ({
                url: `${PAT_URL}/update`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.patient]
        }),
        changePass: build.mutation({
            query: ({password, newPassword}) => ({
                url: `${PAT_URL}/change-pass`,
                method: 'POST',
                data: {password, newPassword},
            }),
        })
    })
})

export const { useGetPatientQuery, useUpdatePatientMutation, useChangePassMutation } = patientApi