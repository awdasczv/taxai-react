import DropDown from './DropDown';
import TextFeild from './TextFeild';
import OxChoice from './OxChoice';
import DateFeild from './DateFeild';

/**
 * 입력 형태에 따라 적절한 컴포넌트를 렌더링하는 폼 컴포넌트
 * @param {Object} feild - 필드 정보 객체
 * @param {string} feild.inputMethod - 입력 방식 ('dropdown', 'money', 'percent', 'text', 'oxChoice', 'date')
 * @param {string} feild.label - 라벨 텍스트
 * @param {string} feild.placeholder - 플레이스홀더 텍스트
 * @param {string} feild.options - 드롭다운 옵션들
 * @param {string} feild.qid - 질문 ID
 * @param {string} answer - 답변값
 */
function InputForm({ feild, answer }) {
    // 입력 방식에 따른 컴포넌트 렌더링
    switch (feild.inputMethod) {
        case 'dropdown':
            return (
                <DropDown
                    label={feild.label}
                    dropdownOptions={feild.options}
                    placeholder={feild.placeholder}
                    qid={feild.qid}
                    answer={answer}
                />
            );
        
        case 'money':
        case 'percent':
        case 'text':
            return (
                <TextFeild
                    label={feild.label}
                    placeholder={feild.placeholder}
                    type={feild.inputMethod}
                    qid={feild.qid}
                    answer={answer}
                />
            );
        
        case 'oxChoice':
            return (
                <OxChoice
                    label={feild.label}
                    qid={feild.qid}
                    answer={answer}
                />
            );
        
        case 'date':
            return (
                <DateFeild
                    label={feild.label}
                    qid={feild.qid}
                    answer={answer}
                />
            );
        
        default:
            return <p>유효하지 않은 필드 타입입니다.</p>;
    }
}

export default InputForm;