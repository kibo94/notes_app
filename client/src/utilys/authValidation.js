function authValidation (email,passowrd){
    let authValidationData = {
      valid:true,
      messages:[]
    }

    var re = /\S+@\S+\.\S+/;
    
    if(!re.test(email)){
        authValidationData.messages.push("Please enter valid email")
        authValidationData.valid = false;
    }
 
    
    if(passowrd.trim().length < 6){
        authValidationData.messages.push("Password should have minumum 6 charachters")
        authValidationData.valid = false;
}
   
      return authValidationData;
   
   
  }

  export default authValidation;