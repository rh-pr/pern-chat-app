export const generateFileName = (fileUrl: string) => {
    const nameParts = fileUrl.split('/');
    console.log('full file name: ', fileUrl);
    
    const name = decodeURIComponent(nameParts[nameParts.length - 1] || '');
    return {
        url: fileUrl,
        name: name
    }
}