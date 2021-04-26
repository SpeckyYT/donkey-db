type parsedData = {
    key:string
    data:any
}

export = class DonkeyDB {
    constructor(file:string)
    save(key:string, data:any):boolean
    get(key:string):any
    fetch():object
    clean():void
    readDB():string[]
    path():string
    static filename(file:string):string
    static parseSingle(data:string, parse:boolean):parsedData
}
