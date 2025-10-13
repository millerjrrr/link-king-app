declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: number;
  export default content;
}

declare global {
  type AntDesignIcons = AntDesignIcons;
}

declare module "react-native-reanimated" {
  export const withSequence: any;
  export const withSpring: any;
}
