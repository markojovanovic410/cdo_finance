export enum typeFade {
  FadeIn = "fadeIn",
  FadeBottonUp = "fadeBottomUp",
}

export class FadeInTypes {
  children: any;
  selectorClass: string;
  type: typeFade;
  checkPoint: number;
}
