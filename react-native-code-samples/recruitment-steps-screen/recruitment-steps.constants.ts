import { ImageSourcePropType } from 'react-native';

export interface StepData {
    stepName: string;
    stepIcon: ImageSourcePropType;
    title: string;
    description: string;
}

export const data: StepData[] = [
    {
        stepName: 'KROK 1',
        stepIcon: require('../../../assets/steps/komputer_2.png'),
        title: 'Zaloguj się i złóż CV',
        description:
            'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
    },
    {
        stepName: 'KROK 2',
        stepIcon: require('../../../assets/steps/formalnosci_2.png'),
        title: 'Odwiedź dział HR',
        description:
            'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
        stepName: 'KROK 3',
        stepIcon: require('../../../assets/steps/zolnierz_2.png'),
        title: 'Ukończ szkolenie wstępne',
        description:
            'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.',
    },
];
