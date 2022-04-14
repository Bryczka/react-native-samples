import { FormikErrors } from 'formik';

export interface RegisterValues {
    email?: string;
    name?: string;
    surname?: string;
    captcha?: string;
    isRodoConfirm: boolean;
}

export const validate = ({ email, captcha, isRodoConfirm }: RegisterValues) => {
    const errors: FormikErrors<RegisterValues> = {};
    if (!email) {
        errors.email = 'Adres email jest wymagany';
    }
    if (!captcha) {
        errors.captcha = 'Kod CAPTCHA jest wymagany';
    }
    if (!isRodoConfirm) {
        errors.isRodoConfirm =
            'Zatwierdzenie informacji dotyczącej przetwarzania danych osobowych jest wymagane';
    }
    return errors;
};
