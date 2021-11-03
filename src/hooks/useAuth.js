import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';


const useAuth = (schema) => {
    const [loginData, setLoginData] = useState()
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(schema),
    });

    const submitData = useCallback((data) => setLoginData(data), []);

    console.log('se randeaza', isSubmitSuccessful);

    const checkForErrors = useCallback((errors, show) => {
        console.log('e de la checkForErrors');
        if (typeof errors === 'object' && Object.keys(errors).length !== 0 && show) {
            for (const err in errors) {
                toast.warn(errors[err].message, {
                    position: toast.POSITION.TOP_LEFT
                })
            }
        }
    }, [])

    return {
        register: useCallback(register, []),
        handSubmit: handleSubmit(submitData),
        reset: useCallback(reset, []),
        errors: errors,
        submited: isSubmitSuccessful,
        checkErrors: checkForErrors,
        loginData: loginData
    }
}

export default useAuth;