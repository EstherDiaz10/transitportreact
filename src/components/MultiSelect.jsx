import Select from 'react-select';

export default function MultiSelect({ options, value, onChange }) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti
      isSearchable
      placeholder="Selecciona operarios"
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: '0.75rem', // <-- aquí pones el borde redondeado
        })
      }}
    />
  );
}