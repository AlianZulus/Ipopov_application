import React from 'react';
import styles from './PayModal.module.css';

interface InputPayProps {
    placeholder: string;
    width: string;
    maxLength?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name?: string;
    inputMode?: any;
    pattern?: string;

}

export const InputPay: React.FC<InputPayProps> = ({
                                                      placeholder,
                                                      width,
                                                      maxLength,
                                                      value,
                                                      onChange,
                                                      type,
                                                      name,
                                                      inputMode,
                                                      pattern,
                                                  }) => {
    return (
        <div className={styles.containerInput} style={{ width }}>
            <input
                type={type}
                name={name}
                className={styles.inputStyle}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                inputMode={inputMode}
                pattern={pattern}
            />
        </div>
    );
};
