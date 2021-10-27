import { ColorProvider } from "contexts/color";
import ColorGalleryPage from "pages/color-gallery-page";

function App() {
  return (
    <ColorProvider>
      <ColorGalleryPage />
    </ColorProvider>
  );
}

export default App;
