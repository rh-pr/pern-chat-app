export const authValidation = (formData: FormData) => {
    const minPasswordLength = 6;
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString().trim();
    const fullname = formData.get('fullname')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const gender = formData.get('gender')?.toString().trim();


    if ((!username || username.length < minPasswordLength) ||
        (!password || password.length < minPasswordLength) || 
        !fullname || !gender || !email) {
        return false;
    }
    return true;;
}