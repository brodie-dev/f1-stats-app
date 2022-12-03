import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { DriverStandingResponse } from '../models/Standings';

const StandingsScreen: React.FC = () => {
  const query = useQuery<DriverStandingResponse>({ queryKey: ['standings'], queryFn: () =>
    fetch('http://localhost:3000/standings/current').then(res =>
        res.json()
      )
 })

  return (
    <ScrollView>
      <View>
        {!!query.data && <>
          <Text>Season: {query.data.season}</Text>
          <Text>Round: {query.data.round}</Text>
          <View>
          {query.data.standings.map((standing) => (
            <View key={standing.position}>
              <Text>Position: {standing.position}</Text>
              <Text>Points: {standing.points}</Text>
              <Text>
                Driver: #{standing.driver.number} {standing.driver.firstName} {standing.driver.lastName} ({standing.driver.nationality})
              </Text>
              <Text>Wins: {standing.wins}</Text>
              <Text>Constructor: {standing.constructor.name} ({standing.constructor.nationality})</Text>
            </View>
          ))}
          </View>
        </>}
      </View>
    </ScrollView>
  );
}

export default StandingsScreen
