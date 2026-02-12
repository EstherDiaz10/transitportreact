import Select from 'react-select';

export default function MultiSelect({ options, value, onChange, isDisabled }) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti
      isSearchable
      placeholder="Selecciona operarios"
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