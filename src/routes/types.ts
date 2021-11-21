export type RootStackParamList = {
    Welcome: undefined;
    UserIdentification: undefined;
    Confirmation: { title: string, subtitle: string, buttonTitle:string, icon: string, nextScreen: string };
    Ranking: undefined;
    Question: { difficulty: number };
    MapBoard: undefined;
};