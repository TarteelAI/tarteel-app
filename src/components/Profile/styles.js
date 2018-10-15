import { StyleSheet, Dimensions, Platform } from "react-native"

const { height, width } = Dimensions.get("window")
const os = Platform.OS;

export default (props) => (
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      content: {
        paddingHorizontal: width * 0.05
      },
      title: {
        color: "#485364",
        fontFamily: "Proxima-Nova-Alt-Regular",
        fontSize: 18,
        fontWeight: '400'
      },
      list: {
        borderTopWidth: 1,
        borderColor: "#ebebeb",
        marginVertical: height * 0.10,
      },
      listItem: {
        paddingVertical:  os === "ios" ? (height * 0.020) : (height * 0.025) ,
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
      },
      listItemText: {
        color: "#485364",
        fontFamily: "Proxima-Nova-Alt-Regular",
        fontSize: os === "ios" ? (height * 0.025) : (height * 0.030),
        fontWeight: '400',
        lineHeight: 25,
        writingDirection: props.locale === "ar" ? 'rtl' : 'ltr'
      },
      progressContainer: {
        alignItems: 'center',
        marginTop: height * 0.03,
      },
      ayahsCount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#485364",
        textAlign: "center"
      },
      progressText: {
        color: "#485364",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Proxima-Nova-Alt-SemiBold",
        lineHeight: 25
      },
      progressNote: {
        color: "gray",
        textAlign: "center"
      },
      actionSheetItem: {
        flexDirection: props.locale === "ar" ? "row-reverse" : "row",
      }
    })
)
