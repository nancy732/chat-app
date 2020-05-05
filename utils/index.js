import storage from '@react-native-firebase/storage';

export const getFileLocalPath = response => {
    const { path } = response;
    return path
};
export const imagePickerOptions = {
    noData: true,
};
export const createStorageReferenceToFile = response => {
    const { fileName } = response;
    return storage().ref(fileName);
};
export const uploadFileToFireBase = imagePickerResponse => {
    const fileSource = getFileLocalPath(imagePickerResponse);
    const storageRef = createStorageReferenceToFile(imagePickerResponse);
    return storageRef.putFile(fileSource);
};