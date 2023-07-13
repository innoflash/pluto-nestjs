type BooleanFn = () => boolean;

export type AuthorizeFilter<T extends string> = Record<T, boolean | BooleanFn>;
