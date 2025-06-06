import DropDown from './DropDown';
import TextFeild from './TextFeild';
import OxChoice from './OxChoice';
import DateFeild from './DateFeild';

function InputForm({feild,answer}) {
    
    if(feild.inputMethod === 'dropdown') {
        return <DropDown label={feild.label} dropdownOptions={feild.options} placeholder={feild.placeholder} qid={feild.qid} answer={answer} />
    }
    if(feild.inputMethod === 'money' || feild.inputMethod === 'percent' || feild.inputMethod === 'text') {
        return <TextFeild label={feild.label} placeholder={feild.placeholder} type={feild.inputMethod} qid={feild.qid} answer={answer} />
    }
    if(feild.inputMethod === 'oxChoice') {
        return <OxChoice label={feild.label} qid={feild.qid} answer={answer} />
    }
    if(feild.inputMethod === 'date') {
        return <DateFeild label={feild.label} qid={feild.qid} answer={answer} />
    }
    return (
        <p>Invalid field type</p>
    )
}

export default InputForm;