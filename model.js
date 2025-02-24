class User{
    constructor(id,name,userName, password,DOB, gender,email){
        this.id=id;
        this.name=name;
        this.uerName=userName;
        this.password=password;
        this.DOB=DOB;
        this.gender=gender;
        this.email=email;
    }
    getId(){
        return this.id;
    }
    getUserName(){
        return this.nameame;
    }
    getPassword(){
        return this.password;
    }

    getDOB(){
        return this.DOB;
    }
    getGender(){
        return this.gender;
    }
    getEmail(){
        return this.email;
    }
    setId(id){
        this.id=id;
    }
    setName(name){
        this.name=name;
    }
    setUserName(username){
        this.userNameame=username;
    }
    setpassword(pass){
        this.password=pass;
    }
    setGender(gender){
        this.gender=gender;
    }
    setDOB(dob){
        this.DOB=dob;
    }
    setEmail(email){
        this.email=email;
    }
}
export default User;