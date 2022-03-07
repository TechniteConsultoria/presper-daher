import React from "react";
import {
  BsFillCollectionPlayFill,
  BsFillChatLeftFill,
  BsTagsFill,
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
  {
    title: "Categorias",
    icon: <BsTagsFill />,
    link: "/admin/categoria",
    cod: 4,
  },
];
