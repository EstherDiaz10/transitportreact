import Select from 'react-select';

export default function MultiSelect({ options, value, onChange, placeholder, isDisabled}) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isSearchable
      placeholder={placeholder}
      isDisabled={isDisabled}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: '0.75rem',
        })
      }}
    />
  );
}