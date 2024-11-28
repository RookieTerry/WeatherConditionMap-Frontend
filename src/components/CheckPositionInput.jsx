import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

export default function CheckPositionInput({ label, id, value, onValueChange }) {
  // const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // only allow numbers, dot and dash
    if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      onValueChange(inputValue);
      setError(false);
      setHelperText("");
    } else {
      setError(true);
      setHelperText("Invaild latitude or longitude input");
    }
  };

  return (
    <TextField
      id={id}
      error={error}
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      helperText={helperText}
    />
  );
}
CheckPositionInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
