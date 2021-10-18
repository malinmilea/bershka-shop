import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';


const useAuth = (schema) => {
    const [loginData, setLoginData] = useState()
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(schema),
    });

    const submitData = (data) => setLoginData(data);

    const checkForErrors = useCallback((errors, show) => {
        if (typeof errors === 'object' && Object.keys(errors).length !== 0 && show) {
            for (const err in errors) {
                toast.warn(errors[err].message, {
                    position: toast.POSITION.TOP_LEFT
                })
            }
        }
    }, [])

    return {
        register: register,
        handSubmit: handleSubmit(submitData),
        reset: reset,
        errors: errors,
        submited: isSubmitSuccessful,
        checkErrors: checkForErrors,
        loginData: loginData
    }
}


export default useAuth;