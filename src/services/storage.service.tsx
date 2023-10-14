const setObject = (_key:any, _data:any) => {
    localStorage.setItem(_key, (JSON.stringify(_data)));
};

const getObject = (_key:string) => {
    let _data: string | null = localStorage.getItem(_key);

    try {
        if(_data !== null){
            return JSON.parse(_data);
        }
        
    } catch (e) {
        return {};
    }
};

const purgeData = (_key:any) => {
    return localStorage.removeItem(_key);
}

const clear = () => {
    return localStorage.clear();
}

export {
    setObject,
    getObject,
    purgeData,
    clear,
};