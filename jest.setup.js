// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock @react-native-firebase/firestore
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    FieldValue: {
      serverTimestamp: jest.fn(() => ({ seconds: Date.now() / 1000 })),
    },
  })),
  getFirestore: jest.fn(),
  getDocs: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
}));

// Mock @react-native-firebase/app
jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock react-native-calendars
jest.mock('react-native-calendars', () => ({
  Calendar: 'Calendar',
}));

// Mock Alert
jest.spyOn(require('react-native'), 'Alert').mockImplementation((title, message, buttons) => {
  if (buttons && buttons.length > 0) {
    // For testing, we can trigger the first button's onPress
    return buttons[0].onPress?.();
  }
});

// Mock dayjs
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');
  return {
    ...originalDayjs,
    __esModule: true,
    default: originalDayjs.default || originalDayjs,
  };
});

