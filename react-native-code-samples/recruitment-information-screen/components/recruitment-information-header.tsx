import React from 'react';
import { Box, Image } from 'native-base';
import { WhiteText } from '../../../common-components/texts/white-text';

export const RecruitmentInformationHeader = () => (
    <Box height="25%" justifyContent="center">
        <Image
            source={require('../../../../assets/background/soldier_3.jpg')}
            position="absolute"
            alt="Background image"
            height="100%"
        />
        <WhiteText fontSize="xl">Co warto wiedzieć?</WhiteText>
    </Box>
);
