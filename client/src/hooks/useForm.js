import { useState } from "react";

export const useForm = (formData) => {
    const [inputs , setInputs] = useState(formData);
   
    function setInputValue (e) {
        
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
return [inputs , setInputValue] 
}

