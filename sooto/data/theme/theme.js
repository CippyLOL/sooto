import { NativeBaseProvider, extendTheme } from "native-base";

export const CustomeTheme = extendTheme({
  components: {
    Heading: {
      baseStyle: (props) => {
        return {
          color: themeTools.mode("red.300", "blue.300")(props),
        };
      },
    },
    ModalHeader: {
      baseStyle: {
        _dark: {
          borderColor: "transparent",
        },
        _light: {
          borderColor: "transparent",
        },
      },
    },
    ModalFooter: {
      baseStyle: {
        _dark: {
          borderColor: "transparent",
        },
        _light: {
          borderColor: "transparent",
        },
      },
    },
  },
});
