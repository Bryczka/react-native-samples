import { Box, FlatList } from 'native-base';
import React from 'react';
import { RecruitmentInformationComponent } from './components/recruitment-information-component';
import { RecruitmentInformationHeader } from './components/recruitment-information-header';
import { faq } from './recruitment-information.constants';

export const RecruitmentInformationScreen = () => (
    <Box flex="1" justifyContent="space-around">
        <RecruitmentInformationHeader />
        <FlatList
            data={faq}
            renderItem={({ item }) => (
                <RecruitmentInformationComponent
                    recruitmentInformation={item}
                    key={item.question}
                />
            )}
        />
    </Box>
);
