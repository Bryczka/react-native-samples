import React from 'react';
import { FormControl, Input, theme } from 'native-base';
import { useFormikContext } from 'formik';
import { SectionTitle } from '../../../common-components/texts/section-title';
import { RecruitmentValues } from '../recruitment.validation';

export const ContactSection = () => {
    const { values, errors, setFieldValue } =
        useFormikContext<RecruitmentValues>();
    return (
        <>
            <SectionTitle>Kontakt</SectionTitle>
            <FormControl isInvalid={'phoneNumber' in errors} paddingBottom="2">
                <FormControl.Label>
                    Numer telefonu (opcjonalnie)
                </FormControl.Label>
                <Input
                    keyboardType="numeric"
                    placeholder="000-000-000"
                    onChangeText={(e) => setFieldValue('phoneNumber', e)}
                    value={values.phoneNumber}
                    size="lg"
                    _focus={{ borderColor: theme.colors.black }}
                />
                <FormControl.ErrorMessage>
                    {errors.phoneNumber}
                </FormControl.ErrorMessage>
            </FormControl>
        </>
    );
};
