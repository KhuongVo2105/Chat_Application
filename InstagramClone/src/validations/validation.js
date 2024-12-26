import * as yup from 'yup';

export const verifyEmailSchema = yup.object({
  email: yup
    .string() // Đảm bảo giá trị là một chuỗi
    .email('Please enter a valid email address (e.g., example@gmail.com)') // Kiểm tra xem có phải email hợp lệ hay không
    .required('Please enter your email address'), // Đảm bảo không để trống trường email
});

export const signInScema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
