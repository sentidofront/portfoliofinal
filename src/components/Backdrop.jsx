/* Flowers are fixed to the corner via pure CSS. Nothing else here now
   (motes / "rain" removed). */
export default function Backdrop() {
  return (
    <>
      <div className="contour-bg" />
      <div className="flowers-fixed" />
    </>
  );
}
