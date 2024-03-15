import XtxGuess from '@/components/XtxGuess.vue';
import { GlobalComponents } from './../types/component.d';
import XtxSwiper from './XtxSwiper.vue';
import XtxGuess from './XtxGuess.vue';
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper;
    XtxGuess: typeof XtxGuess;
  }
}

export type XtxGuessInstance = InstanceType<typeof XtxGuess>;
