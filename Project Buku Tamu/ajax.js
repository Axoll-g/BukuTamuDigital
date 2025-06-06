function ajaxFormSubmit(url, formData, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    successCallback(response);
                } catch (e) {
                    successCallback(xhr.responseText);
                }
            } else {
                errorCallback(xhr.status, xhr.statusText);
            }
        }
    };
    
    // If formData is not a FormData object, convert it
    if (!(formData instanceof FormData)) {
        const fd = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                fd.append(key, formData[key]);
            }
        }
        formData = fd;
    }
    
    xhr.send(formData);
}
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Fade out after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        // Remove from DOM after fade out
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}
