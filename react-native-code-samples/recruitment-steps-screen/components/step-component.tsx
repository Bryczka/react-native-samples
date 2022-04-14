import {
    Box,
    HStack,
    useTheme,
    ChevronDownIcon,
    Pressable,
    Image,
    VStack,
} from 'native-base';
import React, { useRef } from 'react';
import { Animated, ImageSourcePropType } from 'react-native';
import { WhiteText } from '../../../common-components/texts/white-text';

interface StepData {
    stepName: string;
    stepIcon: ImageSourcePropType;
    title: string;
    description: string;
}

interface StepComponentProps {
    stepData: StepData;
}

export const StepComponent = ({ stepData }: StepComponentProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const theme = useTheme();
    const heightAnim = useRef(new Animated.Value(5)).current;
    const arrowAnim = useRef(new Animated.Value(0)).current;

    const handleOpenAnim = () => {
        Animated.timing(heightAnim, {
            toValue: 500,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setIsOpen(true);
        });
        Animated.timing(arrowAnim, {
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseAnim = () => {
        Animated.timing(heightAnim, {
            toValue: 5,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setIsOpen(false);
        });
        Animated.timing(arrowAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            onPress={() => {
                if (!isOpen) {
                    handleOpenAnim();
                } else {
                    handleCloseAnim();
                }
            }}
        >
            <VStack>
                <WhiteText fontSize="3xl" textAlign="left">
                    {stepData.stepName}
                </WhiteText>

                <Box
                    borderColor={theme.colors.red[700]}
                    borderWidth="2"
                    paddingX="3"
                    marginBottom="2"
                    paddingBottom="1"
                    overflow="hidden"
                >
                    <HStack alignItems="center">
                        <Image
                            marginY="2"
                            size="20"
                            source={stepData.stepIcon}
                            alt="step icon"
                            resizeMode="contain"
                        />
                        <Box backgroundColor="red" flex="1">
                            <WhiteText fontSize="xl">
                                {stepData.title}
                            </WhiteText>
                        </Box>
                    </HStack>
                    <Animated.View
                        style={{
                            maxHeight: heightAnim,
                            overflow: 'hidden',
                        }}
                    >
                        <WhiteText textAlign="justify" zIndex="-1">
                            {stepData.description}
                        </WhiteText>
                    </Animated.View>
                    <Box
                        backgroundColor={theme.colors.red[700]}
                        size="10"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="full"
                        alignSelf="center"
                    >
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        rotateX: arrowAnim.interpolate({
                                            inputRange: [0, 180],
                                            outputRange: ['0deg', '180deg'],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <ChevronDownIcon size="lg" />
                        </Animated.View>
                    </Box>
                </Box>
            </VStack>
        </Pressable>
    );
};
