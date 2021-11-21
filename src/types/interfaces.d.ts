interface iOption {
    alternative: string;
    is_correct: boolean;
}

interface iQuestion {
    title: string;
    difficulty: number;
    options: iOption[]
}