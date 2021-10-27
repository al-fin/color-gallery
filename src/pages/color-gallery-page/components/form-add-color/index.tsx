import React from "react";
import { useColor } from "contexts/color";
import { hexToHSL, hexToRGB } from "utils/color";
import { Color } from "dto/color";
import { generateUUID } from "utils/uuid";
import "./style.scss";

function FormAddColor() {
  const { dispatch } = useColor();
  const [hex, setHex] = React.useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const color: Color = {
        id: generateUUID(),
        hex: hex,
        rgb: hexToRGB(hex),
        hsl: hexToHSL(hex),
        removeable: true,
      };

      dispatch({
        type: "ADD",
        color: color,
      });

      setHex("");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label>New Color :</label>
      <input
        type="text"
        placeholder="#000 or #000000"
        value={hex}
        onChange={(e) => {
          if (e.target.value.length <= 7) {
            setHex(e.target.value);
          }
        }}
      />
      <button type="submit">ADD</button>
    </form>
  );
}

export default FormAddColor;
