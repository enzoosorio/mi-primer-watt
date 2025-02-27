export type BentoPhoto = {
    src: string;
    aspectRatio: Aspect;
    alt: string;
    width: number;
    height: number;
};

export type Aspect = "Wide" | "Tall" | "Square";