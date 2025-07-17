import CrownUI from "./CrownUI";

const FourCrowns: React.FC<{
  color: `#{string}`;
  size?: number;
}> = ({ color, size = 96 }) => {
  const positions: Array<
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
  > = [
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
          position={position}
          size={size}
          rotation={rotations[index]}
          color={color}
        />
      ))}
    </>
  );
};

export default FourCrowns;
