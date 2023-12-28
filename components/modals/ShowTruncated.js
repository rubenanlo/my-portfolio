const ShowTruncated = ({ value, isVisible, mousePosition = 0 }) => (
  <>
    {value && isVisible && (
      <div
        className="fixed text-xs text-gray-600 rounded-md shadow-md bg-white p-2 z-10"
        style={{
          left: `${mousePosition.x + 8}px`,
          top: `${mousePosition.y + 30}px`,
        }}
      >
        <>{value}</>
      </div>
    )}
  </>
);

export default ShowTruncated;
