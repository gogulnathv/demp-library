import { NativeModules, Platform } from 'react-native';
// import {DEMPAPP} from "./DEMPAPP";

const LINKING_ERROR =
  `The package 'dempapp' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Dempapp = NativeModules.Dempapp
  ? NativeModules.Dempapp
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
export const DempConfig:{result?:number} = {};
export function multiply(a: number, b: number): Promise<number> {
  return Dempapp.multiply(a, b);
}
((a:number,b:number)=>{
  multiply(a, b).then(result=>{
    console.log(result);
    DempConfig['result']=result;
  })
})(33,23);
// export function init(){
//   DEMPAPP.init(Dempapp)
// }