import {useState} from 'react'

function useAlert() {   

    const [alertState , setAlertState] = useState({
        active:false,
        msg:"",
        color:""
      })

    function setAlert(a,m,c){
      
        setAlertState({active:a,msg:m,color:c})
        setTimeout(() => {
            setAlertState({active:false,msg:"",color:""})
          },2000)
          
    }
    

    return [alertState,setAlert]
}

export default useAlert
