// import NestJSIcon from "../assets/nestjs.png";
// import ReactIcon from "../assets/reactiflux.png";
// import TypescriptIcon from "../assets/typescript.png";

export const mockGuilds = [
  {
    id: "123",
    name: "NestJS",
    icon: "NestIcon",
    owner: true,
    permissions: "all",
    features: ["view", "edit", "delete"],
  },
  {
    id: "124",
    name: "React",
    icon: "ReactIcon",
    owner: false,
    permissions: "selective",
    features: ["view", "edit"],
  },
  {
    id: "125",
    name: "Typescript",
    icon: "TypescriptIcon",
    owner: true,
    permissions: "selective",
    features: ["view"],
  },
];
