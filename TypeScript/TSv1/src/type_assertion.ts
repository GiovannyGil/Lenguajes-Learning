// TYPE ASSERTIONS - transformacion o conversion de tipos "apis"

let channel : any = 'Giovanny';
let ChannelStr = <string>channel;
let ChannelStr2 = channel as string;


//ejem 2
const myCanvas = document.getElementById('main') as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById('main');