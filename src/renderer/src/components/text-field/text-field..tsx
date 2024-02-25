import { ChangeEvent, ReactElement } from 'react';

import MaskedInput from 'react-text-mask';
import { TextInput } from './text-field.styles';

type Props = {
  mask?: (string | RegExp)[];
  name: string;
  value: string;
  placeholder: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  maxLength?: number;
  isMasked?: boolean;
};

export const TextField = ({
  mask,
  name,
  placeholder,
  value,
  label,
  id,
  isMasked,
  onChange,
}: Props): ReactElement => {
  if (!isMasked) {
    return (
      <TextInput
        value={value}
        placeholder={placeholder}
        label={label}
        onChange={onChange}
        name={name}
        id={id}
      />
    );
  }

  return (
    <MaskedInput
      mask={mask}
      guide={false}
      onChange={onChange}
      name={name}
      id={id}
      render={(ref, props) => (
        <TextInput
          value={value}
          placeholder={placeholder}
          label={label}
          {...props}
          inputRef={ref}
        />
      )}
    />
  );
};
