const path = require('path');
const fs = require('fs');

const SEP = '=';
const NL = '\0\b\f\r\n';
const NNL = '\r\n';

class DonkeyDB {
    #filename;

    constructor(file){
        this['#filename'] = DonkeyDB.filename(file);

        if(!fs.existsSync(this.path())){
            fs.writeFileSync(this.path(), '');
        }else{
            this.clean();
        }
    }

    save(key, data){
        if(typeof key != 'string') return false;
        key = key.replace(SEP,'').trim();
        if(!key) return false;
        try{
            fs.appendFileSync(
                this.path(),
                `${key}${SEP}${JSON.stringify(data)}`.replace(NL,NNL) + NL,
            );
            return true;
        }catch{
            return false;
        }
    }

    get(key){
        if(typeof key != 'string' || !key) return undefined;
        const db = fs.readFileSync(this.path(), { encoding: 'utf-8' })
        .split(NL)
        .reverse();
        for(const item of db){
            const parsed = DonkeyDB.parseSingle(item, false);
            if(parsed)
                if(parsed.key == key)
                    return DonkeyDB.parseSingle(item, true).data;
        }
    }

    has(key){
        if(typeof key != 'string' || !key) return undefined;
        const db = fs.readFileSync(this.path(), { encoding: 'utf-8' })
        .split(NL);
        for(const item of db){
            const parsed = DonkeyDB.parseSingle(item, false);
            if(parsed)
                if(parsed.key == key)
                    return true;
        }
        return false;
    }

    fetch(){
        const db = fs.readFileSync(this.path(), { encoding: 'utf-8' })
        .split(NL);
        const data = {};
        for(const item of db){
            const parsed = DonkeyDB.parseSingle(item, true);
            if(parsed) data[parsed.key] = parsed.data;
        }
        return data;
    }

    clean(){
        const db = fs.readFileSync(this.path(), { encoding: 'utf-8' })
        .split(NL);
        const currentKeys = [];
        const newDB = db
        .reverse()
        .filter(full => {
            const parsed = DonkeyDB.parseSingle(full, false);
            if(!full || !parsed) return false;
            if(currentKeys.includes(parsed.key)) return false;
            return currentKeys.push(parsed.key);
        })
        .reverse()
        .join(NL) + (currentKeys.length ? NL : '');
        return fs.writeFileSync(this.path(), newDB);
    }

    path(){
        return this['#filename'];
    }

    static filename(string){
        const dbpath = typeof string == 'string' ? path.parse(string) : {};
        const newPath = path.format({
            name: dbpath.name || 'db',
            ext: dbpath.ext || '.donk',
            dir: dbpath.dir,
            root: dbpath.root,
        });
        return path.isAbsolute(newPath) ?
            newPath :
            path.join(process.cwd(), newPath);
    }

    static parseSingle(string, parse){
        if(typeof string != 'string' || !string) return null;
        const index = string.indexOf(SEP);
        if(index < 0) return { key: string, data: null }
        const key = string.slice(0, index);
        const data = string.slice(index+1, Infinity);
        const dataParsed = parse ? JSON.parse(data) : data;
        return {
            key: key,
            data: dataParsed,
        }
    }
}

module.exports = DonkeyDB;
