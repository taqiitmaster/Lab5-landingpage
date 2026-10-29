/* Fixed ambient layer: fine grid + two slow aurora blobs. Pure CSS, no JS cost. */
export default function Background() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-blob bg-blob--violet" />
      <div className="bg-blob bg-blob--cyan" />
    </div>
  )
}
