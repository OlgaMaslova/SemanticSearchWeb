export type Message = {
    message: string;
};

export type Vocabulary = {
    text: string;
};

export type Embedding = {
    sentence: string;
    embeddings: number[];
};

export type SemanticResult = {
    top_answer: string;
    score: number;
};
