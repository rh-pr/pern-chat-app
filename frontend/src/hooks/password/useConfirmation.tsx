import { useState } from "react";

const useConfirmation = () => {
    const [formData, setFormData] = useState<string>('')

    const submitOPT = () => {
        return true;
    }

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(code => code + e.target.value);
    }
    
    return {
        formData,
        handleChanges,
        submitOPT

    }
}

export default useConfirmation;