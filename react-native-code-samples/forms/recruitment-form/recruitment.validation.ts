import { FormikErrors } from 'formik';

const validatePesel = (personalNumber: string): boolean => {
    const monthWithCentury = Number(personalNumber.substring(2, 4));

    if (!monthWithCentury || monthWithCentury % 20 > 12) {
        return false;
    }

    const day = Number(personalNumber.substring(4, 6));
    if (!day || day < 1 || day > 31) {
        return false;
    }

    if (!/^[0-9]{11}$/u.test(personalNumber)) {
        return false;
    }

    const times = [1, 3, 7, 9];
    const digits = `${personalNumber}`
        .split('')
        .map((digit) => parseInt(digit, 10));

    const [dig11] = digits.splice(-1);

    const control =
        digits.reduce(
            (previousValue, currentValue, index) =>
                previousValue + currentValue * (times[index % 4] as number)
        ) % 10;

    return 10 - (control === 0 ? 10 : control) === dig11;
};

const phoneNumberRegex: RegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

export interface RecruitmentValues {
    name?: string;
    surname?: string;
    personalNumber?: string;
    birthDate: Date;
    province?: string;
    district?: string;
    community?: string;
    phoneNumber?: string;
}

export const validate = ({
    name,
    surname,
    personalNumber,
    birthDate,
    phoneNumber,
    province,
    district,
    community,
}: RecruitmentValues) => {
    const errors: FormikErrors<RecruitmentValues> = {};

    if (!name) {
        errors.name = 'Imię jest wymagane';
    }
    if (!surname) {
        errors.surname = 'Nazwisko jest wymagane';
    }
    if (!validatePesel(personalNumber!)) {
        errors.personalNumber = 'Pesel jest niepoprawny';
    }
    if (!birthDate) {
        errors.birthDate = 'Data urodzenia jest wymagana';
    }
    if (!province) {
        errors.province = 'Województwo jest wymagane';
    }
    if (!district) {
        errors.district = 'Powiat jest wymagany';
    }
    if (!community) {
        errors.community = 'Gmina jest wymagana';
    }
    if (!phoneNumberRegex.test(phoneNumber!)) {
        errors.phoneNumber = 'Numer telefonu jest niepoprawny';
    }

    return errors;
};
