import * as yup from 'yup';

export const schemaRegister = yup.object().shape({
    emailRegister: yup.string().email().required(),
    passRegister: yup.string().min(4).max(15).required(),
    repeatPassRegister: yup.string().oneOf([yup.ref("passRegister"), null])
});

export const schemaLogin = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
})