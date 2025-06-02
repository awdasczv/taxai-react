import DropDown from './DropDown';
import TextFeild from './TextFeild';

function InputForm({feild}) {
    if(feild.inputMethod === 'dropdown') {
        return <DropDown dropdownOptions={feild.options} placeholder={feild.placeholder} />
    }
    if(feild.inputMethod === 'money' || feild.inputMethod === 'percent' || feild.inputMethod === 'text') {
        return <TextFeild placeholder={feild.placeholder} type={feild.inputMethod} />
    }
    return (
        <p>Invalid field type</p>
    )
}

export default InputForm;