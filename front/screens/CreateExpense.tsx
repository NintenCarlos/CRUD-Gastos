import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { IExpenses } from 'interfaces';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Card, TextInput, Text, Button } from 'react-native-paper';
import Swal from 'sweetalert2';

const CreateExpense = () => {
  const [expense, setExpense] = useState<IExpenses>({
    id: 0,
    category: '',
    description: '',
    amount: 0,
    date: '',
  });

  const navigation = useNavigation<any>();
  const createExpense = async () => {
    try {
      const { id, date, ...newExpense } = expense;
      const data = await axios.post('https://83l3lgt8-5000.usw3.devtunnels.ms/expense/create', newExpense);

      console.log(data);

      Platform.OS == 'web'
        ? alert('Se ha creado el registro del gasto.')
        : Alert.alert('Se ha creado el registro del gasto.');

      await navigation.navigate('Home');
    } catch (err) {
      {
        Platform.OS == 'web'
          ? alert('Hubo un error al momento de crear el registro del gasto. Inténtelo de nuevo más tarde.')
          : Alert.alert('Hubo un error al momento de crear el registro del gasto. Inténtelo de nuevo más tarde.');

        console.log(err);
      }
    }
  };

  const onChangeExpense = (key: 'category' | 'description' | 'amount', value: string) => {
    const data = { ...expense };

    if (data) {
      if (key == 'amount') {
        const decimal = parseFloat(value);
        data.amount = isNaN(decimal) ? 0 : decimal;
      } else {
        data[key] = value;
      }
    }

    setExpense(data);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear gasto</Text>

      <Card style={styles.card}>
        <Text style={styles.label}>Categoría</Text>
        <TextInput
          placeholder="Categoría"
          activeUnderlineColor="#624a39"
          placeholderTextColor="#8b6a41"
          underlineColor="#624a39"
          style={styles.textInput}
          value={expense.category}
          onChangeText={(text) => onChangeExpense('category', text)}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          placeholder="Descripción"
          activeUnderlineColor="#624a39"
          placeholderTextColor="#8b6a41"
          underlineColor="#624a39"
          style={styles.textInput}
          value={expense.description}
          onChangeText={(text) => onChangeExpense('description', text)}
        />

        <Text style={styles.label}>Monto</Text>
        <TextInput
          placeholder="Monto"
          activeUnderlineColor="#624a39"
          placeholderTextColor="#8b6a41"
          underlineColor="#624a39"
          style={styles.textInput}
          keyboardType="numeric"
          value={expense.amount !== 0 ? expense.amount.toString() : ''}
          onChangeText={(number) => onChangeExpense('amount', number)}
        />

        <View style={styles.buttonContainer}>
          <Button
            labelStyle={styles.buttonText}
            style={styles.button}
            mode="contained-tonal"
            onPress={() => {
              createExpense();
            }}>
            Crear Gasto
          </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#bdbdbd',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#395a29',
  },

  card: {
    backgroundColor: '#e6e6e6',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    width: '90%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  label: {
    margin: 10,
    fontSize: 17,
    color: '#624a39',
  },

  textInput: {
    backgroundColor: '#e6e6e6',
  },

  buttonContainer: {
    width: '100%',
    margin: 10,
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#186218',
  },

  buttonText: {
    color: '#fff',
  },
});

export default CreateExpense;
