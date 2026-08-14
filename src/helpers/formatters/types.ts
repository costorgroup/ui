export type TGetInitialsOptions = {
  max?: number;
};

export type TGetInitials = (value?: string | null, options?: TGetInitialsOptions) => string;
