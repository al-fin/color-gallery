import React from "react";
import { useColor } from "contexts/color";
import { Color } from "dto/color";
import FormAddColor from "./components/form-add-color";
import FormFilterColor from "./components/form-filter-color";
import ColorGallery from "./components/color-gallery";
import "./style.scss";

function ColorGalleryPage() {
  const { state, dispatch } = useColor();
  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const colors: Color[] = state
    /* 
      Sort by :
      1. higher red 
      2. higher green
      3. higher blue
    */
    .sort((a, b) => b.rgb.r - a.rgb.r || b.rgb.g - a.rgb.g || b.rgb.b - a.rgb.b)
    .filter((color) => {
      if (checkboxes.red && color.rgb.r <= 127) {
        return false;
      }
      if (checkboxes.green && color.rgb.g <= 127) {
        return false;
      }
      if (checkboxes.blue && color.rgb.b <= 127) {
        return false;
      }
      if (checkboxes.saturation && color.hsl.s <= 50) {
        return false;
      }

      return true;
    });

  function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  }

  function removeColor(id: string) {
    dispatch({
      type: "REMOVE",
      id: id,
    });
  }

  return (
    <div className="page">
      <h1 className="title">Color Gallery</h1>

      <FormAddColor />
      <FormFilterColor
        checkboxes={checkboxes}
        handleChangeCheckbox={handleChangeCheckbox}
      />

      <ColorGallery colors={colors} removeColor={removeColor} />
    </div>
  );
}

export default ColorGalleryPage;
