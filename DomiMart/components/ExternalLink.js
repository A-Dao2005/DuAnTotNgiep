import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';

export function ExternalLink({ href, ...rest }) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault(); // Ngăn mở trình duyệt mặc định
          await openBrowserAsync(href); // Mở trong in-app browser
        }
      }}
    />
  );
}
