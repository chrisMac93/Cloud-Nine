import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToLocalStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const getFromLocalStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from local storage:", error);
    return null;
  }
};

export const getTimestamp = () => {
  return new Date().getTime();
};