import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import WebView from 'react-native-webview';

interface RouteParams {
  uri: string
  title: string
}


const WebViewScreen: React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute();
  const { uri, title } = params as RouteParams

  useEffect(() => {
    navigation.setOptions({ title })
  }, [title])
  
  return <WebView source={{ uri }} />
}

export default WebViewScreen