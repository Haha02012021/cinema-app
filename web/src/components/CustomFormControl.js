import { FormControl, FormHelperText, TextField } from "@mui/material";

export default function CustomFormControl({
  fullWidth,
  name,
  label,
  type = "text",
  register,
  error,
  rules,
  inputProps,
  endAdornment,
  onKeyDown = () => {},
  fieldType = "input",
  disabled = false,
}) {
  return (
    <FormControl fullWidth={fullWidth}>
      {fieldType === "input" && (
        <TextField
          disabled={disabled}
          variant="outlined"
          required={rules.required}
          type={type}
          label={label}
          InputProps={{
            sx: (theme) => ({
              borderRadius: 0,
              backgroundColor: theme.palette.common.white,
            }),
            endAdornment: endAdornment,
          }}
          {...register(name, rules)}
          error={Boolean(error)}
          inputProps={inputProps}
          onKeyDown={onKeyDown}
        />
      )}
      {fieldType === "textarea" && (
        <TextField
          disabled={disabled}
          label={label}
          multiline
          rows={4}
          {...register(name, rules)}
          error={Boolean(error)}
          InputProps={{
            sx: (theme) => ({
              borderRadius: 0,
              backgroundColor: theme.palette.common.white,
            }),
          }}
        />
      )}
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}
