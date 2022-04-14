import React from 'react';
import { FormControl, Select } from 'native-base';
import { useFormikContext } from 'formik';
import { SectionTitle } from '../../../common-components/texts/section-title';
import { RecruitmentValues } from '../recruitment.validation';

//TODO: Do pobrania z API

const provinces = [
    { label: 'Śląskie', value: 'sl' },
    { label: 'Mazowieckie', value: 'maz' },
    { label: 'Małopolskie', value: 'mał' },
    { label: 'Pomorskie', value: 'pom' },
    { label: 'Opolskie', value: 'op' },
];

const districts = [
    { label: 'Pow1', value: 'pow1' },
    { label: 'Pow2', value: 'pow2' },
    { label: 'Pow3', value: 'pow3' },
    { label: 'Pow4', value: 'pow4' },
    { label: 'Pow5', value: 'pow5' },
];

const communities = [
    { label: 'Gm1', value: 'gm1' },
    { label: 'Gm2', value: 'gm2' },
    { label: 'Gm3', value: 'gm3' },
    { label: 'Gm4', value: 'gm4' },
    { label: 'Gm5', value: 'gm5' },
];

export const RecruitmentPlaceSection = () => {
    const { values, errors, setFieldValue } =
        useFormikContext<RecruitmentValues>();
    return (
        <>
            <SectionTitle>Miejsce rekrutacji</SectionTitle>
            <FormControl
                isRequired
                isInvalid={'province' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Województwo</FormControl.Label>
                <Select
                    selectedValue={values.province}
                    placeholder="Wybierz województwo"
                    size="lg"
                    onValueChange={(item) => setFieldValue('province', item)}
                >
                    {provinces.map((province) => (
                        <Select.Item
                            key={province.value}
                            label={province.label}
                            value={province.value}
                        />
                    ))}
                </Select>
                <FormControl.ErrorMessage>
                    {errors.province}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
                isRequired
                isInvalid={'district' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Powiat</FormControl.Label>
                <Select
                    selectedValue={values.district}
                    placeholder="Wybierz powiat"
                    size="lg"
                    onValueChange={(item) => setFieldValue('district', item)}
                >
                    {districts.map((district) => (
                        <Select.Item
                            key={district.value}
                            label={district.label}
                            value={district.value}
                        />
                    ))}
                </Select>
                <FormControl.ErrorMessage>
                    {errors.district}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
                isRequired
                isInvalid={'community' in errors}
                paddingBottom="2"
            >
                <FormControl.Label>Gmina (dzielnica)</FormControl.Label>
                <Select
                    selectedValue={values.community}
                    placeholder="Wybierz gminę (dzielnicę)"
                    size="lg"
                    onValueChange={(item) => setFieldValue('community', item)}
                >
                    {communities.map((community) => (
                        <Select.Item
                            key={community.value}
                            label={community.label}
                            value={community.value}
                        />
                    ))}
                </Select>
                <FormControl.ErrorMessage>
                    {errors.community}
                </FormControl.ErrorMessage>
            </FormControl>
        </>
    );
};
