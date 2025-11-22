import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { formatDate } from '../../../shared/utils/date';

interface DateSelectorProps {
  label?: string;
  value?: number;
  onChange?: (timestamp: number) => void;
  error?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  label = 'Due Date',
  value,
  onChange,
  error,
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(
    value || dayjs().valueOf()
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    dayjs(selectedDate).format('YYYY-MM-DD')
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sync internal state with value prop
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
      setCurrentMonth(dayjs(value).format('YYYY-MM-DD'));
    }
  }, [value]);

  const handleDateSelect = (day: { dateString: string }) => {
    const timestamp = dayjs(day.dateString).valueOf();
    setSelectedDate(timestamp);
    onChange?.(timestamp);
    setIsModalVisible(false);
  };

  const handleMonthChange = (month: { month: number; year: number }) => {
    const monthDate = dayjs(`${month.year}-${month.month + 1}-01`);
    setCurrentMonth(monthDate.format('YYYY-MM-DD'));
  };

  const selectedDateString = dayjs(selectedDate).format('YYYY-MM-DD');
  const minDateString = dayjs().format('YYYY-MM-DD');

  const markedDates = {
    [selectedDateString]: {
      selected: true,
      selectedColor: '#111827', // gray-900
      selectedTextColor: '#ffffff',
    },
  };

  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className={`border rounded-lg px-4 py-3 flex-row justify-between items-center bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}>
        <Text className="text-base text-gray-900">
          {formatDate(selectedDate)}
        </Text>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setIsModalVisible(false)}>
          <Pressable
            className="bg-white rounded-lg w-4/5 overflow-hidden border border-gray-200"
            onPress={(e) => e.stopPropagation()}>
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-gray-900">
                Select Date
              </Text>
            </View>
            <View className="p-4">
              <Calendar
                current={currentMonth}
                onDayPress={handleDateSelect}
                onMonthChange={handleMonthChange}
                markedDates={markedDates}
                minDate={minDateString}
                enableSwipeMonths={true}
                hideExtraDays={false}
                firstDay={1}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#374151', // gray-700
                  selectedDayBackgroundColor: '#111827', // gray-900
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#111827', // gray-900
                  dayTextColor: '#374151', // gray-700
                  textDisabledColor: '#d1d5db', // gray-300
                  dotColor: '#111827',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#111827', // gray-900
                  monthTextColor: '#111827', // gray-900
                  textDayFontWeight: '400',
                  textMonthFontWeight: '600',
                  textDayHeaderFontWeight: '600',
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 12,
                }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
