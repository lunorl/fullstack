import Text from "./Text";
import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const styles = new StyleSheet.create({
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 15,
    padding: 10,
  },
  button: {
    backgroundColor: "#0165d4",
    marginHorizontal: 10,
    marginVertical: 13,
    borderRadius: 4,
  },
  text: {
    color: "#ffff",
    textAlign: "center",
    paddingVertical: 13,
    fontWeight: "bold",
  },
  background: {
    backgroundColor: "#ffffff",
  },
});
const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values.username, values.password);
  };
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.background}>
      <TextInput
        style={
          formik.touched.username && formik.errors.username
            ? {
                borderColor: "#d73a4a",
                borderWidth: 1,
                borderRadius: 2,
                fontSize: 20,
                marginRight: 10,
                marginLeft: 10,
                marginTop: 15,
                padding: 10,
              }
            : {
                borderColor: "#000000",
                borderWidth: 1,
                borderRadius: 2,
                fontSize: 20,
                marginRight: 10,
                marginLeft: 10,
                marginTop: 15,
                padding: 10,
              }
        }
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "#d73a4a", paddingLeft: 10 }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        secureTextEntry
        style={
          formik.touched.password && formik.errors.password
            ? {
                borderColor: "#d73a4a",
                borderWidth: 1,
                borderRadius: 2,
                fontSize: 20,
                marginRight: 10,
                marginLeft: 10,
                marginTop: 15,
                padding: 10,
                color: "#d73a4a",
              }
            : {
                borderColor: "#000000",
                borderWidth: 1,
                borderRadius: 2,
                fontSize: 20,
                marginRight: 10,
                marginLeft: 10,
                marginTop: 15,
                padding: 10,
              }
        }
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "#d73a4a", paddingLeft: 10 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
