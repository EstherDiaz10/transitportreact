import Select from 'react-select';

export default function MultiSelect({ options, value, onChange, placeholder }) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isSearchable
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: '0.75rem',
        })
      }}
    />
  );
}