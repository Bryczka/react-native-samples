import { Box, Image, ScrollView } from 'native-base';
import React from 'react';
import { RedText } from '../../common-components/texts/red-text';
import { WhiteText } from '../../common-components/texts/white-text';
import { StepComponent } from './components/step-component';
import { data } from './recruitment-steps.constants';

export const RecruitmentSteps = () => (
    <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <Image
            alt="Background image"
            source={require('../../../assets/face_2.png')}
            position="absolute"
            size="full"
        />
        <Box paddingTop="5">
            <RedText fontSize="4xl">Zostań Pracownikiem</RedText>
            <WhiteText>w naszej firmie</WhiteText>
        </Box>
        {data.map((value) => (
            <Box paddingX="2" paddingTop="5" key={value.title}>
                <StepComponent stepData={value} />
            </Box>
        ))}
    </ScrollView>
);
