import { setUserInfo } from "../../utils/local-storage";
import { baseApi } from "./baseApi"

const AUTH_URL = '/auth'

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                data: loginData,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = (await queryFulfilled).data;
                    setUserInfo({ accessToken: result.accessToken });
                } catch (error) {
                }
            },
        }),
        patientSignUp: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                data,
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
        doctorSignUp: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                data,
            }),
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: 'POST',
                data,
            }),
        }),
        resetConfirm: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password/confirm`,
                method: 'POST',
                data,
            }),
        }),
        verifyOtp: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/verify-otp`,
                method: 'POST',
                data,
            }),
        }),
        sendOtp: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/send-otp`,
                method: 'POST',
                data,
            }),
        }),
        forgotPass: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/forgot-pass`,
                method: 'POST',
                data,
            }),
        }),
        recoverPass: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/recover-pass`,
                method: 'POST',
                data,
            }),
        }),
    })
})

export const { 
    useUserLoginMutation, 
    useDoctorSignUpMutation, 
    usePatientSignUpMutation,
    useResetPasswordMutation, 
    useResetConfirmMutation,
    useVerifyOtpMutation,
    useSendOtpMutation,
    useForgotPassMutation,
    useRecoverPassMutation,
    useLogoutMutation,
} = authApi;