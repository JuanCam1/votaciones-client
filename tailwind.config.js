/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "max-height"
      },
      gridTemplateColumns: {
        "3fr-1fr": "3fr 1fr"
      },
      colors: {
        colorPrimary: "#ECC506",
        colorSecundary: "#12AF40",
        colorText: "#1F1F1F",
        colorBg: "#f9f9f9",
        colorLogo: "#AA8D00",
        colorRed: "#ff0000",
        colorBlack: "#000000",
        colorBox: "#ffffff",
        colorDisabed: "#bdbdbd",
        colorItem: "#fafbfc",
        colorSky: "#17a3b5",
        colorGreen: "#00cb31",
        colorEmerald: "#00bb2d",
        colorF4f9ff: "#f4f9ff",
        colorE3f0ff: "#e3f0ff",
        color4097fc: "#4097fc",
        colorf7f7f7: "#f7f7f7",
        colorf5f5f5: "#f5f5f5",
        colorededed: "#ededed",
        colore0e0e0: "#e0e0e0",
        colorDadada: "#dadada",
        color9e9e9e: "#9e9e9e",
        color757575: "#757575",
        color616161: "#616161",
        color424242: "#424242",
        color212121: "#212121",
        colorF9f9f9: "#f9f9f9"
      },
      fontFamily: {
        // Roboto: ["Roboto", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"]
      },
      backgroundImage: {
        fondo: "url('/src/assets/statics/volcan.webp')"
      }
    }
  },
  plugins: []
};

