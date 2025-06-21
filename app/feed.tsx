import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const jobOffers = [
  {
    id: '1',
    title: 'Desarrollador Frontend',
    company: 'Tech Solutions',
    description: 'Buscamos un frontend con experiencia en React y Tailwind.',
  },
  {
    id: '2',
    title: 'Diseñador UX/UI',
    company: 'Creative Minds',
    description: 'Diseñador con foco en mobile y experiencia en Figma.',
  },
  {
    id: '3',
    title: 'Backend Node.js',
    company: 'DataWorks',
    description: 'Apasionado por las APIs y bases de datos relacionales.',
  },
];

const Feed = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ofertas de Trabajo</Text>
      <FlatList
        data={jobOffers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  company: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
  },
});