import React from "react";
import {
  BsPersonCircle,
  BsFillBarChartLineFill,
  BsFillCollectionPlayFill,
  BsFillChatLeftFill,
} from "react-icons/bs";

export const AdminNavbarData = [
  // {
  //   title: "Minha Conta",
  //   icon: <BsPersonCircle />,
  //   link: "/admin/minha-conta",
  //   cod: 1,
  // },
  {
    title: "Cursos",
    icon: <BsFillCollectionPlayFill />,
    link: "/admin/cursos",
    cod: 2,
  },
  {
    title: "Comunicação",
    icon: <BsFillChatLeftFill />,
    link: "/admin/comunicacao",
    cod: 3,
  },
  // {
  //   title: "Desempenho",
  //   icon: <BsFillBarChartLineFill />,
  //   link: "/admin/desenpenho",
  //   cod: 4,
  // },
];
