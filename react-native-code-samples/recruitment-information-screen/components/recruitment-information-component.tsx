import {
    HStack,
    useTheme,
    ChevronDownIcon,
    Pressable,
    Text,
} from 'native-base';
import React, { useRef } from 'react';
import { Animated } from 'react-native';

interface RecruitmentInformation {
    question: string;
    answer: string;
}

interface RecruitmentInformationProps {
    recruitmentInformation: RecruitmentInformation;
}

export const RecruitmentInformationComponent = ({
    recruitmentInformation,
}: RecruitmentInformationProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;
    const arrowAnim = useRef(new Animated.Value(0)).current;

    const handleOpenAnim = () => {
        Animated.timing(heightAnim, {
            toValue: 500,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setIsOpen(true);
            Animated.timing(arrowAnim, {
                toValue: 180,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleCloseAnim = () => {
        Animated.timing(heightAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setIsOpen(false);
            Animated.timing(arrowAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    };
    const theme = useTheme();

    return (
        <Pressable
            onPress={() => {
                if (!isOpen) {
                    handleOpenAnim();
                } else {
                    handleCloseAnim();
                }
            }}
            backgroundColor={theme.colors.white}
            _pressed={{ background: theme.colors.warmGray[100] }}
        >
            <HStack
                padding="3"
                alignItems="center"
                textAlign="center"
                borderBottomWidth="1"
                borderBottomColor={theme.colors.warmGray[300]}
            >
                <Text width="90%">{recruitmentInformation.question}</Text>
                <Animated.View
                    style={{
                        width: '10%',
                        alignItems: 'center',
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
                    <ChevronDownIcon size="4" />
                </Animated.View>
            </HStack>
            <Animated.View
                style={{
                    maxHeight: heightAnim,
                    overflow: 'hidden',
                    backgroundColor: theme.colors.gray[100],
                }}
            >
                <Text padding="3" textAlign="justify">
                    {recruitmentInformation.answer}
                </Text>
            </Animated.View>
        </Pressable>
    );
};
