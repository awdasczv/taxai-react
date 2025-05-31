import DropDown from './DropDown';
import TextFeild from './TextFeild';

function InputForm({feild}) {
    if(feild.type === 'dropdown') {
        return <DropDown dropdownOptions={feild.options} placeholder={feild.placeholder} />
    }
    if(feild.type === 'text') {
        return <TextFeild placeholder={feild.placeholder} onlydigits={false} />
    }
    if(feild.type === 'number') {
        return <TextFeild placeholder={feild.placeholder} onlydigits={true} />
    }
    return (
        <p>Invalid field type</p>
    )
}

export default InputForm;