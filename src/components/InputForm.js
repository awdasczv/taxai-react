import DropDown from './DropDown';
import TextFeild from './TextFeild';
import OxChoice from './OxChoice';

function InputForm({feild}) {
    if(feild.inputMethod === 'dropdown') {
        return <DropDown dropdownOptions={feild.options} placeholder={feild.placeholder} />
    }
    if(feild.inputMethod === 'money' || feild.inputMethod === 'percent' || feild.inputMethod === 'text') {
        return <TextFeild placeholder={feild.placeholder} type={feild.inputMethod} />
    }
    if(feild.inputMethod === 'oxChoice') {
        return <OxChoice />
    }
    return (
        <p>Invalid field type</p>
    )
}

export default InputForm;