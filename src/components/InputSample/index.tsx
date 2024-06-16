import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputSample: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isField={isField}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default InputSample;
