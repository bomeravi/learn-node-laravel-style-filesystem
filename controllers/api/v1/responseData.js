const SuccessData = (data={})=>{
    const message = data.message || 'Data received Successfully'
     const statusCode = data.code|| 200;
     const inputData = data.data || {}
     const inputErrors = data.errors ||{}
     return {
         success: true,
         code : statusCode,
         message: message,
         data: inputData,
         errors: inputErrors
     }
 }
 
 const FailedData = (data={})=>{
     const message = data.message || 'Something went wrong'
     const statusCode = data.code|| 200;
     const inputData = data.data || {}
     const inputErrors = data.errors ||{}
     return {
         success: false,
         code : statusCode,
         message: message,
         data: inputData,
         errors: inputErrors
     }
 }
 
 
 
 const ServerErrorData = (data={}) => {
     const message = data.message || 'Internal Server Error'
     const statusCode = data.code|| 500;
     const inputData = data.data || {}
     const inputErrors = data.errors ||{}
     return {
         success: false,
         code : statusCode,
         message: message,
         data: inputData,
         errors: inputErrors
     }
 }
 
 const ValidationFailedData = (data={})=>{
     const message = data.message || 'Data received Successfully'
     const statusCode = data.code|| 200;
     const inputData = data.data || {}
     const inputErrors = data.errors ||{}
     return {
         success: true,
         code : statusCode,
         message: message,
         data: inputData,
         errors: inputErrors
     }
 }
 
 
 const UnauthorizedData = (data={})=>{
     const message = data.message || 'Data received Successfully'
     const statusCode = data.code|| 200;
     const inputData = data.data || {}
     const inputErrors = data.errors ||{}
     return {
         success: true,
         code : statusCode,
         message: message,
         data: inputData,
         errors: inputErrors
     }
 }
 const DatabaseFailedData = (data={})=>{
     const message = data.message || 'Database issue detected'
     const statusCode = data.code|| 200;
     const inputData = data.data || {}
     const inputErrors = data.errors ||{}
     return {
         success: true,
         code : statusCode,
         message: message,
         data: inputData,
         errors: inputErrors
     }
 }
 
 export  {SuccessData,FailedData,ServerErrorData,ValidationFailedData,UnauthorizedData,DatabaseFailedData}
 