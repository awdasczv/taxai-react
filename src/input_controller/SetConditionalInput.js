function SetConditionalInput({conditionalFeild, selectedOptionStore}) {
    
    switch(conditionalFeild.condition) {
        case '취득 시 부동산 종류=재건축전 주택':
            const index = selectedOptionStore.findIndex(option => option.label === '취득 시 부동산 종류');
            if(index !== -1) {
                return selectedOptionStore[index].value === '재건축전 주택';
            }else return false;
        case '취득원인=상속':
            const index2 = selectedOptionStore.findIndex(option => option.label === '취득원인');
            if(index2 !== -1) {
                return selectedOptionStore[index2].value === '상속';
            }else return false;
        default:
            return false;
    }
}

export default SetConditionalInput;