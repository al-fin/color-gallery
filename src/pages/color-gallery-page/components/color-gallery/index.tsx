import { Color } from "dto/color";
import "./style.scss";

interface ColorGalleryProps {
  colors: Color[];
  removeColor: (id: string) => void;
}

function ColorGallery({ colors, removeColor }: ColorGalleryProps) {
  return (
    <div className="gallery">
      {colors.map((color) => (
        <div className="gallery-item" key={color.id}>
          <div className="color" style={{ background: color.hex }}></div>
          <div className="bottom">
            <h5 className="text">{color.hex}</h5>
            {color.removeable && (
              <button
                className="remove-button"
                onClick={() => removeColor(color.id)}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorGallery;
