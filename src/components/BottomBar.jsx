const BottomBar = ({ startSpin }) => {
  return (
    <section className="absolute bottom-0 left-0 w-full px-5 py-2 bg-black bg-opacity-50">
      <button onClick={startSpin}>Spin!</button>
    </section>
  );
};
export default BottomBar;
