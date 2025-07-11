import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { IExpenses } from 'interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
  const navigation = useNavigation<any>();

  const [expenses, setExpenses] = useState<IExpenses[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<number>(0);

  // Mostrar Gastos
  const getExpenses = async () => {
    const { data } = await axios.get('https://83l3lgt8-5000.usw3.devtunnels.ms/expense/get');

    setExpenses(data.expenses);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    spendsByMonth();
  }, [expenses]);

  // Borrar gasto
  const deleteExpense = async (index: number) => {
    try {
      await axios.delete(`https://83l3lgt8-5000.usw3.devtunnels.ms/expense/delete/${index}`);

      Platform.OS == 'web'
        ? alert('Se ha borrado el registro con éxito.')
        : Alert.alert('Se ha borrado el registro con éxito.');

      const updated_expenses = expenses.filter((exp) => exp.id !== index);
      setExpenses(updated_expenses);
    } catch (err) {
      Platform.OS == 'web'
        ? alert('Hubo un error al borrar el registro. Inténtelo de nuevo más tarde.')
        : Alert.alert('Hubo un error al borrar el registro. Inténtelo de nuevo más tarde.');
      console.log(err);
    }
  };

  // Mostrar el total de los gastos del mes actual.
  const spendsByMonth = () => {
    const today = new Date();
    let subtotal = 0;
    // Este arreglo tiene como propósito seleccionar el mes actual para mostrarlo en pantalla. 
    const months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    const numberMonth = today.getMonth() + 1
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    expenses.forEach((expense) => {
      // Estructura DD/MM/YYYY
      const splited_date = expense.date.split('/');

      if (numberMonth === Number(splited_date[1]) && year === Number(splited_date[2])) {
        subtotal += Number(expense.amount);
      }
    });

    setYear(year);
    setMonth(month);
    setTotal(subtotal);
  };

  return (
    <ScrollView style={{backgroundColor:'#bdbdbd'}} >
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Gastos</Text>

        <View style={styles.addButtonContainer}>
          <Text style={styles.totalText}>
            Total gastado en {month} del {year}: ${total + '.00'}
          </Text>
          <Button
            style={styles.buttons}
            mode="contained"
            icon="plus-circle"
            onPress={() => navigation.navigate('Create-Expense')}>
            Agregar Gasto
          </Button>
        </View>

        {expenses.length === 0 ? (
          <Text style={styles.adviceText}>
            No hay gastos creados. Si quiere agregar uno pulse el boton "Agregar Gasto"
          </Text>
        ) : (
          <>
            {expenses.map((exp, i) => (
              <Card key={exp.id} style={styles.card}>
                <Text style={styles.textCard}>No: {i + 1}</Text>
                <Text style={styles.textCard}>Categoría: {exp.category}</Text>
                <Text style={styles.textCard}>Descripción: {exp.description}</Text>
                <Text style={styles.textCard}>Monto: ${exp.amount}</Text>
                <Text style={styles.textCard}>Fecha: {exp.date}</Text>

                <View style={styles.cardButtonsContainer}>
                  <Button
                    labelStyle={styles.buttonText}
                    icon="application-edit"
                    onPress={() => navigation.navigate('Update-Expense', { expenseToUpdate: exp })}>
                    Editar
                  </Button>
                  <Button
                    labelStyle={styles.buttonText}
                    icon="delete"
                    onPress={() => {
                      deleteExpense(exp.id);
                    }}>
                    Borrar
                  </Button>
                </View>
              </Card>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#bdbdbd',
    height: 'auto'
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#395a29',
    textAlign: 'center',
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

  textCard: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },

  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    margin: 10,
  },

  addButtonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  buttons: {
    width: 'auto',
    backgroundColor: '#186218',
  },

  buttonText: {
    color: '#186218',
  },

  adviceText: {
    color: '#624a39',
    fontSize: 30,
    fontWeight: 600,
    marginTop: '12.5%',
    textAlign: 'center',
    padding: 15,
  },

  totalText: {
    color: '#8b6a41',
     fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  }
});
