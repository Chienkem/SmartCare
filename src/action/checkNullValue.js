export const checkNullValue = (object) => {
    const value = Object.values(object);
    if(value.length === 0){
        return true
    }
    else{
        for (let i = 0; i < value.length; i++) {
            if (value[i] === null ) {
                return true;
            }
        }
        return false;
    }
}