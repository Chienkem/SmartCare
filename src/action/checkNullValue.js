export const checkNullValue = (object) => {
    const value = Object.values(object);
    console.log(object)
    if(value.length === 0){
        return true
    }
    else if(true){
        for (let i = 0; i < value.length; i++) {
            if (value[i] === null || value[i]==="") {
                return true;
            }
        }
        return false;
    }
}