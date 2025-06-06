import { Form } from "react-bootstrap";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAnswers } from '../store';

/**
 * 텍스트 입력 컴포넌트 (일반 텍스트, 금액, 퍼센트 입력 지원)
 * @param {string} label - 라벨 텍스트 (현재 사용되지 않음)
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @param {string} type - 입력 타입 ('text', 'money', 'percent')
 * @param {string} qid - 질문 ID
 * @param {string} answer - 기본 입력값
 */
function TextFeild({ label, placeholder, type, qid, answer }) {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    // 입력값 변경 처리 함수
    const processInputValue = (rawValue) => {
        switch (type) {
            case 'money':
                return processMoney(rawValue);
            case 'percent':
                return processPercent(rawValue);
            default:
                return { displayValue: rawValue, storeValue: rawValue };
        }
    };

    // 금액 입력 처리 (숫자만 허용, 콤마 추가)
    const processMoney = (value) => {
        const inputNumbers = value.replace(/\D/g, '');
        if (!inputNumbers) {
            return { displayValue: '', storeValue: '' };
        }
        const formattedValue = parseInt(inputNumbers, 10).toLocaleString();
        return { displayValue: formattedValue, storeValue: formattedValue };
    };

    // 퍼센트 입력 처리 (% 기호 자동 추가)
    const processPercent = (value) => {
        const displayValue = `${value}%`;
        return { displayValue: displayValue, storeValue: value };
    };

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const rawValue = e.target.value;
        const { displayValue, storeValue } = processInputValue(rawValue);
        
        setInputValue(displayValue);
        dispatch(setAnswers({ qid: qid, value: storeValue }));
    };

    return (
        <Form.Group className="mb-1">
            <Form.Control
                placeholder={placeholder}
                value={answer ? answer : inputValue}
                style={{ fontSize: '0.9rem' }}
                onChange={handleInputChange}
            />
        </Form.Group>
    );
}

export default TextFeild;