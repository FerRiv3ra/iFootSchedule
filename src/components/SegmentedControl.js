import {Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const SegmentedControl = ({
  values = [],
  onChange,
  selectedIndex = null,
  backgroundColor = '#CCCCCC',
  tintColor = '#FFFFFF',
  textColor = '#000000',
}) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(selectedIndex ? selectedIndex : 0);
  }, []);

  const handlePress = idx => {
    onChange(values[idx].value);
    setSelected(idx);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2,
        backgroundColor,
        borderRadius: 5,
        marginVertical: 5,
      }}>
      {values.map((value, index) => (
        <Pressable
          onPress={() => handlePress(index)}
          key={index}
          style={{
            flex: 1,
            backgroundColor: selected === index ? tintColor : backgroundColor,
            paddingVertical: 5,
            borderTopLeftRadius: index === 0 ? 5 : 0,
            borderBottomLeftRadius: index === 0 ? 5 : 0,
            borderTopRightRadius: index === values.length - 1 ? 5 : 0,
            borderBottomRightRadius: index === values.length - 1 ? 5 : 0,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: textColor,
              fontSize: 12,
            }}>
            {value.key}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SegmentedControl;
