function decodeFsd(text: string): any {
    let fsdpackage: any = {
        command: "",
        destination: "",
        source: "",
        data: ""
    };
    let regex = /(^...)(.*?):(.*?):(.*)/gm;
    let result = regex.exec(text);
    if(result !== null) {
        fsdpackage['command']=result[1];
        fsdpackage['destination']=result[2];
        fsdpackage['source']=result[3];
        fsdpackage['data']=result[4];
        return fsdpackage;
    } else {
        return null;
    }
}

// console.log(decodeFsd("#AP(callsign):SERVER:(network ID):(password):(num1):(protocol version):(num2):(full name ICAO)"));