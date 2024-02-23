import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "#256fbe",
    borderRadius: 4,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 200,
    borderRadius: 20,
    marginVertical: 20,
  },
  createButton: {
    backgroundColor: "#256fbe",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  choosePhoto: {
    backgroundColor: "#256fbe",
    borderRadius: 10,
    marginHorizontal: 40,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10
  },
  errorText: {
    color: "red",
    marginVertical: 8,
  },
  container: {
    flex: 1,
    top: 40,
  }
});
