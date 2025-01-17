export const formatDateForInput = (string) => {
    const newDate = new Date(string).toLocaleDateString('ru')
    const formatted = newDate ? newDate.split('.').reverse().join('-') : null
    return formatted
}


export const getDeviceInfo = () => {
    const device = {};

    // Браузер и его версия
    device.userAgent = navigator.userAgent;
    device.appName = navigator.appName;
    device.appVersion = navigator.appVersion;
    device.platform = navigator.platform;

    // Операционная система (наиболее общее)
    let os = 'Unknown';
    if (navigator.appVersion.indexOf('Win') !== -1) os = 'Windows';
    if (navigator.appVersion.indexOf('Mac') !== -1) os = 'MacOS';
    if (navigator.appVersion.indexOf('Linux') !== -1) os = 'Linux';
    if (navigator.appVersion.indexOf('Android') !== -1) os = 'Android';
    if (navigator.appVersion.indexOf('iOS') !== -1) os = 'iOS';
    device.os = os;

    // Разрешение экрана
    device.screenResolution = `${window.screen.width}x${window.screen.height}`;

    // Тип устройства (приближенно)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        device.deviceType = 'mobile';
    } else {
        device.deviceType = 'desktop';
    }

    return device;
}

export async function getUserGeolocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true, // Попытка получить более точные данные (может занимать больше времени)
                timeout: 5000,        // Максимальное время ожидания (в миллисекундах)
                maximumAge: 0      // Указываем не кэшировать данные
            }
        );
    });
}