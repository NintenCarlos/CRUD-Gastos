import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { IExpenses, RootStackParamList } from 'interfaces';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

type UpdateRouteProp = RouteProp<RootStackParamList, 'Update-Expense'>;

const UpdateExpense = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<any>();
  const { expenseToUpdate } = route.params;

  const [expense, setExpense] = useState<IExpenses>({
    id: expenseToUpdate.id,
    category: expenseToUpdate.category,
    description: expenseToUpdate.description,
    amount: expenseToUpdate.amount,
    date: expenseToUpdate.date,
  });

  const onChangeExpense = (key: 'category' | 'description' | 'amount', value: string) => {
    const data = expense;

    if (key === 'amount') {
      data.amount = Number(value);
    } else {
      data[key] = value;
    }

    setExpense({ ...data });
    console.log(data);
  };

  const updateExpense = async () => {
    try {
      const { id, date, ...updatedExpense } = expense;
      axios.put(`https://83l3lgt8-5000.usw3.devtunnels.ms/expense/update/${expense.id}`, updatedExpense);

      Platform.OS === 'web' ? alert('Gasto actualizado con éxito') : Alert.alert('Gasto actualizado con éxito');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      Platform.OS === 'web'
        ? alert('Hubo un error al momento de la actualización')
        : Alert.alert('Hubo un error al momento de la actualización');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar gasto</Text>

      <Card style={styles.card}>
        <Text style={styles.label}>Categoría</Text>
        <TextInput
          placeholder="Categoría"
          activeUnderlineColor="#624a39"
          placeholderTextColor="#8b6a41"
          underlineColor="#624a39"
          style={styles.textInput}
          value={expense.category}
          onChangeText={(text) => {
            onChangeExpense('category', text);
          }}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          placeholder="Categoría"
          activeUnderlineColor="#624a39"
          placeholderTextColor="#8b6a41"
          underlineColor="#624a39"
          style={styles.textInput}
          value={expense.description}
          onChangeText={(text) => {
            onChangeExpense('description', text);
          }}
        />

        <Text style={styles.label}>Monto</Text>
        <TextInput
          placeholder="Categoría"
          activeUnderlineColor="#624a39"
          placeholderTextColor="#8b6a41"
          underlineColor="#624a39"
          keyboardType="numeric"
          style={styles.textInput}
          value={expense.amount !== 0 ? expense.amount.toString() : ''}
          onChangeText={(text) => {
            onChangeExpense('amount', text);
          }}
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained-tonal"
            onPress={() => {
              updateExpense();
            }}>
            <Text style={styles.buttonText}>Modificar Gasto</Text>
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
export default UpdateExpense;
