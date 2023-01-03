import { useNavigation } from '@react-navigation/native';
import { AspectRatio, Box, Button, Center, FlatList, Heading, HStack, Image, Spinner, Stack, Text } from 'native-base';
import { useNewsQuery } from '../hooks/queries/useNewsQuery';
import { timeSince } from '../utils/timeSince';

const NewsScreen = () => {
  const navigation = useNavigation()
  const { data, isLoading } = useNewsQuery()

  if (isLoading) {
    return (
      <Center width="100%" height="100%">
        <Spinner color="gray.800" accessibilityLabel="Loading standings" />
      </Center>
    )
   }
  
   if (!data) {
    return (
      <Center width="100%" height="100%">
        <Text>
          Unable to load standings
        </Text>
      </Center>
    )
   }

  return (
    <Box paddingX="1">
      <FlatList
        data={data.news}
        keyExtractor={item => item.url} 
        renderItem={({ item }) => (
          <Box alignItems="center" marginBottom="1">
            <Box
              rounded="xs"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              backgroundColor="gray.50"
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image source={{ uri: item.image }} alt={`${item.title} cover image`} />
                </AspectRatio>
                <Center
                  bg="black"
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs"
                  }}
                  position="absolute"
                  bottom="0"
                  right="0"
                  px="3"
                  py="1.5"
                >
                  {timeSince(new Date(item.publishDate))}
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {item.title}
                  </Heading>
                  
                </Stack>
                <Text fontWeight="400">
                  {item.description}
                </Text>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text
                    fontSize="xs"
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    Source: {item.source}
                  </Text>
                  <Button
                    size="sm"
                    variant="link"
                    onPress={() => navigation.navigate("WebView", { uri: item.url, title: item.title })}
                  >
                    READ MORE
                  </Button>
                </HStack>
              </Stack>
            </Box>
          </Box>
        )}
      />
    </Box>
  )
};

export default NewsScreen