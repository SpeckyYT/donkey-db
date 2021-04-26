type parsedData = {
    key:string
    data:any
}

export = class DumbDB {
    constructor(file:string)
    save(key:string, data:any):boolean
    get(key:string):any
    fetch():object
    clean():void
    path():string
    static filename(file:string):string
    static parseSingle(data:string, parse:boolean):parsedData
}
