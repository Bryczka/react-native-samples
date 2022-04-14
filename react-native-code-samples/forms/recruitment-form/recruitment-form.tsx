import React from 'react';
import { VStack, HStack, KeyboardAvoidingView } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Platform } from 'react-native';
import { RedButton } from '../../common-components/buttons/red-button';
import { PersonalDataSection } from './components/personal-data-section';
import { RecruitmentPlaceSection } from './components/recruitment-place-section';
import { ContactSection } from './components/contact-section';
import { RecruitmentValues, validate } from './recruitment.validation';
import { StretchedScrollView } from '../../common-components/containers/stretched-scroll-view';
import { BlackTitle } from '../../common-components/texts/titles/black-title';
import { BlackText } from '../../common-components/texts/normal-texts/black-text';
import { NavigationBottomSignedInParamList } from '../../navigation/bottom-navigators/navigation-bottom-signed-in';

interface RecruitmentFormProps {
    navigation: NativeStackNavigationProp<
        NavigationBottomSignedInParamList,
        'RecruitmentForm'
    >;
}

const initialLoginValues: RecruitmentValues = {
    name: undefined,
    surname: undefined,
    personalNumber: undefined,
    birthDate: new Date(),
    province: undefined,
    district: undefined,
    community: undefined,
    phoneNumber: undefined,
};

export const RecruitmentForm = ({ navigation }: RecruitmentFormProps) => (
    <Formik
        initialValues={initialLoginValues}
        validate={validate}
        validateOnChange={false}
        onSubmit={() => {
            console.warn('Prześlij zgłoszenie');
        }}
    >
        {({ handleSubmit }) => (
            <VStack alignItems="center" paddingX="5">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <StretchedScrollView>
                        <VStack alignItems="center" paddingY="10">
                            <BlackTitle>
                                Witaj w aplikacji rekrutacyjnej
                            </BlackTitle>
                            <BlackText>
                                Wypełnij formularz, aby nasz rekruter potwierdzi
                                twoją tożsamość i przygotuje propozycję etatu
                            </BlackText>
                            <PersonalDataSection />
                            <RecruitmentPlaceSection />
                            <ContactSection />
                            <HStack width="full" justifyContent="space-around">
                                <RedButton
                                    width="40%"
                                    onPress={() => navigation.goBack()}
                                >
                                    Wróć
                                </RedButton>
                                <RedButton width="40%" onPress={handleSubmit}>
                                    Prześlij
                                </RedButton>
                            </HStack>
                        </VStack>
                    </StretchedScrollView>
                </KeyboardAvoidingView>
            </VStack>
        )}
    </Formik>
);
