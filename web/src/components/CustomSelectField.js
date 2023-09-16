import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export default function CustomSelectField({
  name,
  label,
  register,
  rules = {},
  error,
  watch,
  options,
  multiple = false,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
      <Select
        id={`outlined-adornment-${name}`}
        input={<OutlinedInput label={label} />}
        {...register(name, rules)}
        sx={{
          borderRadius: 0,
        }}
        multiple={multiple}
        value={watch ? watch : multiple ? [] : ""}
        error={Boolean(error)}
        required={rules.required}
      >
        {watch === "" && (
          <MenuItem disabled value="">
            {label}
          </MenuItem>
        )}
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}
