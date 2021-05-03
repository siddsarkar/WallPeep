import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileTabBar({
  colors,
  state,
  descriptors,
  navigation,
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={[s.tabBar, {backgroundColor: colors.card}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon
            : 'emoticon-confused';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              s.iconText,
              s.tab,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: isFocused ? colors.placeholder : colors.card,
                borderRadius: isFocused ? 4 : 0,
              },
            ]}>
            <MaterialCommunityIcons
              style={s.metaIcons}
              color={colors.text}
              name={icon}
              size={18}
            />
            <Text
              style={[
                s.tabsText,
                {
                  color: colors.text,
                },
              ]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 8,
    // backgroundColor: 'green'
  },
  root: {
    height: '100%',
    // backgroundColor: 'green'
  },
  text: {
    marginTop: 12,
    fontSize: 28,
  },
  subText: {
    marginTop: 4,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  headerWrapper: {
    // height: 200,
    padding: 12,
  },
  metaIcons: {
    paddingRight: 6,
  },
  tab: {
    justifyContent: 'center',
    padding: 6,
  },
  tabsText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
