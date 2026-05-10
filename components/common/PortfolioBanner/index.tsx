// import { Canvas, Rect, LinearGradient, vec, useLoop, useComputedValue } from "@shopify/react-native-skia";

// export default function PortfolioBanner() {
//   const progress = useLoop({ duration: 2000 });
//   const gradientStart = useComputedValue(() => vec(progress.current * 300 - 100, 0), [progress]);

//   return (
//     <Canvas style={{ height: 100, width: "100%" }}>
//       <Rect x={0} y={0} width={400} height={100}>
//         <LinearGradient
//           start={gradientStart}
//           end={vec(400, 100)}
//           colors={["#1a1a1a", "#333", "#1a1a1a"]}
//         />
//       </Rect>
//     </Canvas>
//   );
// }
