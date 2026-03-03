import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const FormGroup = ({ label, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  const isPassword = label.toLowerCase() === "password";
  const inputType = isPassword
    ? show
      ? "text"
      : "password"
    : label.toLowerCase();

  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <div className="input-wrapper">
        <input
          type={inputType}
          id={label}
          name={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        {isPassword && (
          <span
            className="eye-icon"
            onClick={() => setShow((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {show ? <EyeClosed size={20} /> : <Eye size={20} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
