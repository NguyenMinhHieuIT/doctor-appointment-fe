import { baseApi } from "./baseApi";
const ADMIN_URL = '/admin';
const DOC_URL = '/doctor';
const PATIENT_URL = '/patient';
const APPOINT_URL = '/appoint'
export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        adminGetDoctor: build.query({
            query: (query) => ({
                url: `${ADMIN_URL}${DOC_URL}`,
                method: 'GET',
                params: query,
            })
        }),
        adminGetOneDoctor: build.query({
            query: (id) => ({
                url: `${ADMIN_URL}${DOC_URL}/${id}`,
                method: 'GET',
            })
        }),
        adminGetStatDoctor: build.query({
            query: () => ({
                url: `${ADMIN_URL}${DOC_URL}/stat/status`,
                method: 'GET',
            })
        }),
        adminCreateDoctor: build.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}${DOC_URL}`,
                method: 'POST',
                data: data,
            })
        }),
        adminUpdateDoctor: build.mutation({
            query: ({ data, id }) => ({
                url: `${ADMIN_URL}${DOC_URL}/${id}`,
                method: 'PATCH',
                data: data,
            })
        }),
        adminDeleteDoctor: build.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}${DOC_URL}/${id}`,
                method: 'DELETE',
            })
        }),



        adminGetPatient: build.query({
            query: (param) => ({
                url: `${ADMIN_URL}${PATIENT_URL}`,
                method: 'GET',
                params: param,
            })
        }),
        adminGetOnePatient: build.query({
            query: (id) => ({
                url: `${ADMIN_URL}${PATIENT_URL}/${id}`,
                method: 'GET',
            })
        }),
        adminCreatePatient: build.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}${PATIENT_URL}`,
                method: 'POST',
                data: data,
            })
        }),
        adminUpdatePatient: build.mutation({
            query: ({data, id}) => ({
                url: `${ADMIN_URL}${PATIENT_URL}/${id}`,
                method: 'PATCH',
                data: data,
            })
        }),
        adminDeletePatient: build.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}${PATIENT_URL}/${id}`,
                method: 'DELETE',
            })
        }),



        adminGetAppoint: build.query({
            query: (param) => ({
                url: `${ADMIN_URL}${APPOINT_URL}`,
                method: 'GET',
                params: param,
            })
        }),
        adminCreateAppoint: build.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}${APPOINT_URL}`,
                method: 'POST',
                data: data,
            })
        }),
        adminUpdateAppoint: build.mutation({
            query: (data, id) => ({
                url: `${ADMIN_URL}${APPOINT_URL}/${id}`,
                method: 'PATCH',
                data: data,
            })
        }),
        adminDeleteAppoint: build.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}${APPOINT_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        adminGetOneAppoint: build.query({
            query: (id) => ({
                url: `${ADMIN_URL}${APPOINT_URL}/${id}`,
                method: 'GET',
            })
        }),
        adminGetReview: build.query({
            query: (query) => ({
                url: `/review/admin`,
                method: 'GET',
                params: query
            })
        }),
        adminGetOneReview: build.query({
            query: (id) => ({
                url: `/review/admin/${id}`,
                method: 'GET',
            })
        })
        ,
        adminUpdateReview: build.mutation({
            query: ({ data, id }) => ({
                url: `/review/admin/${id}`,
                method: 'PATCH',
                data: data,
            })
        }),
        adminDeleteReview: build.mutation({
            query: (id) => ({
                url: `/review/${id}`,
                method: 'DELETE',
            })
        }),


    })
});

export const {
    useAdminGetDoctorQuery,
    useAdminGetOneDoctorQuery,
    useAdminGetStatDoctorQuery,
    useAdminCreateDoctorMutation,
    useAdminUpdateDoctorMutation,
    useAdminDeleteDoctorMutation,

    useAdminGetPatientQuery,
    useAdminGetOnePatientQuery,
    useAdminCreatePatientMutation,
    useAdminUpdatePatientMutation,
    useAdminDeletePatientMutation,

    useAdminGetAppointQuery,
    useAdminGetOneAppointQuery,
    useAdminCreateAppointMutation,
    useAdminUpdateAppointMutation,
    useAdminDeleteAppointMutation,

    useAdminGetReviewQuery,
    useAdminGetOneReviewQuery,
    useAdminUpdateReviewMutation,
    useAdminDeleteReviewMutation,
 } = adminApi;