import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { mask } from 'remask';
import { Container, InputStyle, Label, Legend } from './styles';

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  masks?: string[];
  label?: string | null;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange, masks } = props;

    if (masks) {
      e.currentTarget.value = mask(e.currentTarget.value, masks);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Container>
      {props.label && (
        <Label>
          {props.label}
          {props.required && <Legend>*</Legend>}
        </Label>
      )}
      <InputStyle {...props} ref={ref} error={Boolean(props.error)} onChange={handleChange} />
      {props.error && (
        <Legend>
          <AiOutlineInfoCircle />
          {props.error}
        </Legend>
      )}
    </Container>
  );
});

export { Input };
