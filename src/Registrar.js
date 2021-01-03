import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { GlobalStyles } from "./styles/GlobalStyles";
import registrarService from "./service/registrar";
import loginService from "./service/login";

export default function Registrar({ navigation }) {
  const [data, setData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    let valid =
      Object.values(data).every((d) => d) && data.senha === data.confirmaSenha;
    setFormValid(valid);
  }, [data]);

  const field = (field) => {
    return (value) => {
      setData({ ...data, [field]: value });
    };
  };

  const registrar = async () => {
    let result = await registrarService.registrar(data);
    if (result === "OK") {
      doAuthenticate();
    } else {
      Alert.alert("Minhas Tarefas", result, [{ text: "OK" }], {
        cancelable: true,
      });
    }
  };

  const doAuthenticate = async () => {
    let result = await loginService.authenticate({
      email: data.email,
      password: data.senha,
    });
    if (result === "OK") {
      navigation.navigate("TaskList");
    } else {
      Alert.alert("Minhas Tarefas", result, [{ text: "OK" }], {
        cancelable: true,
      });
    }
  };

  return (
    <React.Fragment>
      <View style={GlobalStyles.container}>
        <TextInput
          placeholder="Nome"
          style={GlobalStyles.input}
          value={data.nome}
          onChangeText={field("nome")}
        />

        <TextInput
          placeholder="E-mail"
          style={GlobalStyles.input}
          keyboardType="email-address"
          value={data.email}
          onChangeText={field("email")}
        />

        <TextInput
          placeholder="Senha"
          style={GlobalStyles.input}
          secureTextEntry={true}
          value={data.senha}
          onChangeText={field("senha")}
        />

        <TextInput
          placeholder="Confirmar senha"
          style={GlobalStyles.input}
          secureTextEntry={true}
          value={data.confirmaSenha}
          onChangeText={field("confirmaSenha")}
        />

        <TouchableOpacity
          style={styles.btnRegistrar}
          disabled={!formValid}
          onPress={registrar}
        >
          <Text style={styles.btnRegistrarText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  tituloText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    padding: 20,
  },
  
  btnRegistrar: {
    backgroundColor: "#059669",
    width: "90%",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  btnRegistrarText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1FAE5",
  },
});

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { GlobalStyles } from "./styles/GlobalStyles";

// export default function Registrar({ navigation }) {
//   const [data, setData] = useState({
//     nome: "",
//     email: "",
//     senha: "",
//     confirmaSenha: "",
//   });

//   return (
//     <React.Fragment>
//       <View style={GlobalStyles.container}>
//         <TextInput placeholder="Nome" style={GlobalStyles.input} />

//         <TextInput
//           placeholder="E-mail"
//           style={GlobalStyles.input}
//           keyboardType="email-address"
//         />

//         <TextInput
//           placeholder="Senha"
//           style={GlobalStyles.input}
//           secureTextEntry={true}
//         />

//         <TextInput
//           placeholder="Confirmar senha"
//           style={GlobalStyles.input}
//           secureTextEntry={true}
//         />

//         <TouchableOpacity style={styles.btnRegistrar}>
//           <Text style={styles.btnRegistrarText}>Registrar</Text>
//         </TouchableOpacity>
//       </View>
//     </React.Fragment>
//   );
// }

// const styles = StyleSheet.create({
//   tituloText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//     padding: 20,
//   },

//   btnRegistrar: {
//     backgroundColor: "#059669",
//     width: "90%",
//     alignItems: "center",
//     padding: 10,
//     marginTop: 20,
//     borderRadius: 5,
//   },
//   btnRegistrarText: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#D1FAE5",
//   },
// });
