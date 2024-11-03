import CrownUI from "./CrownUI";

const FourCrowns = ({ color, size = 96 }) => {
  const positions = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];
  const rotations = [135, 225, 45, 315];
  return (
    <>
      {positions.map((position, index) => (
        <CrownUI
          key={`crown-${index}`}
          {...{
            position,
            size,
            rotation: rotations[index],
            color,
          }}
        />
      ))}
    </>
  );
};

export default FourCrowns;
