declare module 'react-native-circular-slider' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  export interface CircularSliderProps {
    startAngle?: number;
    angleLength?: number;
    onUpdate?: (event: { startAngle: number; angleLength: number }) => void;
    segments?: number;
    strokeWidth?: number;
    radius?: number;
    gradientColorFrom?: string;
    gradientColorTo?: string;
    showClockFace?: boolean;
    clockFaceColor?: string;
    bgCircleColor?: string;
    style?: ViewStyle;
  }

  export default class CircularSlider extends Component<CircularSliderProps> {}
}
