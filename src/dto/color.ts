export interface Color {
    id: string;
    hex: string;
    rgb: {r: number, g: number, b: number};
    hsl: {h: number, s: number, l: number};
    removeable: boolean;
}
