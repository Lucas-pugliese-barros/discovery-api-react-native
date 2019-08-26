import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  description: {
    color: '#757575',
    marginBottom: 10,
  },
});

export default styles;
