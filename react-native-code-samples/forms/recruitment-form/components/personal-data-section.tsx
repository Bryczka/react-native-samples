import React from 'react';
import { FormControl, Input, theme } from 'native-base';
import { useFormikContext } from 'formik';
import { SectionTitle } from '../../../common-components/texts/section-title';
import { DateTimePicker } from '../../../common-components/date-time-picker/date-time-picker';
import { RecruitmentValues } from '../recruitment.validation';

export const PersonalDataSection = () => {
    const { values, errors, setFieldValue } =
        useFormikContext<RecruitmentValues>();
    return (
        <>
            <SectionTitle>Dane osobowe</SectionTitle>
            <FormControl
                isRequired
                isInvalid={'name' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Imię</FormControl.Label>
                <Input
                    placeholder="Adam"
                    onChangeText={(e) => setFieldValue('name', e)}
                    value={values.name}
                    size="lg"
                    _focus={{ borderColor: theme.colors.black }}
                />
                <FormControl.ErrorMessage>
                    {errors.name}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
                isRequired
                isInvalid={'surname' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Nazwisko</FormControl.Label>
                <Input
                    placeholder="Nowak"
                    onChangeText={(e) => setFieldValue('surname', e)}
                    value={values.surname}
                    size="lg"
                    _focus={{ borderColor: theme.colors.black }}
                />
                <FormControl.ErrorMessage>
                    {errors.surname}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
                isRequired
                isInvalid={'personalNumber' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Pesel</FormControl.Label>
                <Input
                    placeholder="00000000000"
                    onChangeText={(e) => setFieldValue('personalNumber', e)}
                    value={values.personalNumber}
                    size="lg"
                    _focus={{ borderColor: theme.colors.black }}
                />
                <FormControl.ErrorMessage>
                    {errors.personalNumber}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
                isRequired
                isInvalid={'birthDate' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Data urodzenia</FormControl.Label>
                <DateTimePicker values={values} />
                <FormControl.ErrorMessage>
                    {errors.personalNumber}
                </FormControl.ErrorMessage>
            </FormControl>
        </>
    );
};
