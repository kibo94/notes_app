function valid (title , author__name , body){
    let validData = {
      valid:true,
      messages:[]
    }
    if(title.trim().length < 4){
        validData.messages.push("Title should have minumum 4 charachters")
        validData.valid = false;
    }
    if(author__name.trim().length < 6){
        validData.messages.push("Author_name should have minumum 6 charachters")
        validData.valid = false;
}
    if(body.trim().length < 10){
      validData.messages.push("Body should have minumum 10 charachters")
      validData.valid = false;
  }
      return validData;
   
   
  }

  export default valid;