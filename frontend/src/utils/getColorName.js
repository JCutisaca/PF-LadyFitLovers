export const getColorName = (color) => {
  switch (color) {
    case "red":
      return "ROJO";
    case "blue":
      return "AZUL";
    case "green":
      return "VERDE";
    case "yellow":
      return "AMARRILLO";
    case "violet":
      return "VIOLETA";
    case "orange":
      return "NARANJA";
    case "pink":
      return "ROSA";
    case "black":
      return "NEGRO";
    case "white":
      return "BLANCO";
    case "gray":
        return "GRIS"
    case "purple":
      return "MORADO"
    case "brown":
      return "MARRON"
    default:
      return "Unknown";
  }
};