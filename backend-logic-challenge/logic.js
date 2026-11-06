    //LEVEL 01
function cleanUsername(username) {
    if(typeof username !=="string"){ return { success:false,error:"invalid"}
    }
    const name= username.trim().toLowerCase();
    if(name.length <3){
        return{success:false,error:"invalid too short"}
    }
    if(name.length>10){
        return{success:false,error:"invalid too long"}
    }
    return{
        success:true,username:name
    }
}
//LEVEL02
const users=[
    { id:1,email:"chakib.tuc@gmail.com",pass:"200082008C"},
    { id:2,email:"user@gmail.com",pass:"user2026"},
];
function login(email,password) {
    const user =users.find((your) =>your.email ===email)
    if(!user){
        return{success:false,error:"user not found in data base"}
    }
    if(user.pass !==password){
        return{success:false,error:"password incorrect"}
    }
    return{success:true,token:"ZDhit4z6d3z"}
}
//LEVEL03
function transferMoney(userA_balance,userB_balance,amount){
    if(typeof amount !=="number"|| isNaN(amount)|| amount <=0 ){
        return{success:false,error:"invalid amount"}
    }
    if(userA_balance <amount){
        return{success:false,error:"invalid"}
    }
    return{
        success:true,
        newbalanceA: userA_balance -amount,
        newbalanceB: userB_balance +amount,
    }
}

//TEST
console.log(cleanUsername("CHAkib  _tuc"));
console.log(cleanUsername("dkzdkzjdzijdziàjiàzjdziàjdiàzdjiàjd")); //user to long

console.log(login("chakib.tuc@gmail.com","200082008C"));
console.log(login("user@gmail.com","user2026"));
console.log(login("newuser@gmail.com","123456789"))

console.log(transferMoney(5000,200,1000));
console.log(transferMoney(5000,200,-500));
