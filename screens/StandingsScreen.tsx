import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Box, Center, FlatList, Heading, HStack, Spinner, VStack, Text, Spacer, Pressable, Select } from 'native-base';
import { useEffect, useState } from 'react';
import { useSeasonsQuery } from '../hooks/queries/useSeasonsQuery';
import { useStandingsQuery } from '../hooks/queries/useStandingsQuery';

const StandingsScreen: React.FC = () => {
  const navigation = useNavigation()
  const [selectedSeason, setSeason] = useState<number | null>(null)
  const {
    isLoading: isStandingsLoading,
    data: standingsData
  
  } = useStandingsQuery(selectedSeason ?? undefined)
  const { data: seasonsData } = useSeasonsQuery()

  useEffect(() => {
    navigation.setOptions({
      headerRight: seasonsData
        ? () => (
          <Select
            width={90}
            variant="unstyled"
            selectedValue={selectedSeason ? String(selectedSeason) : standingsData?.season} 
            accessibilityLabel="Choose Season"
            placeholder="Choose Service"
            onValueChange={itemValue => setSeason(Number(itemValue))}
          >
            {seasonsData.seasons.map((season) => {
              const year = String(season.year)

              return <Select.Item key={year} label={year} value={year} />
            })}    
          </Select>
      )
      : null
    })
  }, [selectedSeason, seasonsData, standingsData?.season])

 if (isStandingsLoading) {
  return (
    <Center width="100%" height="100%">
      <Spinner color="gray.800" accessibilityLabel="Loading standings" />
    </Center>
  )
 }

 if (!standingsData) {
  return (
    <Center width="100%" height="100%">
      <Text>
        Unable to load standings
      </Text>
    </Center>
  )
 }

 if (!standingsData.standings.length) {
  return (
    <Center width="100%" height="100%">
      <Text>
        Looks like there's no standings data for this season yet
      </Text>
    </Center>
  )
 }

 return (
      <FlatList
        data={standingsData.standings}
        keyExtractor={item => item.driver.id} 
        renderItem={({ item },) => (
          <Box
            borderBottomWidth="1"
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between" alignItems="center">
              <Center roundedTopRight="lg" roundedBottomRight="xs" width={50} px="1" py="1" bg="gray.800">
                <Heading color="coolGray.100">{item.position}</Heading>
              </Center>
              <VStack>
                <Text bold>
                  {item.driver.firstName} {item.driver.lastName}
                </Text>
                <Text>
                  {item.points} points
                </Text>
              </VStack>
              <Spacer />
              <Center paddingX="1">
                <Text
                  fontSize="xs"
                  alignSelf="flex-start"
                >
                  {item.constructor.name}
                </Text>
              </Center>
            </HStack>
          </Box>
          )}
        />
 )
}

export default StandingsScreen
