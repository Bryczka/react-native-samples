import React from 'react';
import {
    Text,
    VStack,
    FormControl,
    Input,
    HStack,
    KeyboardAvoidingView,
    theme,
    Checkbox,
} from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Platform } from 'react-native';
import { RootStackParamList } from '../../navigation/navigation-stack';
import { RedButton } from '../../common-components/buttons/red-button';
import { CaptchaComponent } from '../../common-components/captcha/captcha';
import useQueryGetCaptcha from '../../data-access-layer/queries/use-query-get-captcha';
import { RegisterValues, validate } from './register-form.validation';
import { StretchedScrollView } from '../../common-components/containers/stretched-scroll-view';
import { BlackTitle } from '../../common-components/texts/titles/black-title';
import { BlackText } from '../../common-components/texts/normal-texts/black-text';
import { RedLinkPartialButton } from '../../common-components/buttons/red-link-partial-button';
import useMutationRegister from '../../data-access-layer/mutations/use-mutation-register';
import { UserModal } from '../../managers/modal-manager/user-modal';

interface RegisterFormProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterForm'>;
}

const initialLoginValues: RegisterValues = {
    email: undefined,
    name: undefined,
    surname: undefined,
    captcha: undefined,
    isRodoConfirm: false,
};

export const RegisterForm = ({ navigation }: RegisterFormProps) => {
    const { data, isLoading, isError, refetch, isRefetching } =
        useQueryGetCaptcha();

    const { mutate: registerMutation, isLoading: registerIsLoading } =
        useMutationRegister();

    return (
        <Formik
            initialValues={initialLoginValues}
            validate={validate}
            validateOnChange={false}
            onSubmit={(values) => {
                registerMutation({
                    email: values.email,
                    first_name: values.name,
                    last_name: values.surname,
                    captcha_solution: values.captcha || '',
                    captcha_key: data?.id_key || '',
                });
            }}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                setFieldValue,
            }) => (
                <VStack alignItems="center" paddingX="5">
                    <UserModal
                        isOpen={isError}
                        header="Wystąpił błąd"
                        contentText="Wystąpił błąd podczas pobierania danych z serwera. Odśwież lub sprawdź połączenie z internetem"
                        submitText="Odśwież"
                        onSubmit={() => refetch()}
                        onClose={() => navigation.navigate('StartScreen')}
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <StretchedScrollView>
                            <BlackTitle>
                                Witaj w aplikacji rekrutacyjnej
                            </BlackTitle>
                            <BlackText>
                                Wypełnienie poniższego formularza to pierwszy
                                krok w kierunku uzyskania pracy
                            </BlackText>
                            <FormControl
                                isRequired
                                isInvalid={'email' in errors}
                                paddingBottom="2"
                            >
                                <FormControl.Label>
                                    Adres email
                                </FormControl.Label>
                                <Input
                                    placeholder="adam.nowak@gmail.com"
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    size="lg"
                                    _focus={{ borderColor: theme.colors.black }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.email}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={'name' in errors}
                                paddingBottom="2"
                            >
                                <FormControl.Label>
                                    Imię (opcjonalnie)
                                </FormControl.Label>
                                <Input
                                    placeholder="Adam"
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                    size="lg"
                                    _focus={{ borderColor: theme.colors.black }}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.name}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={'surname' in errors}
                                paddingBottom="2"
                            >
                                <FormControl.Label>
                                    Nazwisko (opcjonalnie)
                                </FormControl.Label>
                                <Input
                                    placeholder="Nowak"
                                    onChangeText={handleChange('surname')}
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
                                isInvalid={'captcha' in errors}
                                paddingBottom="2"
                            >
                                <FormControl.Label>Kod</FormControl.Label>
                                <HStack>
                                    <Input
                                        placeholder="0000"
                                        onChangeText={handleChange('captcha')}
                                        value={values.captcha}
                                        size="lg"
                                        keyboardType="number-pad"
                                        _focus={{
                                            borderColor: theme.colors.black,
                                        }}
                                        flex="1"
                                    />
                                    <CaptchaComponent
                                        image={data?.image}
                                        isRefetching={isRefetching || isLoading}
                                        refetch={refetch}
                                    />
                                </HStack>
                                <FormControl.ErrorMessage>
                                    {errors.captcha}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={'isRodoConfirm' in errors}
                                paddingBottom="2"
                            >
                                <HStack alignItems="center">
                                    <Checkbox
                                        accessibilityLabel="Rodo checkbox"
                                        onChange={(e) =>
                                            setFieldValue('isRodoConfirm', e)
                                        }
                                        value="isRodoConfirm"
                                        colorScheme="buttonRed"
                                    />
                                    <Text paddingLeft="5" textAlign="center">
                                        {'Zapoznałem/am się z '}
                                        <Text
                                            color={theme.colors.red[600]}
                                            onPress={() =>
                                                navigation.navigate('RodoView')
                                            }
                                        >
                                            informacją dotyczącą przetwarzania
                                            danych osobowych
                                        </Text>
                                    </Text>
                                </HStack>
                                <FormControl.ErrorMessage>
                                    {errors.isRodoConfirm}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <RedButton
                                onPress={handleSubmit}
                                isLoading={registerIsLoading}
                            >
                                Utwórz konto
                            </RedButton>
                            <RedLinkPartialButton
                                nonClickableLabel="Posiadasz już konto? "
                                onPress={() => navigation.navigate('LoginForm')}
                            >
                                Zaloguj się
                            </RedLinkPartialButton>
                        </StretchedScrollView>
                    </KeyboardAvoidingView>
                </VStack>
            )}
        </Formik>
    );
};
