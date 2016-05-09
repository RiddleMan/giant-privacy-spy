export const fileOpen = (function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    let prevListener;

    return (accept = '') => {
        if(prevListener)
            fileInput.removeEventListener('change', prevListener);

        fileInput.accept = accept;

        return new Promise((resolve) => {
            prevListener = (e) => {
                const files = e.target.files;
                resolve(Array.from(files));
                fileInput.value = null;
            };

            fileInput.addEventListener('change', prevListener);
            fileInput.click();
        });
    };
}());

export const getImageSize = (src) => {
    const imageEl = document.createElement('img');

    return new Promise((resolve, reject) => {
        imageEl.onerror = () => {
            reject();
        };

        imageEl.onload = () => {
            resolve({
                width: imageEl.width,
                height: imageEl.height
            });
        };

        imageEl.setAttribute('src', src);
    });
};
